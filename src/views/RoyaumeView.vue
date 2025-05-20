<template>
  <div class="royaume">
    <h1>Royaume du UX maudit</h1>
    <button @click="openPuzzle">{{ quest.puzzleQuest }}</button>
    <input-puzzle v-if="isInputPuzzle"></input-puzzle>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePuzzleStore } from "../stores/puzzle";
import InputPuzzle from "../components/InputPuzzle.vue";

const quest = usePuzzleStore();
const isInputPuzzle = ref(false);

function openPuzzle() {
  return (isInputPuzzle.value = true);
}
</script>

<style>
.royaume {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
</style>
