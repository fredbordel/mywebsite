import { defineStore } from "pinia";
import { ref } from "vue";

export const useLang = defineStore("lang", () => {
  const selectedLang = ref("fr");

  return { selectedLang };
});
