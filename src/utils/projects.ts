export const projects = [
  {
    id: 1,
    title: 'Lesoll',
    image: '/projects/lesoll.png',
    github: "",
    site: "https://lesoll.com",
    category: "Live",
    description: `
      • Built and maintained three major backend systems:
        - Property API:
          - Designed RESTful APIs to manage property listings, including draft, publishing, search filters and featured (Pinned and Repost Functionalities).
        - Car API:
          - Developed a separate API to manage car listings, brands, models, advanced search and package-based features.
        - Admin Dashboard:
          - Built a secure dashboard backend with role-based access control for managing users, listing ads, package and financial reporting.
          - Built Real-time analytics views to monitor traffic and user behavior.
          - Implemented tracking of user traffic sources by country, UTM parameters, and referral platforms (e.g., Google, Facebook, direct).
          - Built a real-time chat system using Socket.io, enabling admin to communicate within the platform.

      • Infrastructure & Deployment:
        - Managed three servers for backend deployment:
          - EC2: handle property API, car API and image server cloud.
          - Configured NGINX for reverse proxying and load balancing on EC2 (Ubuntu).
          - Render: deployed admin dashboard backend.

      • Built a subscription and point-based system allowing users to activate premium features.
      • Integrated SendGrid for transactional email communication and Paymob for payment processing with automated status handling.
      • Generated PDF invoices using Puppeteer.
      • Implemented Docker containers for consistent deployment and local development environments.

      • Technologies: Node.js, Express.js, MongoDB (Mongoose), TypeScript, Redis, Puppeteer, SendGrid, Paymob, Docker, AWS (S3, EC2, Route 53, CloudFront), Swagger.
    `
  },
  {
    id: 2,
    title: 'Elrecord',
    github: "https://github.com/elrefai99/elrecord",
    site: "",
    image: '/projects/elrecord.jpeg',
    // category: 'Current Focus',
    category: 'Real Time',
    description: `
      • Developed the full backend for a chat application that allows users to chat with friends in real-time.
      • Built using Express.js, TypeScript, Socket.io, MongoDB (Mongoose), and Redis for efficient session management and message broadcasting.
      • Deployed the application backend to Render for scalability and simplicity.
      • Implemented user authentication, message history storage, and online/offline status tracking.
      • Tech Stack:
          - Node.js 
          - Express.js 
          - TypeScript 
          - Socket.io 
          - MongoDB 
          - Redis 
          - Render`
  },
]
