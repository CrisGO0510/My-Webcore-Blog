<template>
  <div class="page-container">
    <Header />
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Games</h1>
        <p class="page-subtitle">Mi universo gaming</p>
      </div>
      
      <div class="games-content">
        <div class="favorites-section">
          <h2>Juegos Favoritos</h2>
          <div class="games-grid">
            <div class="game-card">
              <q-icon name="sports_esports" size="3rem" />
              <h3>Cyberpunk 2077</h3>
              <p>RPG futurista en Night City</p>
              <div class="game-status playing">Currently Playing</div>
            </div>
            
            <div class="game-card">
              <q-icon name="videogame_asset" size="3rem" />
              <h3>The Witcher 3</h3>
              <p>RPG épico de fantasía medieval</p>
              <div class="game-status completed">Completed</div>
            </div>
            
            <div class="game-card">
              <q-icon name="casino" size="3rem" />
              <h3>Hades</h3>
              <p>Roguelike de mitología griega</p>
              <div class="game-status completed">Completed</div>
            </div>
            
            <div class="game-card">
              <q-icon name="rocket" size="3rem" />
              <h3>Outer Wilds</h3>
              <p>Aventura espacial y viajes en el tiempo</p>
              <div class="game-status wishlist">Next Up</div>
            </div>
          </div>
        </div>
        
        <div class="stats-section">
          <h2>Gaming Stats</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <h4>Horas Jugadas</h4>
              <span class="stat-number">1,337</span>
            </div>
            
            <div class="stat-card">
              <h4>Juegos Completados</h4>
              <span class="stat-number">42</span>
            </div>
            
            <div class="stat-card">
              <h4>Género Favorito</h4>
              <span class="stat-text">RPG</span>
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

.games-content {
  display: grid;
  gap: 3rem;
}

.favorites-section h2,
.stats-section h2 {
  color: $purple-neon;
  font-family: "GothicByte", monospace;
  margin-bottom: 2rem;
  text-align: center;
}

.games-grid {
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.game-card {
  background: rgba($purple-main, 0.1);
  border: 1px solid $cyan-accent;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    border-color: $purple-neon;
    box-shadow: 0 0 20px rgba($cyan-accent, 0.3);
    transform: translateY(-5px);
  }
  
  .q-icon {
    color: $cyan-accent;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px $cyan-accent;
  }
  
  h3 {
    color: $cyan-accent;
    margin-bottom: 0.5rem;
    font-family: "GothicByte", monospace;
  }
  
  p {
    color: $text-color;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
}

.game-status {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  
  &.playing {
    background: rgba(#4CAF50, 0.2);
    border: 1px solid #4CAF50;
    color: #4CAF50;
  }
  
  &.completed {
    background: rgba($cyan-accent, 0.2);
    border: 1px solid $cyan-accent;
    color: $cyan-accent;
  }
  
  &.wishlist {
    background: rgba(#FF9800, 0.2);
    border: 1px solid #FF9800;
    color: #FF9800;
  }
}

.stats-grid {
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stat-card {
  background: rgba($purple-main, 0.1);
  border: 1px solid $purple-neon;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  
  h4 {
    color: $purple-neon;
    margin-bottom: 1rem;
    font-family: "GothicByte", monospace;
    font-size: 0.9rem;
  }
  
  .stat-number {
    color: $cyan-accent;
    font-size: 2rem;
    font-weight: bold;
    font-family: "GothicByte", monospace;
    text-shadow: 0 0 10px $cyan-accent;
  }
  
  .stat-text {
    color: $cyan-accent;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: "GothicByte", monospace;
  }
}
</style>