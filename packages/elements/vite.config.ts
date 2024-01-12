import { defineConfig } from "vite";
import { glob } from 'glob'
import VitePluginCustomElementsManifest from 'vite-plugin-cem'
import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example'
import vitePluginCp from 'vite-plugin-cp'
import UnoCSS from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import presetTagify from '@unocss/preset-tagify'
import presetTypography from '@unocss/preset-typography'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      include: ['./src/elements/**/*.ts', './src/utilities/**/*.ts'],
      presets: [
        presetUno(),
        presetAttributify(),
        presetTagify(),
        presetTypography(),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
            'width': '1em',
            'height': '1em'
          },
          prefix: 'it-',
          warn: true,    
        }),
      ],
    }),
    VitePluginCustomElementsManifest({
      files: glob.sync('./src/elements/**/*.ts'),
      lit: true,
      dev: true,
      packageJson: true,
      plugins: [
        jsdocExamplePlugin()
      ]
    }),
    vitePluginCp({
      targets: [
        { src: 'dist/', dest: '../docs/elements/_dist/', flatten: false },
        { src: 'dist/custom-elements.json', dest: 'dev' },
      ],
    }),
  ],
  server: {
    open: 'dev/index.html',
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/enibook.ts',
      name: 'enibook',
      fileName: 'enibook'
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'enibook.css'
      }
    },
  },
  preview: {
    open: 'dist/index.html',
  },
});