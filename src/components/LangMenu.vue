<template>
  <div>
    <select
      name="lang"
      id="lang"
      v-model="langStore.selectedLang"
      @change="langStore.setLanguage(langStore.selectedLang)"
    >
      <option value="fr">fr</option>
      <option value="en">en</option>
    </select>
  </div>
</template>

<script setup>
import { useLangStore } from "../stores/lang";

const langStore = useLangStore();
</script>

<style></style>
