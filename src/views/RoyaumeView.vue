<template>
  <div class="royaume">
    <h1>Royaume du UX maudit</h1>
    <input-puzzle></input-puzzle>
  </div>
</template>

<script setup>
import InputPuzzle from "../components/InputPuzzle.vue";
</script>

<style>
.royaume {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>
