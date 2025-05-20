import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import dict from "../assets/dictionary.json";

export const useLangStore = defineStore("lang", () => {
  const selectedLang = ref("fr");

  const dictionary = computed(() => {
    return dict[selectedLang.value] || dict.en;
  });

  function setLanguage(lang) {
    if (dict[lang]) {
      selectedLang.value = lang;
    } else {
      console.warn(`Language '${lang}' is not supported.`);
    }
  }

  watch(selectedLang, (newLang) => {
    console.log(`Lang changed to: ${newLang}`);
  });

  return {
    selectedLang,
    dictionary,
    setLanguage,
  };
});
