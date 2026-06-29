import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
     shortcuts: {
          'border-base': 'border-gray/20 dark:border-gray/15',
          'bg-base': 'bg-white dark:bg-[#1a1a1a]',
          'bg-canvas': 'bg-gray:15 dark:bg-[#111]',
          'icon-btn': 'op30 hover:op100',
          'social-link': 'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/75 text-xl text-gray-600 shadow-[0_14px_32px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-black/15 hover:bg-white/90 hover:text-gray-900 hover:shadow-[0_18px_36px_rgba(0,0,0,0.14)] dark:border-white/15 dark:bg-white/10 dark:text-gray-200 dark:shadow-[0_14px_32px_rgba(0,0,0,0.28)] dark:hover:border-white/20 dark:hover:bg-white/16 dark:hover:text-white dark:hover:shadow-[0_18px_36px_rgba(0,0,0,0.36)]',
          'social-icon': 'h-5 w-5',
     },
     presets: [
          presetUno({ dark: 'class' }),
          presetAttributify(),
          presetIcons(),
     ],
     theme: {
          colors: {
               whiteMode: "#202020",
               // Architectural blueprint palette
               blueprint: {
                    DEFAULT: "#4FC3F7",
                    glow: "#7fd6fb",
                    dim: "#2b6f8f",
                    deep: "#0a1f2b",
                    ink: "#0b3d5c",
               },
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
          'i-logos:pinia',
          'i-logos:unocss',
     ],
})
