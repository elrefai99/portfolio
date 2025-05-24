<template>
  <div bg-white p-0 m-0 font-sans text-gray-800 max-w="210mm" mx-auto>
    <div min-h="297mm" p="20mm" bg-white shadow-md print:shadow-none print:min-h-0 print:p-0 mb-5 print:mb-0 print:break-after-page>
      <div border-b-2 border-gray-800 pb-2 mb-5>
          <h1 text-2xl font-bold m-0>Mohamed Mostafa</h1>
        <p text-lg font-semibold m-0 mt-1>Software Engineer</p>
        <div flex flex-wrap gap-4 text-sm mt-2>
          <span>Phone: (+20)114 231 4446</span>
          <span>E-mail: mohamed.mostafa0699@gmail.com</span>
          <span>GitHub: elrefai99 (Mohamed Elrefai)</span>
          <span>Country: Egypt City: Banha Exempted</span>
        </div>
      </div>

      <div mb-5>
        <h2 text-xl border-b border-gray-300 pb-1 mb-3>About me</h2>
        <p text-sm leading-relaxed>
          I'm a software engineer with 4+ years of experience in web development, specializing in backend development with Node.js and AWS (EC2, S3). I've recently expanded into frontend development and continuously seek to grow by exploring new technologies and working across diverse environments.
        </p>
      </div>

      <div mb-5>
        <h2 text-xl border-b border-gray-300 pb-1 mb-3>Work Experience</h2>
        
        <div mb-4>
          <h3 text-base font-semibold mb-1>Lesoll:</h3>
          <ul list-disc pl-5 text-sm space-y-1>
            <li>Built and maintained three major backend systems:
              <ul list-disc pl-5 mt-1 space-y-1>
                <li><strong>Property API:</strong>
                  <ul list-disc pl-5 mt-1 space-y-1>
                    <li>Designed RESTful APIs to manage property listings, including draft, publishing, search filters and featured (Pinned and Repost Functionalities)</li>
                  </ul>
                </li>
                <li><strong>Car API:</strong>
                  <ul list-disc pl-5 mt-1 space-y-1>
                    <li>Developed a separate API to manage car listings, brands, models, advanced search and package-based features</li>
                  </ul>
                </li>
                <li><strong>Admin Dashboard:</strong>
                  <ul list-disc pl-5 mt-1 space-y-1>
                    <li>Built a secure dashboard backend with role-based access control for managing users, listing ads, package and financial reporting</li>
                    <li>Built Real-time analytics views to monitor traffic and user behavior.</li>
                    <li>Implemented tracking of user traffic sources by country, UTM parameters, and referral platforms (e.g., Google, Facebook, direct).</li>
                    <li>Built a real-time chat system using <strong>Socket.io</strong>, enabling admin to communicate within the platform.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><strong>Infrastructure & Deployment:</strong>
              <ul list-disc pl-5 mt-1 space-y-1>
                <li>Managed three servers for backend deployment:
                  <ul list-disc pl-5 mt-1 space-y-1>
                    <li>EC2: handle property api, car api and image server cloud.</li>
                    <li>Configured NGINX for reverse proxying and load balancing on EC2 (Ubuntu)</li>
                    <li>Render: deployed admin dashboard backend.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>Built a subscription and point-base system allowing users to activate premium feature.</li>
            <li>Integrated SendGrid for transactional emails communication and Paymob for payment processing with automated status handling.</li>
            <li>Generated PDF invoice using Puppeteer.</li>
            <li>Implemented Docker containers for consistent deployment and local development environments.</li>
            <li><strong>Technologies:</strong>
              <ul list-disc pl-5 mt-1 space-y-1>
                <li>Node.js, Express.js, MongoDB(mongoose), Typescript, Redis, Puppeteer, SendGrid, Paymob, Docker, AWS (S3, EC2, Route 53 and CloudFront) and swagger</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div min-h="297mm" p="20mm" bg-white shadow-md print:shadow-none print:min-h-0 print:p-0 print:break-after-page>
      <div mb-4>
        <h3 text-base font-semibold mb-1>Wedding Organization System (Graduation Project – Backend Developer)</h3>
        <ul list-disc pl-5 text-sm space-y-1>
          <li>Developed the complete backend system for a web application that organizes wedding services.</li>
          <li>Built RESTful APIs to support service listings, rentals, and ad management.</li>
          <li>Implemented CRUD operations for users, ads, and service providers.</li>
          <li>Designed backend logic to handle service rental workflows, availability checks, and booking records.</li>
          <li>Integrated authentication and role-based access control for users and service providers.</li>
          <li><strong>Tech Stack:</strong> Node.js, Express.js, MongoDB, Mongoose, JWT</li>
        </ul>
      </div>

      <div mb-4>
        <h3 text-base font-semibold mb-1>Elrecord: Real-Time Chat Application (Backend Developer):</h3>
        <ul list-disc pl-5 text-sm space-y-1>
          <li>Developed the full backend for a chat application that allows users to chat with friends in real-time.</li>
          <li>Built using Express.js, TypeScript, Socket.io, MongoDB (Mongoose), and Redis for efficient session management and message broadcasting.</li>
          <li>Deployed the application backend to Render for scalability and simplicity.</li>
          <li>Implemented user authentication, message history storage, and online/offline status tracking.</li>
          <li><strong>Tech Stack:</strong>
            <ul list-disc pl-5 mt-1 space-y-1>
              <li>Node.js, Express.js, TypeScript, Socket.io, MongoDB, Redis, Render</li>
            </ul>
          </li>
        </ul>
      </div>

      <div mb-5>
        <h2 text-xl border-b border-gray-300 pb-1 mb-3>Education</h2>
        <div>
          <h3 text-base font-semibold mb-1>Bachelor of Computer Science</h3>
          <p text-sm m-0>Modern Academy – Maadi, Cairo</p>
          <p text-sm mt-1>Courses: Data Structures & Algorithms, Java OOP, Web Applications, C++ Program Design, Big Data Analytics.</p>
        </div>
      </div>

      <div>
        <h2 text-xl border-b border-gray-300 pb-1 mb-3>Language</h2>
        <p text-sm>Arabic (Native speaker), English (Intermediate)</p>
      </div>
    </div>
        <a     text-2xl mt2 mx-5   href="/resume.pdf" download>Download Resume </a>

  </div>
</template>

<style>

@page {
  size: A4;
  margin: 0;
}

@media print {
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    background: white;
  }
  
  .print\:break-after-page {
    page-break-after: always;
  }
  
  .print\:shadow-none {
    box-shadow: none;
  }
  
  .print\:min-h-0 {
    min-height: 0;
  }
  
  .print\:p-0 {
    padding: 0;
  }
  
  .print\:mb-0 {
    margin-bottom: 0;
  }
}
</style>
