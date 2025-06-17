<template>
  <header class="header">
      <h1>JATIN SINGH</h1>
      <p>Frontend Developer | Designer | Coder</p>
    </header>

    <section class="about">
      <h2>About Me</h2>
      <p>
        I'm a passionate developer focused on creating elegant and user-friendly web interfaces.
        With experience in modern frameworks like Vue.js and a knack for detail, I turn ideas into code.
      </p>
    </section>

    <section class="projects">
      <h2>Projects</h2>
      <div class="project">
        <h3>Portfolio Website</h3>
        <p>A personal portfolio showcasing my projects, skills, and contact information.</p>
      </div>
      <div class="project">
        <h3>Weather App</h3>
        <p>A Vue.js app using an API to display real-time weather information.</p>
      </div>
    </section>

    <section class="contact">
      <h2>Contact</h2>
      <p>Email: jscharak04@gmail.com</p>
      <p>GitHub: <a href="https://github.com/bobby4fischer/WebDevelopment" target="_blank">bobby4fischer</a></p>
    </section>

    <footer class="footer">
      <p>&copy; 2025 Your Name. All rights reserved.</p>
    </footer>
</template>

<script> 

export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.header {
  background-color: #2c3e50;
  color: white;
  padding: 40px 20px;
  text-align: center;
  border-radius: 8px;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
}

.header p {
  margin-top: 10px;
  font-size: 1.2rem;
  color: #ccc;
}

section {
  margin-top: 40px;
}

.about, .projects, .contact {
  background: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.projects .project {
  margin-top: 20px;
}

.projects h3 {
  margin-bottom: 5px;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.footer {
  text-align: center;
  margin-top: 60px;
  padding: 20px;
  font-size: 0.9rem;
  color: #888;
}
</style>
