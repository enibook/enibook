// vite
import { defineConfig } from "vite";
// unocss
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
          },
          prefix: 'it-',
          warn: true,    
        }),
      ]
    }),
  ],
});
