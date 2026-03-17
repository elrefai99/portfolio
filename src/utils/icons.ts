export const tagIconMap: Record<string, string> = {
     'typescript': 'i-logos:typescript-icon',
     'javascript': 'i-logos:javascript',
     'express': 'i-skill-icons:expressjs-dark',
     'mongodb': 'i-logos:mongodb-icon',
     'redis': 'i-logos:redis',
     'docker': 'i-logos:docker-icon',
     'aws': 'i-logos:aws',
     'amazon': 'i-logos:aws',
     'vue': 'i-logos:vue',
     'vite': 'i-logos:vitejs',
     'firebase': 'i-logos:firebase',
     'netlify': 'i-logos:netlify-icon',
     'postgresql': 'i-logos:postgresql',
     'postgres': 'i-logos:postgresql',
     'prisma': 'i-logos:prisma',
     'github actions': 'i-logos:github-actions',
     'git/github': 'i-logos:github-icon',
     'github': 'i-logos:github-icon',
     'pnpm': 'i-logos:pnpm',
     'nginx': 'i-logos:nginx',
     'swagger': 'i-logos:swagger',
     'puppeteer': 'i-logos:puppeteer',
     'socket.io': 'i-logos:socket-io',
     'kubernetes': 'i-logos:kubernetes',
     'k8s': 'i-logos:kubernetes',
     'render': 'i-logos:render',
     'sendgrid': 'i-logos:sendgrid',
     'axios': 'i-logos:axios',
     'npm': 'i-logos:npm-icon',
}

export function getTagIcon(tag: string): string | null {
     const lower = tag.toLowerCase()
     for (const key of Object.keys(tagIconMap)) {
          if (lower.includes(key)) return tagIconMap[key]
     }
     return null
}
