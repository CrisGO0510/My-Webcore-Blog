<template>
  <div class="page-container">
    <Header />
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">About Me</h1>
        <p class="page-subtitle">Conoce más sobre mí</p>
      </div>
      
      <div class="content-section">
        <div class="bio-card">
          <h2>Mi Historia</h2>
          <p>Arquitecto Senior con más de 15 años de experiencia desarrollando aplicaciones web modernas. Apasionado por Vue.js, Angular, y tecnologías cyberpunk.</p>
        </div>
        
        <div class="skills-card">
          <h2>Skills</h2>
          <div class="skills-grid">
            <span class="skill-tag">Vue.js</span>
            <span class="skill-tag">Angular</span>
            <span class="skill-tag">TypeScript</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">Architecture</span>
            <span class="skill-tag">Mentoring</span>
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

.content-section {
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.bio-card, .skills-card {
  background: rgba($purple-main, 0.1);
  border: 1px solid $cyan-accent;
  border-radius: 10px;
  padding: 2rem;
  
  h2 {
    color: $cyan-accent;
    margin-bottom: 1rem;
    font-family: "GothicByte", monospace;
  }
  
  p {
    color: $text-color;
    line-height: 1.6;
  }
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: rgba($cyan-accent, 0.2);
  border: 1px solid $cyan-accent;
  color: $cyan-accent;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba($cyan-accent, 0.3);
    box-shadow: 0 0 10px rgba($cyan-accent, 0.5);
  }
}
</style>