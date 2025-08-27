<template>
    <section max-w-xl mx-auto p-6 space-y-12>
<div>
  <h1 text-2xl font-bold>Hi, I'm Mohammed Mostafa</h1>
  <span>a Software Engineer</span>
    <div mt-4 leading-relaxed>
      <span flex items-center gap-2 w-full>
        Working at 
      <a href="https://lesoll.com" target="_blank" rel="noopener noreferrer" flex items-center gap-1>
        <img 
          src="/public/projects/lesoll-logo.png" 
          alt="Lesoll Logo" 
          class="w-5 h-auto -ml2 -mr-2 mb-0.5"
        />
        <span font-bold>Lesoll</span>
    </a>
  </span>

    <br>
    <span font-bold inline-flex items-center gap-2>
      <i font-serif opacity-70 icon-btn i-logos:nodejs-icon-alt></i>
      Node.js
    </span>, 
    <span font-bold inline-flex items-center gap-2>
      <i font-serif opacity-70 icon-btn i-skill-icons:typescript></i>
      TypeScript
    </span>, 
    <span font-bold inline-flex items-center gap-2>
      <i font-serif opacity-70 icon-btn i-skill-icons:mongodb></i>
      MongoDB
    </span>, and PostgreSQL.  
    I’ve built systems for real estate platforms, car listings, and subscription-based payments with features like automated reposting, ad pinning, and point tracking.  
    I also work with 
    <span font-bold inline-flex items-center gap-2>
      <i font-serif opacity-70 icon-btn i-logos:aws></i>
      AWS
    </span>, 
    <span font-bold inline-flex items-center gap-2>
      <i font-serif opacity-70 icon-btn i-logos:nginx></i>
      Nginx
    </span>.
    Beyond projects, I enjoy designing API-driven architectures, building SaaS dashboards, and publishing npm packages to share solutions with the developer community.
  </div>

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
