<template>
        <section>
      <h2 class="text-2xl font-bold mb-6 text-center">What I’m Listening To 🎧</h2>
      <div class="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
        
        <!-- Left: Playlist -->
        <div>
          <iframe 
            class="rounded-xl shadow-lg"
            src="https://open.spotify.com/embed/playlist/1wNirTC24xxOGVDAKf9sXu?utm_source=generator" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>

        <!-- Right: Songs stacked -->
        <div class="flex flex-col gap-4">
          <iframe 
            class="rounded-xl shadow-lg"
            src="https://open.spotify.com/embed/track/5qGHMDEUWSn8vVRyIgGXTi?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>

          <iframe 
            class="rounded-xl shadow-lg"
            src="https://open.spotify.com/embed/track/6IZF8hi9J6EtFDLQqOlSbu?utm_source=generator" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>

      </div>
    </section>
</template>