import { defineStore } from "pinia";
import dict from "../assets/dictionary.json";
import { computed, ref } from "vue";

export const useLang = defineStore("lang", () => {
  const selectedLang = ref("fr");
  const dictionary = computed(() => {
    return (key) => dict[selectedLang.value][key];
  });

  function switchLang(lang) {
    selectedLang.value = lang;
  }

  function setDictionary(key = null) {
    if (!key) return;
    else return dict[selectedLang.value][key];
  }

  return { dictionary, selectedLang, setDictionary, switchLang };
});
