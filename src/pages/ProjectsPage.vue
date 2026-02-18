<template>
  <div class="page-container">
    <Header />
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Projects</h1>
        <p class="page-subtitle">Mis proyectos y creaciones</p>
      </div>
      
      <div class="projects-grid">
        <div class="project-card">
          <h3>Vue.js Dashboard</h3>
          <p>Dashboard administrativo con Vue 3 y TypeScript</p>
          <div class="tech-stack">
            <span class="tech">Vue.js</span>
            <span class="tech">TypeScript</span>
            <span class="tech">Quasar</span>
          </div>
        </div>
        
        <div class="project-card">
          <h3>Angular CRM</h3>
          <p>Sistema CRM empresarial con Angular y .NET</p>
          <div class="tech-stack">
            <span class="tech">Angular</span>
            <span class="tech">C#</span>
            <span class="tech">.NET Core</span>
          </div>
        </div>
        
        <div class="project-card">
          <h3>Cyberpunk Blog</h3>
          <p>Este blog con temática cyberpunk y efectos visuales</p>
          <div class="tech-stack">
            <span class="tech">Vue.js</span>
            <span class="tech">SCSS</span>
            <span class="tech">CSS Effects</span>
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

.projects-grid {
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}

.project-card {
  background: rgba($purple-main, 0.1);
  border: 1px solid $cyan-accent;
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: $purple-neon;
    box-shadow: 0 0 20px rgba($cyan-accent, 0.3);
    transform: translateY(-5px);
  }
  
  h3 {
    color: $cyan-accent;
    margin-bottom: 1rem;
    font-family: "GothicByte", monospace;
  }
  
  p {
    color: $text-color;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech {
  background: rgba($purple-neon, 0.2);
  border: 1px solid $purple-neon;
  color: $purple-neon;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
}
</style>