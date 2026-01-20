<template>
  <div 
    flex="~ col" items-center justify-center
    min-h-screen text-center p-8
    relative overflow-hidden
  >
    <div relative z-10 max-w-600px>
      <!-- Animated 404 -->
      <h1 
        class="error-code gradient-text"
        text="clamp(6rem,20vw,12rem)"
        font-black m-0
      >
        404
      </h1>
      
      <!-- Message -->
      <h2 
        text-3xl font-bold my-4
        text-black dark:text-white
        class="animate-fade-up-1"
      >
        Page Not Found
      </h2>
      
      <p 
        text-lg leading-relaxed my-8
        text-gray-600 dark:text-gray-400
        class="animate-fade-up-2"
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      
      <!-- Navigation Links -->
      <div 
        flex gap-4 justify-center flex-wrap
        class="animate-fade-up-3"
      >
        <router-link 
          to="/" 
          inline-flex items-center gap-2
          px-7 py-3.5 rounded-xl
          bg-black dark:bg-white
          text-white dark:text-black
          font-semibold
          shadow-lg
          transition-all duration-300
          hover="translate-y--0.5 shadow-2xl"
        >
          <i class="i-carbon:home"></i>
          Go Home
        </router-link>
        
        <router-link 
          to="/projects" 
          inline-flex items-center gap-2
          px-7 py-3.5 rounded-xl
          bg-transparent
          text-black dark:text-white
          border="2 black dark:white"
          font-semibold
          transition-all duration-300
          hover="translate-y--0.5 bg-black dark:bg-white text-white dark:text-black"
        >
          <i class="i-carbon:folder"></i>
          View Projects
        </router-link>
      </div>
      
      <!-- Decorative Elements -->
      <div absolute w-full h-full top-0 left-0 pointer-events-none z-1>
        <div 
          class="floating-shape"
          absolute w-300px h-300px rounded-full
          bg-black dark:bg-white
          opacity="10 dark:5"
          top="10%" left="10%"
          style="animation-delay: 0s"
        ></div>
        <div 
          class="floating-shape"
          absolute w-200px h-200px rounded-full
          bg-gray-600 dark:bg-gray-400
          opacity="10 dark:5"
          bottom="20%" right="15%"
          style="animation-delay: 2s"
        ></div>
        <div 
          class="floating-shape"
          absolute w-150px h-150px rounded-full
          bg-gray-800 dark:bg-gray-600
          opacity="10 dark:5"
          top="60%" left="70%"
          style="animation-delay: 4s"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #000 0%, #666 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glitch 2s infinite;
}

.dark .gradient-text {
  background: linear-gradient(135deg, #fff 0%, #999 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.animate-fade-up-1 {
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.animate-fade-up-2 {
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.animate-fade-up-3 {
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
}

.floating-shape {
  animation: float 6s ease-in-out infinite;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glitch {
  0%, 90%, 100% {
    transform: translate(0);
  }
  92% {
    transform: translate(-2px, 2px);
  }
  94% {
    transform: translate(2px, -2px);
  }
  96% {
    transform: translate(-2px, -2px);
  }
  98% {
    transform: translate(2px, 2px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
}

@media (max-width: 640px) {
  .animate-fade-up-3 {
    flex-direction: column;
    width: 100%;
  }
  
  .animate-fade-up-3 a {
    width: 100%;
    justify-content: center;
  }
}
</style>
