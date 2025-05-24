<script setup lang="ts">
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
  <section class="max-w-5xl mx-auto p-6 space-y-12">
    <div>
      <h1 class="text-4xl font-bold">Mohamed Mostafa</h1>
      <p class="mt-4 text-lg leading-relaxed">
        I’m a seasoned <strong>backend software engineer</strong> with a strong drive to architect robust, scalable, and secure systems. With hands-on experience across multiple industries, I’ve cultivated deep expertise in 
        <span class="font-bold">Node.js</span>, 
        <span class="font-bold">TypeScript</span>, and 
        <span class="font-bold">MongoDB</span>. I apply clean architecture and proven engineering practices—from designing RESTful APIs to deploying resilient services on AWS.
      </p>
    </div>

    <div>
      <h2 class="text-3xl font-semibold">Technical Proficiency & Engineering Philosophy</h2>
      <ul class="list-disc ml-6 mt-4 space-y-2 text-base">
        <li>
          <strong>Node.js & Express.js:</strong> Building performant APIs and services.
          <a href="https://nodejs.org/en/about/" target="_blank" class="font-bold underline ml-1">(Source)</a>
        </li>
        <li>
          <strong>TypeScript:</strong> Writing type-safe, maintainable backend logic.
          <a href="https://www.typescriptlang.org/docs/handbook/intro.html" target="_blank" class="font-bold underline ml-1">(Docs)</a>
        </li>
        <li>
          <strong>MongoDB:</strong> Creating scalable, schema-driven NoSQL databases.
          <a href="https://www.mongodb.com/what-is-mongodb" target="_blank" class="font-bold underline ml-1">(Overview)</a>
        </li>
        <li>
          <strong>AWS Cloud:</strong> Deploying and maintaining cloud systems using EC2, S3, Route 53, and CloudFront.
          <a href="https://aws.amazon.com/what-is-aws/" target="_blank" class="font-bold underline ml-1">(Learn more)</a>
        </li>
        <li>
          <strong>DevOps:</strong> CI/CD pipelines and containerization using Docker.
          <a href="https://docs.docker.com/" target="_blank" class="font-bold underline ml-1">Docker</a>,
        </li>
        <li>
          <strong>Nginx & Redis:</strong> Load balancing and high-performance caching for scalable systems.
          <a href="https://www.nginx.com/" target="_blank" class="font-bold underline ml-1">(Nginx Info)</a>
        </li>
      </ul>
    </div>

    <div>
      <h2 class="text-3xl font-semibold">Projects & System Design</h2>
      <p class="mt-4 text-base leading-relaxed">
        I’ve built complex backend systems powering real estate and automotive listing platforms, featuring role-based dashboards, subscription models, real-time analytics, chat modules, and PDF generation. These solutions integrate tools like 
        <strong>Socket.io</strong>, 
        <strong>Paymob</strong>, and 
        <strong>SendGrid</strong> to enhance user engagement and streamline platform operations.
      </p>
    </div>

    <div>
      <h2 class="text-3xl font-semibold">Professional Growth & Aspirations</h2>
      <p class="mt-4 text-base leading-relaxed">
        I’m deeply committed to continuous learning and technical leadership. I stay current with the latest practices through industry content, tech talks, and contributions to open-source communities on platforms like 
        <a href="https://github.com/" target="_blank" class="font-bold underline">GitHub</a> and 
        <a href="https://www.computer.org/csdl/magazine/so" target="_blank" class="font-bold underline">IEEE Software</a>.
      </p>
    </div>

    <div>
      <h2 class="text-3xl font-semibold">Mantra & Soft Skills</h2>
      <p class="mt-4 text-base leading-relaxed">
        I believe in <strong>clarity, collaboration, and accountability</strong>. Whether debugging, mentoring, or architecting a new feature, I bring energy, structure, and a solutions-first mindset to every challenge I take on.
      </p>
    </div>
  </section>
</main>

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
