import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import presetTagify from '@unocss/preset-tagify'
import presetTypography from '@unocss/preset-typography'
import presetAttributify from '@unocss/preset-attributify'

import { defineConfig } from 'unocss'

export default defineConfig({
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
  cli: {
    entry: {
      patterns: ['docs/**/*.html'],
      outFile: 'docs/index-uno.css'
    }, // CliEntryItem | CliEntryItem[]
  },
})
