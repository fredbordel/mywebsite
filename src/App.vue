<template>
  <header>
    <div class="app__wrapper">
      <p class="app__title">Fred Bordel</p>
      <nav class="app__nav">
        <RouterLink to="/">{{ dict[selectedLang].home.title }}</RouterLink>
        <RouterLink to="/bordel">Royaume</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useLang } from "./stores/lang";
import dict from "./assets/dictionary.json";

const { selectedLang } = useLang();
</script>

<style>
h1 {
  font-family: "Pixelify Sans", "Times New Roman", Times, serif;
  font-size: 24px;

  @media screen and (min-width: 600px) {
    font-size: 32px;
  }
}

.app__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .app__title {
    font-family: "Pixelify Sans", "Times New Roman", Times, serif;
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
