<template>
  <div class="input-puzzle">
    <h3 class="input-puzzle__title">
      Un prénom est tout ce qu'il me faut. <br />
      Si le compte est bon, tu pourras soumettre...
    </h3>

    <label for="radio-group">Choisit un nombre</label>
    <div
      id="radio-group"
      role="radiogroup"
      class="input-puzzle__radio-group"
      aria-labelledby="radiogroup-label"
    >
      <div
        v-for="(num, index) of nbOptions"
        :key="num"
        class="input-puzzle__radio__option"
      >
        <input type="radio" :id="index" :value="num" v-model="numSelected" />
        <label :for="index">{{ num }}</label>
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
const nbOfTries = ref(0);
const numSelected = ref(null);

const inputValue = defineModel();

function selectNum(i) {
  nbOfTries.value = 0;

  for (const [index, button] of radioButtons.value.entries()) {
    if (index === i) {
      button.setAttribute("aria-checked", true);
      numSelected.value = Number(button.innerHTML);
    } else button.setAttribute("aria-checked", false);
  }
}

function solveThePuzzle(event) {
  const isLetterKey = /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i.test(event.key);
  const isDeleteOrSpaceKey = event.key === "Backspace" || event.key === " ";

  if (!isLetterKey && !isDeleteOrSpaceKey) event.preventDefault();

  if (!isDeleteOrSpaceKey) nbOfTries.value++;

  if (nbOfTries.value !== numSelected.value && !isDeleteOrSpaceKey) {
    event.preventDefault();
  }

  if (nbOfTries.value === numSelected.value) {
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
  font-family: "Gothica", "Times New Roman", Times, serif;

  .input-puzzle__title {
    letter-spacing: 4px;
  }

  .input-puzzle__radio-group {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 8px;

    .input-puzzle__radio__option {
      padding: 4px;
      letter-spacing: 4px;
      font-size: 20px;
      cursor: pointer;
      caret-color: transparent;
    }

    .input-puzzle__radio__option input[type="radio"] {
    }
  }
}
</style>
