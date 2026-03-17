import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
     presets: [
          presetUno({ dark: 'class' }),
          presetAttributify(),
          presetIcons(),
     ],
     theme: {
          colors: {
               whiteMode: "#202020",
          },
     },
     safelist: [
          'i-logos:typescript-icon',
          'i-logos:javascript',
          'i-skill-icons:expressjs-dark',
          'i-logos:mongodb-icon',
          'i-logos:redis',
          'i-logos:docker-icon',
          'i-logos:aws',
          'i-logos:vue',
          'i-logos:vitejs',
          'i-logos:firebase',
          'i-logos:netlify-icon',
          'i-logos:postgresql',
          'i-logos:prisma',
          'i-logos:github-actions',
          'i-logos:github-icon',
          'i-logos:pnpm',
          'i-logos:nginx',
          'i-logos:swagger',
          'i-logos:puppeteer',
          'i-logos:socket-io',
          'i-logos:kubernetes',
          'i-logos:render',
          'i-logos:sendgrid',
          'i-logos:axios',
          'i-logos:npm-icon',
     ],
})
