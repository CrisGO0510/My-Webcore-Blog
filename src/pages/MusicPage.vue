<template>
  <div class="page-container">
    <Header />
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Music</h1>
        <p class="page-subtitle">Mi mundo musical</p>
      </div>
      
      <div class="music-content">
        <div class="playlist-section">
          <h2>Géneros Favoritos</h2>
          <div class="genre-cards">
            <div class="genre-card">
              <q-icon name="library_music" size="3rem" />
              <h3>Synthwave</h3>
              <p>Música cyberpunk y retro-futurista</p>
            </div>
            
            <div class="genre-card">
              <q-icon name="album" size="3rem" />
              <h3>Electronic</h3>
              <p>Beats electrónicos y ambient</p>
            </div>
            
            <div class="genre-card">
              <q-icon name="headphones" size="3rem" />
              <h3>Lo-Fi</h3>
              <p>Música relajante para programar</p>
            </div>
          </div>
        </div>
        
        <div class="now-playing">
          <h2>Currently Coding To</h2>
          <div class="player-mock">
            <q-icon name="play_circle" size="4rem" />
            <div class="track-info">
              <h4>Neon Dreams</h4>
              <p>Cyberpunk 2077 OST</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/header/header.vue'
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;

.page-container {
  min-height: 100vh;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin: 2rem 0 3rem 0;
}

.page-title {
  font-size: 3rem;
  color: $cyan-accent;
  text-shadow: 0 0 15px $cyan-accent;
  font-family: "GothicByte", monospace;
  margin-bottom: 1rem;
}

.page-subtitle {
  color: $text-color;
  font-size: 1.2rem;
}

.music-content {
  display: grid;
  gap: 3rem;
}

.playlist-section h2,
.now-playing h2 {
  color: $purple-neon;
  font-family: "GothicByte", monospace;
  margin-bottom: 2rem;
  text-align: center;
}

.genre-cards {
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.genre-card {
  background: rgba($purple-main, 0.1);
  border: 1px solid $purple-neon;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: $cyan-accent;
    box-shadow: 0 0 20px rgba($purple-neon, 0.4);
    transform: translateY(-5px);
  }
  
  .q-icon {
    color: $purple-neon;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: $cyan-accent;
    margin-bottom: 0.5rem;
    font-family: "GothicByte", monospace;
  }
  
  p {
    color: $text-color;
    font-size: 0.9rem;
  }
}

.now-playing {
  text-align: center;
}

.player-mock {
  background: rgba($purple-main, 0.2);
  border: 2px solid $cyan-accent;
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 500px;
  margin: 0 auto;
  
  .q-icon {
    color: $cyan-accent;
    text-shadow: 0 0 10px $cyan-accent;
  }
  
  .track-info {
    text-align: left;
    
    h4 {
      color: $cyan-accent;
      margin: 0 0 0.5rem 0;
      font-family: "GothicByte", monospace;
    }
    
    p {
      color: $text-color;
      margin: 0;
      font-size: 0.9rem;
    }
  }
}
</style>