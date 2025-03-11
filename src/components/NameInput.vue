<template>
  <div class="name-input">
    <h3 class="name-input__title">
      Tu pourras remplir le champs si le compte est bon
    </h3>
    <div
      class="name-input__radio-group"
      role="radiogroup"
      aria-labelledby="radiogroup-label"
      id="rg"
    >
      <p class="name-input__radio__label" id="radiogroup-label">
        Choisis un nombre
      </p>
      <div
        v-for="(num, index) of nbOptions"
        :key="num"
        class="name-input__radio__option"
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
    <label for="word">Entre un prénom</label>
    <input
      v-model="inputValue"
      @keydown="solveThePuzzle($event)"
      type="text"
      id="word"
      name="word"
    />
    <button type="button" @click="checkAnswer">Soumettre</button>
  </div>
</template>

<script setup>
import { defineModel, ref, useTemplateRef } from "vue";

const radioButtons = useTemplateRef("radio-button");
const nbOptions = ref([8, 32, 15, 5, 20]);
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

function solveThePuzzle(event) {
  const isLetterKey = /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i.test(event.key);
  const isDeleteKey = event.key === "Backspace";

  if (!isLetterKey && !isDeleteKey) event.preventDefault();

  if (!isDeleteKey) nbOfTries.value++;

  if (nbOfTries.value !== checkedButtonValue.value && !isDeleteKey) {
    event.preventDefault();
  }

  if (nbOfTries.value === checkedButtonValue.value) {
    nbOfTries.value = 0;
  }
}

function checkAnswer() {
  if (inputValue.value.toLowerCase() === "prénom") console.log("yay");
}
</script>

<style>
.name-input {
  .name-input__radio-group {
    display: flex;
    .name-input__radio__option {
      cursor: pointer;
    }
  }
}
</style>
