<template>
  <div class="input-puzzle">
    <h3 class="input-puzzle__title">
      Tu pourras remplir le champs si le compte est bon
    </h3>
    <div
      class="input-puzzle__radio-group"
      role="radiogroup"
      aria-labelledby="radiogroup-label"
      id="rg"
    >
      <p class="input-puzzle__radio__label" id="radiogroup-label">
        Choisis un nombre
      </p>
      <div
        v-for="(num, index) of nbOptions"
        :key="num"
        class="input-puzzle__radio__option"
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
    <label for="word">Soumet un prénom</label>
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
import { ref, useTemplateRef } from "vue";
import { usePuzzle } from "../stores/puzzle";

const { solvePuzzle } = usePuzzle();
const radioButtons = useTemplateRef("radio-button");
const nbOptions = ref([8, 32, 1, 15, 5, 20]);
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
  const isDeleteOrSpaceKey = event.key === "Backspace" || event.key === " ";

  if (!isLetterKey && !isDeleteOrSpaceKey) event.preventDefault();

  if (!isDeleteOrSpaceKey) nbOfTries.value++;

  if (nbOfTries.value !== checkedButtonValue.value && !isDeleteOrSpaceKey) {
    event.preventDefault();
  }

  if (nbOfTries.value === checkedButtonValue.value) {
    nbOfTries.value = 0;
  }
}

function checkAnswer() {
  if (inputValue.value.toLowerCase() === "un prénom") {
    // celebration animation
    console.log("puzzle solved");
    solvePuzzle();
  } else {
    // error handling
  }
}
</script>

<style>
.input-puzzle {
  .input-puzzle__radio-group {
    display: flex;
    align-items: center;
    gap: 16px;

    .input-puzzle__radio__option {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      font-family: "Pixelify Sans", "Times New Roman", Times, serif;
      font-size: 32px;
      cursor: pointer;
    }
  }
}
</style>
