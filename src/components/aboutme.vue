<script setup lang="ts">
import logo from "../../public/projects/lesoll-logo.png"
</script>

<template>
  <section max-w-xl mx-auto p-6 space-y-10>
    <div>
      <h1 text-2xl font-bold text-black dark:text-gray-100>
        Hi, I'm Mohammed Mostafa
      </h1>
      <span flex items-center gap-2 w-full text-black dark:text-gray-300>
        Software Engineer at 
        <a href="https://lesoll.com" target="_blank" rel="noopener noreferrer" flex items-center gap-1 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 >
          <img :src="logo" alt="Lesoll Logo" class="w-5 h-auto -ml2 -mr-2 mb-0.5"/>
          <span font-bold>Lesoll</span>
        </a>
      </span>

      <div mt-4 leading-relaxed text-black dark:text-gray-300>
        <div space-y-4 text-base leading-relaxed>
          <p>
            I'm a software engineer with experience in web development, specializing in backend
            development with  
            <span font-bold inline-flex items-center gap-2 text-black dark:text-white >
              <i font-serif icon-btn i-logos:nodejs-icon-alt></i>
              Node.js
            </span>.  I’ve recently expanded into frontend development and continuously seek to grow by exploring new technologies and working across diverse environments.
          </p>

          <p>
            Turning ideas into real, functional systems is what drives me most. 
            I’m passionate about building backend solutions, APIs, and tools that make life easier 
            and boost productivity—whether for myself, my projects, or the developer community. 
            You can explore my full list of 
            <router-link to="/projects" font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300>projects</router-link>.
          </p>
          <p>
            Outside of coding, I enjoy photography and traveling. 
            I’m also into anime, movies, and dramas, and I like to keep track of what I watch.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
