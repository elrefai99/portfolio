import lesoll from '../../public/projects/lesoll-logo.png'
import egystay from "../../public/projects/egystay.png"

export const projects: any = [
  {
    id: 1,
    name: "Lesoll",
    category: "Live",
    logo: lesoll,
    link: "https://lesoll.com",
    class: "w-5 h-auto -ml2 -mr-2 mb-0.5",
    github: "",
    desc: 'Lesoll platform that user can sale or rent his apartment or his car, and in same time can buy and unit he want or rent it and the same in car',
    tags: [
      "Typescript",
      "Javascript",
      "Express.js",
      "MongoDB",
      "Paymob",
      "SendGrid",
      "Redis",
      "Puppeteer",
      "Swagger",
      "Docker",
      "AWS",
      "Render",
      "Socket.IO",
      "NGINX",
      "pm2",
      "pnpm",
      "git/github",
    ]
  },
  {
    id: 2,
    name: "EGYStay",
    category: "Live",
    logo: egystay,
    class: "w-5 h-auto -ml2 -mr-2 mb-0.5",
    link: "https://egystay.com",
    github: "",
    desc: 'Egystay is a modern booking platform where users can reserve rental units for flexible short-term stays, whether daily or weekly.',
    tags: [
      "Typescript",
      "Express.js",
      "MongoDB",
      "Amazon Payment Service (APS)",
      "SendGrid",
      "Message Queue (BullMQ)",
      "Redis",
      "Swagger",
      "Docker",
      "AWS",
      "Render",
      "Socket.IO",
      "NGINX",
      "pm2",
      "pnpm",
      "git/github",
    ]
  },
  {
    id: 3,
    name: "Schedule",
    category: "Live",
    link: "https://schedule-elrefai.netlify.app/",
    github: "https://github.com/elrefai99/schedule",
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
    id: 4,
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
    id: 5,
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
    id: 7,
    name: "Data Localizer",
    category: "Package",
    // link: "https://github.com/elrefai99/data-localizer",
    github: "https://github.com/elrefai99/data-localizer",
    npm: "https://www.npmjs.com/package/data-localizer",
    desc: "A lightweight TypeScript utility for handling multilingual data structures.It helps you localize arrays or objects by returning values based on a given language key (e.g., ar, en). Perfect for apps that need to support multiple languages without writing repetitive localization logic.",
    tags: [
      "TypeScript",
    ]
  },
]
