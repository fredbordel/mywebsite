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
        <input
          type="radio"
          :id="index"
          :value="num"
          v-model="numSelected"
          :aria-checked="numSelected === num ? true : false"
        />
        <label :for="index">{{ num }}</label>
      </div>
    </div>

    <div class="input-puzzle__answer">
      <label for="answer">Réponse</label>
      <input
        v-model="inputValue"
        @keydown="solveThePuzzle($event)"
        type="text"
        id="answer"
        name="answer"
      />
      <button type="button" @click="checkAnswer">Soumettre</button>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from "vue";
import { usePuzzle } from "../stores/puzzle";

const { solvePuzzle } = usePuzzle();
const radioButtons = useTemplateRef("radio-button");
const nbOptions = ref([8, 32, 3, 15, 5, 20]);
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
  const isDeleteOrSpaceKeyOrTab =
    event.key === "Backspace" || event.key === " " || event.key === "Tab";

  if (!isLetterKey && !isDeleteOrSpaceKey) event.preventDefault();

  if (!isDeleteOrSpaceKeyOrTab) nbOfTries.value++;

  if (nbOfTries.value !== numSelected.value && !isDeleteOrSpaceKeyOrTab) {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Gothica", "Times New Roman", Times, serif;

  .input-puzzle__title {
    letter-spacing: 4px;
    text-align: center;
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

      label {
        padding: 8px;
      }

      input {
        opacity: 0;
      }
    }

    .input-puzzle__radio__option:has(input[aria-checked="true"]) {
      label {
        color: white;
        background-color: black;
        border-radius: 3px;
      }
    }
  }

  .input-puzzle__answer {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 8px;

    button {
      width: 100%;
      padding: 8px 12px;
      border-radius: 24px;
      background-color: #ff9a4c;
      color: black;
      outline: 2px solid #ad0000;
      border: 4px solid #e9f519;
      font-family: "Gothica", "Times New Roman", Times, serif;
      font-size: 24px;
      cursor: pointer;

      &:focus,
      &:hover {
        color: white;
        background-color: #ad0000;
        border-color: #ff9a4c;
        outline-color: #e9f519;
      }

      &:focus-visible {
        outline: 2px solid blue;
        outline-offset: 4px;
      }
    }
  }
}
</style>
