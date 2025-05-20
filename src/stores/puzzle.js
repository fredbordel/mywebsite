import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usePuzzleStore = defineStore("puzzle", () => {
  const puzzleSolved = ref(0);

  const puzzleQuest = computed(() => puzzleSolved.value);

  function solvePuzzle() {
    puzzleSolved.value += 1;
  }

  return { puzzleSolved, solvePuzzle, puzzleQuest };
});
