<script setup lang="ts">
import logo from "../../public/projects/lesoll-logo.png"
</script>

<template>
    <section max-w-xl mx-auto p-6 space-y-12>
      <div>
        <h1 text-2xl text-white font-bold>Hi, I'm Mohammed Mostafa</h1>
        <span flex items-center gap-2 w-full>
          Software Engineer at 
          <a href="https://lesoll.com" text-white target="_blank" rel="noopener noreferrer" flex items-center gap-1>
                  <img 
                    :src="logo" 
                    alt="Lesoll Logo" 
                    class="w-5 h-auto -ml2 -mr-2 mb-0.5"
                  />
                  <span text-white-100 hover:text-gray-400 font-bold>Lesoll</span>
                </a>
        </span>
          <div mt-4 leading-relaxed>
              <div space-y-4 text-base leading-relaxed>
                <p>
                  I'm a software engineer with experience in web development, specializing in backend
                  development with  
                  <span font-bold inline-flex items-center gap-2>
                    <i  font-serif opacity-70 icon-btn i-logos:nodejs-icon-alt></i>
                    Node.js
                  </span>. 
                  I’ve recently expanded into frontend development
                  and continuously seek to grow by exploring new technologies and working across diverse
                  environments.
                </p>

                <p>
                  Turning ideas into real, functional systems is what drives me most. 
                  I’m passionate about building backend solutions, APIs, and tools that make life easier 
                  and boost productivity—whether for myself, my projects, or the developer community. 
                  You can explore my full list of <router-link to="/projects" class="text-white">projects</router-link>.
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
/* Optional fade-in animation */
section {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
