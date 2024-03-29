import { deleteAsync } from 'del';
import { exec, spawn } from 'child_process';
import { globby } from 'globby';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import esbuild from 'esbuild';
import fs from 'fs/promises';
import getPort, { portNumbers } from 'get-port';
import ora from 'ora';
import util from 'util';
import * as path from 'path';
import { readFileSync } from 'fs';
// import { replace } from 'esbuild-plugin-replace';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';

const { serve } = commandLineArgs([{ name: 'serve', type: Boolean }]);
const outdir = 'dist';
const cdndir = 'cdn';
const sitedir = '_site';
const docdir = 'docs';
const spinner = ora({ hideCursor: false }).start();
const execPromise = util.promisify(exec);
let childProcess;
let buildResults;

const bundleDirectories = [cdndir, outdir];
let packageData = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
const enibookVersion = JSON.stringify(packageData.version.toString());

//
// Générer la documentation monopage avec `asciidoctor`.
//
async function buildTheDocs(watch = false) {
  const htmlDoc = new Promise(async (resolve, reject) => {
    const args = [
      '-r',
      '@djencks/asciidoctor-mathjax',
      '-r',
      'asciidoctor-highlight.js',
      `${docdir}/elements.adoc`
    ];
    const output = [];

    const child = spawn('asciidoctor', args, {
      stdio: 'pipe',
      shell: true // for Windows
    });

    child.stdout.on('data', data => {
      output.push(data.toString());
    });

    child.stderr.on('data', data => {
      output.push(data.toString());
    });

    child.on('close', () => {
      resolve({ child, output });
    });
  });
  return htmlDoc;
}

//
// Générer la documentation multipage avec `asciidoctor-chunker`.
// A lancer après la génération de la documentation monopage.
//
async function buildTheChunks(watch = false) {
  const chunkDoc = new Promise(async (resolve, reject) => {
    const args = [
      `${docdir}/elements.html`, 
      '--titlePage', '"EniBook : éléments HTML"', 
      '--outdir', `${sitedir}`
    ];
    const output = [];

    const child = spawn('asciidoctor-chunker', args, {
      stdio: 'pipe',
      shell: true // for Windows
    });
    child.stdout.on('data', data => {
      output.push(data.toString());
    });

    child.stderr.on('data', data => {
      output.push(data.toString());
    });

    child.on('close', () => {
      resolve({ child, output });
    });
  });
  return chunkDoc;
}

//
// Construit les sources avec esbuild.
//
async function buildTheSource() {
  const alwaysExternal = [];

  const cdnConfig = {
    format: 'esm',
    target: 'es2020',
    entryPoints: [
      //
      // NOTE: Les points d'entrée doivent être renseignés dans les `exports` du fichier `package.json`,
      // sinon les utilisateurs ne pourront pas les importer !
      //
      // Tout en un
      './src/enibook.ts',
      // Chargeur automatique
      './src/enibook-autoloader.ts',
      // Eléments
      ...(await globby('./src/elements/**/!(*.(css|test)).ts')),
      // Utilitaires
      ...(await globby('./src/utilities/**/!(*.(css|test)).ts'))
    ],
    outdir: cdndir,
    chunkNames: 'chunks/[name].[hash]',
    define: {
       'process.env.NODE_ENV': '"production"'
    },
    bundle: true,
    external: alwaysExternal,
    splitting: true,
    plugins: [
      inlineWorkerPlugin()
    ]
  };

  const npmConfig = {
    ...cdnConfig,
    external: undefined,
    minify: false,
    packages: 'external',
    outdir
  };

  if (serve) {
    // Utiliser les contextes esbuild pour les développements incrémentaux
    const contexts = await Promise.all([esbuild.context(cdnConfig), esbuild.context(npmConfig)]);
    await Promise.all(contexts.map(context => context.rebuild()));
    return contexts;
  } else {
    // Utiliser l'API standard en production
    return await Promise.all([esbuild.build(cdnConfig), esbuild.build(npmConfig)]);
  }
}

//
// Appelé sur SIGINT ou SIGTERM pour clore tous les processus.
//
function handleCleanup() {
  buildResults.forEach(result => result.dispose());
  if (childProcess) {
    childProcess.kill('SIGINT');
  }
  process.exit();
}

//
// Afficher spinner pendant l'exécution des tâches.
//
async function nextTask(label, action) {
  spinner.text = label;
  spinner.start();
  try {
    await action();
    spinner.stop();
    console.log(`${chalk.green('✔')} ${label}`);
  } catch (err) {
    spinner.stop();
    console.error(`${chalk.red('✘')} ${err}`);
    if (err.stdout) console.error(chalk.red(err.stdout));
    if (err.stderr) console.error(chalk.red(err.stderr));
    process.exit(1);
  }
}

await nextTask(`Suppression "${sitedir}", "${outdir}", "${cdndir}"`, async () => {
  await Promise.all([deleteAsync(sitedir), ...bundleDirectories.map(dir => deleteAsync(dir))]);
  await fs.mkdir(outdir, { recursive: true });
});

