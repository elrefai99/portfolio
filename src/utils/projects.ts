import lesoll from '../../public/projects/lesoll-logo.png'
import egystay from "../../public/projects/egy-stay-logo.png"
import keepits from "../../public/projects/keepits.png"
import Gosha0 from "../../public/projects/0Gosha.png"
import GenImport from '../../public/projects/Gen-Import.jpg'

export const projects: any = [
  {
    id: 1,
    name: "Lesoll",
    category: "Live",
    logo: lesoll,
    link: "https://lesoll.com",
    class: "w-5 h-auto",
    github: "",
    desc: [
      "Developed a B2C and B2B marketplace for real estate and automotive",
      "Developed key features: Payment system (use paymob as payment gateway), admin dashboard, user dashboard, chat system, notifications system, emails system, sms system (OTP system), traffic system (use puppeteer to scrape websites),reports and employee tools",
      "Deployed and managed a service using Docker and AWS EC2"
    ],
    tags: [
      "Typescript",
      "Javascript",
      "Express.js",
      "MongoDB",
      "Paymob",
      "SendGrid",
      "Message Queue (BullMQ, AWS SQS)",
      "Redis",
      "Puppeteer",
      "Swagger",
      "Docker",
      "AWS (S3, EC2, CloudFront, Route 53, SQS)",
      "Render",
      "Socket.IO",
      "Axios",
      "NGINX",
      "pm2",
      "pnpm",
      "git/github",
      "Github Actions"
    ]
  },
  {
    id: 2,
    name: "EGYStay",
    category: "Live",
    logo: egystay,
    class: "w-5 h-auto",
    link: "https://egystay.com",
    github: "",
    desc: [
      "Developed a B2C marketplace for and mobile application property rental and booking",
      "Developed key features: Payment system (use Amazon Payment Service (APS) as payment gateway), CoHost system (allow users to host their properties), Cancellation policy system, booking system, admin dashboard, user dashboard, chat system, notifications system, emails system, sms system (OTP system), traffic system (use puppeteer to scrape websites),reports and employee tools",
      "Deployed and managed a service using Docker, AWS EKS (Elastic Kubernetes Service) and render"
    ],
    tags: [
      "Typescript",
      "Express.js",
      "MongoDB",
      "Amazon Payment Service (APS)",
      "SendGrid",
      "Message Queue (BullMQ, AWS SQS)",
      "Redis",
      "Swagger",
      "Docker",
      "AWS (S3, EC2, CloudFront, Route 53, SQS)",
      "Render",
      "Socket.IO",
      "Axios",
      "NGINX",
      "pm2",
      "pnpm",
      "git/github",
      "Github Actions"
    ]
  },
  {
    id: 3,
    name: "0Gosha",
    category: "Backend",
    logo: Gosha0,
    class: "w-5 h-5",
    github: "https://github.com/elrefai99/0G0sha",
    desc: [
      "Pure AI agent engine that optimizes prompts - learns from user feedback.",
      "No AI API calls. No OpenAI. No Claude API.",
      "0Gosha is a self-contained rule-based engine that rewrites raw user text into professional, structured prompts optimized for Claude, GPT, or any LLM.",
      "It gets smarter over time by learning which transformation rules produce the highest-rated results."
    ],
    tags: [
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Redis",
      "BullMQ",
      "nodemailer",
      "Swagger",
      "Docker",
      "Vitest",
      "Zod",
      "cloudinary",
      "Axios",
      "NGINX",
      "pm2",
      "Socket.IO",
      "Gen-Import",
      "pnpm",
      "git/github",
      "Github Actions"
    ]
  },
  {
    id: 4,
    name: "Gen Import",
    category: "Package",
    logo: GenImport,
    class: "w-5 h-5",
    github: "https://github.com/0G0sha/gen-import",
    npm: "https://www.npmjs.com/package/gen-import",
    desc: [
      "Generate a TypeScript barrel file for your Express/Node project using the TypeScript compiler API.",
      "Automatically generate TypeScript/JavaScript barrel files using the TypeScript compiler API",
      "Cycle detection · topological sort · globals mode · rich console output."
    ],
    tags: [
      "TypeScript",
      "Express",
      "pnpm",
      "git/github",
      "Github Actions",
      "fs"
    ]
  },
  {
    id: 5,
    name: "KeepITs",
    category: "Live",
    logo: keepits,
    class: "w-5 h-5",
    link: "https://keepit.elrefai.me/",
    github: "https://github.com/elrefai99/keepits",
    desc: "A lightweight schedule management web app built for organizing daily tasks and dates in a simple, clean interface. The application is deployed on Netlify, providing fast loading, automatic deployments, and reliable hosting for modern web projects.",
    tags: [
      "TypeScript",
      "Firebase",
      "Vue.js",
      "Vite",
      "Netlify",
      "git/github",
      "Docker"
    ]
  },
  {
    id: 5,
    name: "Doc-Station - Orthopedic Surgery Platform",
    category: "Backend",
    link: "",
    github: "https://github.com/elrefai99/doc-station",
    desc: "A comprehensive healthcare platform connecting patients with orthopedic surgeons and providing a marketplace for surgical instruments. The platform enables seamless appointment booking, medical consultations, and equipment rental services.",
    tags: [
      "TypeScript",
      "Express.js",
      "Redis",
      "BullMQ",
      "Prisma",
      "PostgreSQL",
      "SendGrid",
      "Docker",
      "AWS (S3, EKS, EC2, ECR)",
      "Payment (Paymob, Amazon Payment Service)",
      "Socket.IO",
      "NGINX",
      "pm2",
      "pnpm",
      "K8s (Kubernetes, AWS EKS)",
      "git/github",
    ]
  },
  {
    id: 6,
    name: "Smart Parser",
    category: "Backend",
    link: "",
    github: "https://github.com/elrefai99/smart-parser",
    desc: 'A full-featured RESTful API built with Node.js, Express.js, and TypeScript, designed to handle file uploads, parsing, and export operations for various document formats including PDF, DOCX, and Excel.',
    tags: [
      "Javascript",
      "TypeScript",
      "Express.js",
      "pdf-parse",
      "mammoth",
      "Puppeteer",
      "exceljs",
      "Docker",
    ]
  },
  {
    id: 7,
    name: 'Wedding Orgnization',
    category: "Backend",
    link: "",
    github: "https://github.com/elrefai99/Wedding_Orgnization",
    desc: "It is my graduation project, it's like when u need become marriage and need rent wedding hall for it u can from list of famous hall with us and has section about rent car for this wedding.",
    tags: [
      "TypeScript",
      "Express.js",
      "MongoDB (NoSQL)",
      "Sprit",
      "SendGrid",
    ]
  },
  {
    id: 8,
    name: "Data Localizer",
    category: "Package",
    github: "https://github.com/elrefai99/data-localizer",
    npm: "https://www.npmjs.com/package/data-localizer",
    desc: "A lightweight TypeScript utility for handling multilingual data structures.It helps you localize arrays or objects by returning values based on a given language key (e.g., ar, en). Perfect for apps that need to support multiple languages without writing repetitive localization logic.",
    tags: [
      "TypeScript",
    ]
  },
  {
    id: 9,
    name: "Elrecord",
    category: "Backend",
    github: "https://github.com/elrefai99/elrecord",
    desc: "Elrecord is a powerful, scalable backend for a real-time chat application inspired by Discord. It supports direct messaging, group chats, and server-based communities with voice/video call capabilities.",
    tags: [
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Amazon Payment Service (APS)",
      "Message Queue (BullMQ)",
      "Swagger",
      "Redis",
      "Socket.IO",
      "Docker",
      "AWS S3",
      "NGINX",
      "pm2",
      "pnpm",
      "git/github",
    ]
  },
  {
    id: 10,
    name: "Tasks-Day",
    category: "Backend",
    github: "https://github.com/elrefai99/Tasks-Day",
    desc: "A lightweight schedule management web app built for organizing daily tasks and dates in a simple, clean interface. The application is deployed on Netlify, providing fast loading, automatic deployments, and reliable hosting for modern web projects.",
    tags: [
      "TypeScript",
      "Express.js",
      "Paymob",
      "Amazon Payment Service (APS)",
      "SendGrid",
      "Agenda",
      "Swagger",
      "Docker",
      "MongoDB",
      "pnpm",
      "git/github",
      "Github Actions"
    ]
  },
]
