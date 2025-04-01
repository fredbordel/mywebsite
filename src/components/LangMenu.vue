<template>
  <div>
    <select name="lang" id="lang" v-model="langSelected">
      <option value="fr">fr</option>
      <option value="en">en</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useLang } from "../stores/lang";

const { switchLang } = useLang();
const langSelected = ref("fr");

watch(langSelected, (newL) => {
  switchLang(newL);
});
</script>

<style></style>
