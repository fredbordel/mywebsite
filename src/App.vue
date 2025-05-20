<template>
  <header>
    <div class="app__wrapper">
      <p class="app__title">Fred Bordel</p>
      <nav class="app__nav">
        <RouterLink to="/">Maison</RouterLink>
        <RouterLink to="/royaume">Royaume</RouterLink>
        <lang-menu></lang-menu>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style>
@font-face {
  font-family: "Nortnoh";
  src: url("./assets/fonts/Nortnoh-Regular.ttf");
}

@font-face {
  font-family: "Gothica";
  src: url("./assets/fonts/gothica.book-oblique.ttf");
}

body {
  margin: 0;
}

h1 {
  font-family: "Nortnoh", "Times New Roman", Times, serif;
  letter-spacing: 4px;
  font-size: 32px;

  @media screen and (min-width: 600px) {
    font-size: 48px;
  }
}

.app__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .app__title {
    font-family: "Nortnoh", "Times New Roman", Times, serif;
  }

  .app__title {
  }

  .app__nav {
    display: flex;
    gap: 16px;

    a {
      color: inherit;
    }
  }
}
</style>
