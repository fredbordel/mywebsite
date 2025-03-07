<template>
  <div class="name-input">
    <h3>Quel est ton prénom?</h3>
    <form>
      <select v-model="selected">
        <option v-for="option in options" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <label for="name">Prénom </label>
      <input type="text" name="name" id="name" @keydown="mouaha" required />
      <button type="button">Soumettre</button>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const selected = ref(2);
const requiredtries = computed(() => selected.value);

const options = ref([
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "4", value: 4 },
]);

let nbOfTries = 0; // need to reset this whenever requiredTries is updated

function mouaha(event) {
  const isLetter = /^[a-zA-Z]$/.test(event.key);
  nbOfTries++;

  if (nbOfTries !== requiredtries.value && isLetter) {
    event.preventDefault();
  }

  if (nbOfTries === requiredtries.value) {
    nbOfTries = 0;
  }
}
</script>

<style></style>
