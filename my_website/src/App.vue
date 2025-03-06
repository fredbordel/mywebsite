<template>
  <header>
    <h1>{{ dict[selectedLang].app.h1 }}</h1>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">{{ dict[selectedLang].home.title }}</RouterLink>
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

<style></style>
