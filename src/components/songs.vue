<script setup lang="ts">
import { spotifyPlaylist, spotifySongs } from "../utils/spotify";
import { ref } from "vue"

const randomPlaylist = ref(
  spotifyPlaylist[Math.floor(Math.random() * spotifyPlaylist.length)]
)

const shuffledSongs = [...spotifySongs].sort(() => Math.random() - 0.5).slice(0, 2)
</script>

<template>
  <section>
    <h2 text-2xl font-bold mb-6 text-center>What I’m Listening To 🎧</h2>
    <div max-w-3xl mx-auto grid md:grid-cols-2 gap-6>
      <div>
        <iframe
          v-bind="randomPlaylist"
        ></iframe>
      </div>
      <div flex flex-col gap-4>
        <iframe
          v-for="song in shuffledSongs"
          :key="song.id"
          v-bind="song"
        ></iframe>
      </div>
    </div>
  </section>
</template>
