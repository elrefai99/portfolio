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
          animation: {
               'drift-one': 'drift-one 24s ease-in-out infinite',
               'drift-two': 'drift-two 22s ease-in-out infinite',
               'drift-three': 'drift-three 19s ease-in-out infinite',
               'drift-four': 'drift-four 17s ease-in-out infinite',
               'drift-five': 'drift-five 14s ease-in-out infinite',
               'project-rise': 'project-rise 0.6s ease-out backwards',
               'project-tab': 'project-tab 0.5s ease-out backwards',
          },
          keyframes: {
               'drift-one': {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
                    '50%': { transform: 'translate3d(-4vw, 5vh, 0) scale(1.1)' },
               },
               'drift-two': {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
                    '50%': { transform: 'translate3d(5vw, -4vh, 0) scale(1.08)' },
               },
               'drift-three': {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
                    '50%': { transform: 'translate3d(-2vw, 3vh, 0) scale(1.12)' },
               },
               'drift-four': {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
                    '50%': { transform: 'translate3d(3vw, -3vh, 0) scale(1.16)' },
               },
               'drift-five': {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
                    '50%': { transform: 'translate3d(-2vw, 4vh, 0) scale(1.14)' },
               },
               'project-rise': {
                    from: {
                         opacity: '0',
                         transform: 'translateY(30px)',
                    },
                    to: {
                         opacity: '1',
                         transform: 'translateY(0)',
                    },
               },
               'project-tab': {
                    from: {
                         opacity: '0',
                         transform: 'translateY(-10px)',
                    },
                    to: {
                         opacity: '1',
                         transform: 'translateY(0)',
                    },
               },
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