await nextTask('Manifeste "custom-elements.json"', () => {
  return execPromise(`cem analyze --litelement --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask('Compilation TypeScript', () => {
  return execPromise(`tsc --project ./tsconfig.prod.json --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask(`Copie "${outdir}" dans "${cdndir}"`, async () => {
  await deleteAsync(cdndir);
  await copy(outdir, cdndir);
});

await nextTask('Création du bundler', async () => {
  buildResults = await buildTheSource();
});

// Copier la compilation CDN dans les documents (en production uniquement).
if (!serve) {
  await nextTask(`Copie "${cdndir}" dans "${sitedir}"`, async () => {
    await deleteAsync(sitedir);
    await copy(cdndir, path.join(sitedir, 'dist'));
  });
}

// Lancer le serveur de développement
if (serve) {
  let result;

  await nextTask('Documentation monopage', async () => {
    result = await buildTheDocs(true);
  });

  await nextTask(`Copie "${docdir}/styles" dans "${sitedir}/styles"`, async () => {
    return await copy(path.join(docdir, 'styles'), path.join(sitedir, 'styles'), { overwrite: true });
  });

  await nextTask(`Copie de "${docdir}/templates" dans "${sitedir}/templates"`, async () => {
    return await copy(path.join(docdir, 'templates'), path.join(sitedir, 'templates'), { overwrite: true });
  });

  await nextTask(`Documentation multipage`, async () => {
    result = await buildTheChunks();
  });

  const bs = browserSync.create();
  const port = await getPort({ port: portNumbers(4000, 4999) });
  const browserSyncConfig = {
    startPath: '/',
    port,
    logLevel: 'silent',
    logPrefix: '[enibook]',
    logFileChanges: true,
    notify: false,
    single: false,
    ghostMode: false,
    server: {
      baseDir: sitedir,
      routes: {
        '/dist': './cdn'
      }
    }
  };

  // Synchronisation du navigateur
  bs.init(browserSyncConfig, () => {
    const url = `http://localhost:${port}`;
    console.log(chalk.cyan(`\nServeur de développement : ${url}`));

    if (result.output.length > 0) {
      console.log('\n' + result.output.join('\n'));
    }
    result.child.stdout.on('data', data => {
      console.log(data.toString());
    });
  });

  // Reconstruction et rechargement en cas de modification des fichiers sources
  bs.watch('src/**/!(*.test).*').on('change', async filename => {
    console.log('[build] fichier modifié : ', filename);

    try {
      const isStylesheet = /(\.css|\.css\.ts)$/.test(filename);

      // Bundler
      const rebuildResults = buildResults.map(result => result.rebuild());
      await Promise.all(rebuildResults);

      // Manifeste (mais pas quand juste les styles sont modifiés)
      if (!isStylesheet) {
        await Promise.all(
          bundleDirectories.map(dir => {
            return execPromise(`cem analyze --litelement --outdir "${dir}"`, { stdio: 'inherit' });
          })
        );
      }

      bs.reload();
    } catch (err) {
      console.error(chalk.red(err));
    }
  });

  // Recharger sans reconstruire lorsque la documentation change
  bs.watch([`${docdir}/**/!(elements.html).*`]).on('change', async filename => {
    console.log('[doc] File changed: ', filename);
    await nextTask('Documentation monopage', async () => {
      result = await buildTheDocs(true);
    });

    await nextTask(`Copie "${docdir}/styles" dans "${sitedir}/styles"`, async () => {
      result = await copy(path.join(docdir, 'styles'), path.join(sitedir, 'styles'), { overwrite: true });
    });

    await nextTask(`Copie de "${docdir}/templates" dans "${sitedir}/templates"`, async () => {
      return await copy(path.join(docdir, 'templates'), path.join(sitedir, 'templates'), { overwrite: true });
    });
  
    await nextTask(`Documentation multipage`, async () => {
      result = await buildTheChunks();
    });

    bs.reload();
  });
}

// En production
if (!serve) {
  let result;

  await nextTask(`Documentation monopage dans "${docdir}"`, async () => {
    result = await buildTheDocs();
  });

  if (result.output.length > 0) {
    console.log('\n' + result.output.join('\n'));
  }

  await nextTask(`Copie de "${docdir}/styles" dans "${sitedir}/styles"`, async () => {
    return await copy(path.join(docdir, 'styles'), path.join(sitedir, 'styles'), { overwrite: true });
  });

  await nextTask(`Copie de "${docdir}/templates" dans "${sitedir}/templates"`, async () => {
    return await copy(path.join(docdir, 'templates'), path.join(sitedir, 'templates'), { overwrite: true });
  });

  await nextTask(`Documentation multipage dans "${sitedir}"`, async () => {
    result = await buildTheChunks();
  });

  if (result.output.length > 0) {
    console.log('\n' + result.output.join('\n'));
  }
}

// Nettoyage final
process.on('SIGINT', handleCleanup);
process.on('SIGTERM', handleCleanup);
