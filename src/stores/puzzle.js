import { defineStore } from "pinia";
import { ref } from "vue";

export const usePuzzle = defineStore("puzzle", () => {
  const puzzleSolved = ref(0);

  function solvePuzzle() {
    puzzleSolved.value += 1;
  }

  return { puzzleSolved, solvePuzzle };
});
