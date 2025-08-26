<template>
    <section max-w-xl mx-auto p-6 space-y-12>
    <div>
      <h1 text-4xl font-bold>Mohamed Mostafa</h1>
      <p mt-4 text-lg leading-relaxed>
        I’m a seasoned <strong>backend software engineer</strong> with a strong drive to architect robust, scalable, and secure systems. With hands-on experience across multiple industries, I’ve cultivated deep expertise in 
        <span font-bold inline-flex items-center gap-2>
          <i  font-serif opacity-70 icon-btn i-logos:nodejs-icon-alt></i>
          Node.js
        </span>, 
        <span font-bold inline-flex items-center gap-2>
          <i  font-serif opacity-70 icon-btn i-skill-icons:typescript></i>
          TypeScript
        </span>, and 
        <span font-bold inline-flex items-center gap-2>
          <i  font-serif opacity-70 icon-btn i-skill-icons:mongodb></i>
          MongoDB
        </span>. I apply clean architecture and proven engineering practices—from designing RESTful APIs to deploying resilient services on AWS.
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
