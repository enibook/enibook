import { defineConfig } from "vite";
import UnoCSS from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import presetTagify from '@unocss/preset-tagify'
import presetTypography from '@unocss/preset-typography'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  plugins: [
    UnoCSS({
      // mode: 'shadow-dom',
      include: ['./docs/elements/elements.html'],
      presets: [
        presetUno(),
        presetAttributify(),
        presetTagify(),
        presetTypography(),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
          prefix: 'it-',
          warn: true,    
        }),
      ],
    }),
  ],
  /*
  build: {
    cssCodeSplit: true,
    emptyOutDir: false,
    lib: {
      entry: 'docs/elements/adoc.ts',
      name: 'enibook-doc',
    },
    outDir: 'docs/elements/',
    rollupOptions: {
      output: {
        entryFileNames: 'adoc.js',
        assetFileNames: 'uno.css'
      },
    },
  },
  server: {
    open: 'docs/elements/elements.html',
  },
  */
  preview: {
    open: 'docs/elements/elements.html'
  },
});