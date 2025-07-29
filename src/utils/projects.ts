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
    id: 2,
    title: 'Chat (Lesoll)',
    image: '/projects/lesoll-chat.png',
    github: "",
    site: "https://lesoll.com",
    category: "Live",
    tech: 'Node.js, Express.js, MongoDB (Mongoose), TypeScript, Redis, Docker, AWS (ECR, FORGATE), Swagger',
    sections: [
      {
        title: 'Backend Systems',
        points: [
          'Developed a real-time chat system using Socket.io to support direct communication between users inside the platform.',
          'Each conversation is scoped to a specific listing (property or car), allowing users to have separate chat threads per ad—even when the same users are involved.',
          'Chat rooms are dynamically created when a user initiates a conversation from an ad page, ensuring message context remains tied to the relevant listing.',
          'Designed the chat schema and API to support scalability and prevent message overlap between listings.',
          'Implemented backend logic to handle message delivery, history storage, and real-time updates using WebSocket events.',
          'Integrated the chat with the notification system to alert users of new messages, even when offline.',
          'Added admin-side visibility into chat sessions to monitor activity and support dispute handling if needed.'
        ]
      },
      {
        title: 'Infrastructure & Deployment',
        points: [
          'Managed deployment across three backend environments using AWS EC2 and Render, ensuring high availability and scalability.',
          'Configured NGINX as a reverse proxy and load balancer to optimize traffic routing and improve performance.',
          'Utilized Docker for containerized development and deployment, ensuring consistency across local and production environments.',
          'Automated deployment processes for the admin dashboard backend on Render for seamless updates and maintenance.'
        ]
      },
      {
        title: 'Integrations & Features',
        points: [
          'Developed a dynamic subscription and point-based system to enable premium ad features (e.g., Pin, Repost, Homepage Placement), with admin-controlled expiration and limits.',
          'Integrated SendGrid for transactional email delivery, including domain authentication and failover handling.',
          'Integrated Paymob as a payment gateway, supporting both credit card and wallet-based payments with automated handling of failed transactions.',
          'Implemented PDF generation for invoices and billing summaries using Puppeteer, with styled HTML templates and secure file storage.'
        ]
      }

    ]

  },
  {
    id: 3,
    title: 'Smart Parser',
    github: "https://github.com/elrefai99/smart-parser",
    site: "",
    image: '/projects/smartparser.png',
    // category: 'Current Focus',
    category: 'Backend',
    description: `
    A full-featured RESTful API built with Node.js, Express.js, and TypeScript, designed to handle file uploads, parsing, and export operations for various document formats including PDF, DOCX, and Excel. The system enables users to upload documents, instantly view extracted content, and download the data in their preferred format—PDF, XLSX, or DOCX. It leverages tools such as pdf-parse, mammoth, xlsx, exceljs, and puppeteer for accurate and flexible file handling. The API also supports large file uploads (over 50MB) and includes a pricing mechanism to manage usage limits. 
    `
  },
  {
    id: 2,
    title: 'Elrecord',
    github: "https://github.com/elrefai99/elrecord",
    site: "",
    image: '/projects/elrecord.png',
    category: 'Socket.io',
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
