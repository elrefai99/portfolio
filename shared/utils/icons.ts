export const tagIconMap: Record<string, string> = {
     'node': 'logos:nodejs-icon-alt',
     'typescript': 'logos:typescript-icon',
     'javascript': 'logos:javascript',
     'express': 'skill-icons:expressjs-dark',
     'mongodb': 'logos:mongodb-icon',
     'redis': 'logos:redis',
     'docker': 'logos:docker-icon',
     'aws': 'logos:aws',
     'amazon': 'logos:aws',
     'vue': 'logos:vue',
     'vite': 'logos:vitejs',
     'firebase': 'logos:firebase',
     'postgresql': 'logos:postgresql',
     'postgres': 'logos:postgresql',
     'prisma': 'logos:prisma',
     'github actions': 'logos:github-actions',
     'git/github': 'logos:github-icon',
     'github': 'logos:github-icon',
     'pnpm': 'logos:pnpm',
     'nginx': 'logos:nginx',
     'swagger': 'logos:swagger',
     'puppeteer': 'logos:puppeteer',
     'socket.io': 'logos:socket-io',
     'kubernetes': 'logos:kubernetes',
     'k8s': 'logos:kubernetes',
     'axios': 'logos:axios',
     'pinia': 'logos:pinia',
     'unocss': 'logos:unocss',
}

export function getTagIcon(tag: string): string | null {
     const lower = tag.toLowerCase()
     for (const key of Object.keys(tagIconMap)) {
          if (lower.includes(key)) return tagIconMap[key]
     }
     return null
}
