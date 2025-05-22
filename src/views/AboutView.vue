<template>
  <section class="max-w-5xl mx-auto p-6 space-y-12">
    <div>
      <h1 class="text-4xl font-bold ">About Me</h1>
      <p class="mt-4 text-lg leading-relaxed">
        I am a seasoned 
        <strong>backend software engineer</strong>
         with a deep passion for building robust, scalable, and secure systems. My journey spans several years, during which I’ve mastered modern technologies like 
         <span font-bold text-6 font-medium> Node.js</span>, 
         <span font-bold text-6 font-medium>TypeScript</span>, 
         and <span font-bold text-6 font-medium>MongoDB</span>. 
         I follow proven engineering practices and always aim for efficient, secure solutions—from designing REST APIs to deploying scalable cloud services using AWS.
      </p>
    </div>

    <div>
      <h2 class="text-2xl font-semibold text-gray-700">Technical Proficiency & Engineering Philosophy</h2>
      <ul class="list-disc ml-6 mt-4 space-y-2 text-base">
        <li>
          <strong>Node.js & Express:</strong> Crafting efficient APIs and backends.
          <a href="https://nodejs.org/en/about/" target="_blank" class="font-bold underline ml-1">(Source)</a>
        </li>
        <li>
          <strong>TypeScript:</strong> Writing type-safe, maintainable code.
          <a href="https://www.typescriptlang.org/docs/handbook/intro.html" target="_blank" class="font-bold underline ml-1">(Docs)</a>
        </li>
        <li>
          <strong>MongoDB:</strong> Designing scalable and optimized NoSQL schemas.
          <a href="https://www.mongodb.com/what-is-mongodb" target="_blank" class="font-bold underline ml-1">(Overview)</a>
        </li>
        <li>
          <strong>AWS Cloud:</strong> Managing cloud services like EC2, Lambda, and S3.
          <a href="https://aws.amazon.com/what-is-aws/" target="_blank" class="font-bold underline ml-1">(Learn more)</a>
        </li>
        <li>
          <strong>DevOps:</strong> CI/CD with Docker and Jenkins for smooth delivery.
          <a href="https://docs.docker.com/" target="_blank" class="font-bold underline ml-1">Docker</a>,
          <a href="https://www.atlassian.com/continuous-delivery/what-is-ci-cd" target="_blank" class="font-bold underline">Atlassian</a>
        </li>
      </ul>
    </div>

    <div>
      <h2 class="text-2xl font-semibold text-gray-700">Industry Experience & Projects</h2>
      <p class="mt-4 text-base leading-relaxed">
        I’ve worked on advanced real estate platforms with features like dynamic listings, secure subscriptions, multi-role user management, and automated scraping. Many projects pushed performance boundaries, requiring Redis for caching and Nginx for load balancing.
        <a href="https://www.nginx.com/" target="_blank" class="font-bold underline ml-1">(Nginx Info)</a>
      </p>
    </div>

    <div>
      <h2 class="text-2xl font-semibold text-gray-700">Professional Growth & Aspirations</h2>
      <p class="mt-4 text-base leading-relaxed">
        I'm committed to continuous growth through tech conferences, open-source contributions, and trend monitoring. I stay updated via
        <a href="https://www.computer.org/csdl/magazine/so" target="_blank" class="font-bold underline">IEEE Software</a> and
        <a href="https://github.com/" target="_blank" class="font-bold underline">GitHub</a>.
      </p>
    </div>

    <div>
      <h2 class="text-2xl font-semibold text-gray-700">Mantra & Soft Skills</h2>
      <p class="mt-4 text-base leading-relaxed">
        I value <strong>clarity, collaboration, and ethics</strong> in every line of code. I bring energy, ownership, and curiosity to any challenge—whether it's debugging, mentoring, or innovating.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Optional fade-in animation */
section {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
