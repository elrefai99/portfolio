export const projects = [
  {
    id: 1,
    title: 'Lesoll',
    image: '/projects/lesoll.png',
    github: "",
    site: "https://lesoll.com",
    category: "Live",
    tech: 'Node.js, Express.js, MongoDB (Mongoose), TypeScript, Redis, Puppeteer, SendGrid, Paymob, Docker, AWS (S3, EC2, Route 53, CloudFront), Swagger',
    sections: [
      {
        title: 'Backend Systems',
        points: [
          'Built and maintained three major backend systems:',
          'Property API: Designed RESTful APIs to manage property listings, including draft, publishing, search filters and featured (Pinned and Repost Functionalities).',
          'Car API: Developed a separate API to manage car listings, brands, models, advanced search and package-based features.',
          'Admin Dashboard: Built a secure dashboard backend with role-based access control for managing users, listing ads, package and financial reporting.',
          'Built Real-time analytics views to monitor traffic and user behavior.',
          'Implemented tracking of user traffic sources by country, UTM parameters, and referral platforms (e.g., Google, Facebook, direct).',
          'Built a real-time chat system using Socket.io, enabling admin to communicate within the platform.'
        ]
      },
      {
        title: 'Infrastructure & Deployment',
        points: [
          'Managed three servers for backend deployment (EC2, Render).',
          'Configured NGINX for reverse proxying and load balancing.',
          'Implemented Docker containers for consistent deployment and local development.',
          'Deployed admin dashboard backend to Render.'
        ]
      },
      {
        title: 'Integrations & Features',
        points: [
          'Built a subscription and point-based system for premium features.',
          'Integrated SendGrid for email and Paymob for payment processing.',
          'Generated PDF invoices using Puppeteer.'
        ]
      },
    ]
  },
  {
    id: 3,
    title: 'Smart Parser',
    github: "https://github.com/elrefai99/smart-parser",
    site: "",
    image: '/projects/smartparser.png',
    category: 'Current Focus',
    description: `
    A full-featured RESTful API built with Node.js, Express.js, and TypeScript, designed to handle file uploads, parsing, and export operations for various document formats including PDF, DOCX, and Excel. The system enables users to upload documents, instantly view extracted content, and download the data in their preferred format—PDF, XLSX, or DOCX. It leverages tools such as pdf-parse, mammoth, xlsx, exceljs, and puppeteer for accurate and flexible file handling. The API also supports large file uploads (over 50MB) and includes a pricing mechanism to manage usage limits. 
    `
  },
  {
    id: 2,
    title: 'Elrecord',
    github: "https://github.com/elrefai99/elrecord",
    site: "",
    image: '/projects/elrecord.jpeg',
    category: 'Real Time',
    tech: 'Node.js, Express.js, MongoDB (Mongoose), TypeScript, Redis, Puppeteer, SendGrid, Paymob, Docker, AWS (S3, EC2, Route 53, CloudFront), Swagger',
    sections: [
      {
        title: 'Real-Time Chat Backend System',
        points: [
          'DThis backend project implements a real-time chat system using modern technologies suitable for scalable and interactive communication applications. It supports:',
          'Direct Messaging (DM)',
          'Global Server Chat (Public Room)',
          'Last Chats Management',
          'User-to-User Friend Communication',
        ]
      },
      {
        title: ' Real-Time Messaging (WebSocket-based)',
        points: [
          'Built using Socket.IO over Express.js/Node.js.',
          'Enables bi-directional real-time communication between users.',
        ]
      },
      {
        title: 'Direct Messaging (DM)',
        points: [
          'One-to-one private messaging between users.',
          'Each conversation is uniquely identified.',
          'Messages are stored in MongoDB with timestamps and read status.',
          'Includes message read receipts and delivery status.',
        ]
      },
      {
        title: 'Global Server Chat (Friend Group Chat)',
        points: [
          'A shared room where users can talk in public.',
          'Acts as a “general” or “friends-only” group chat room.',
        ]
      },
      {
        title: 'Integrations & Features',
        points: [
          'Built a subscription and point-based system for premium features.',
          'Integrated SendGrid for email and Paymob for payment processing.',
          'Generated PDF invoices using Puppeteer.'
        ]
      },
    ],
  }
];
