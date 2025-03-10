<template>
  <div class="name-input">
    <h3>Tu pourras remplis le champs si le compte est bon</h3>
    <div
      class="name-input__radio-group"
      role="radiogroup"
      aria-labelledby="name-input__label"
      id="rg"
    >
      <p id="name-input__label">Choisis un nombre</p>
      <div
        v-for="(num, index) of nbOptions"
        :key="num"
        @click="selectNum(index)"
        @keyup.space="selectNum(index)"
        ref="radio-button"
        role="radio"
        aria-checked="false"
        tabindex="0"
      >
        {{ num }}
      </div>
    </div>
    <label for="word">Name (4 to 8 characters):</label>
    <input
      v-model="inputValue"
      @keydown="mouaha($event)"
      type="text"
      id="word"
      name="word"
      disabled
    />
  </div>
</template>

<script setup>
import { defineModel, ref, useTemplateRef } from "vue";

const radioButtons = useTemplateRef("radio-button");
const nbOptions = ref([5, 32, 15, 8, 20]);
const checkedButtonValue = ref(0);
const nbOfTries = ref(0);

const inputValue = defineModel();

function selectNum(i) {
  nbOfTries.value = 0;

  for (const [index, button] of radioButtons.value.entries()) {
    if (index === i) {
      button.setAttribute("aria-checked", true);
      checkedButtonValue.value = Number(button.innerHTML);
    } else button.setAttribute("aria-checked", false);
  }
}

function mouaha(event) {
  const isLetter = /^[a-zA-Z]$/.test(event.key);
  if (!isLetter) event.preventDefault();

  nbOfTries.value++;

  if (nbOfTries.value !== checkedButtonValue.value) {
    event.preventDefault();
  }

  if (nbOfTries.value === checkedButtonValue.value) {
    nbOfTries.value = 0;
  }
}
</script>

<style></style>
