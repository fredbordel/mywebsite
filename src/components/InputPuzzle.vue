<template>
  <div class="input-puzzle">
    <div class="input-puzzle__wrapper">
      <h3 class="input-puzzle__title">
        {{ dict.title }}
      </h3>

      <div class="input-puzzle__number">
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
      </div>

      <div class="input-puzzle__answer">
        <div>
          <label for="answer">{{ dict.label }}</label>
          <input
            v-model="inputValue"
            @keydown="solveThePuzzle($event)"
            type="text"
            id="answer"
            name="answer"
          />
        </div>
        <button type="button" @click="checkAnswer">{{ dict.button }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from "vue";
import { storeToRefs } from "pinia";
import { usePuzzle } from "../stores/puzzle";
import { useLang } from "../stores/lang";

const { solvePuzzle } = usePuzzle();
const { setDictionary } = useLang();
const lang = useLang();
const { dictionary } = storeToRefs(lang);
console.log(dictionary.value["inputPuzzle"]);

const dict = setDictionary("inputPuzzle");
const nbOptions = ref([8, 32, 3, 15, 5, 20]);
const nbOfTries = ref(0);
const numSelected = ref(null);
const inputValue = ref(null);

function solveThePuzzle(event) {
  const isLetterKey = /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i.test(event.key);
  const isDeleteOrSpaceKeyOrTab =
    event.key === "Backspace" || event.key === " " || event.key === "Tab";

  if (!isLetterKey && !isDeleteOrSpaceKeyOrTab) event.preventDefault();

  if (!isDeleteOrSpaceKeyOrTab) nbOfTries.value++;

  if (nbOfTries.value !== numSelected.value && !isDeleteOrSpaceKeyOrTab) {
    event.preventDefault();
  }

  if (nbOfTries.value === numSelected.value) {
    nbOfTries.value = 0;
  }
}

function checkAnswer() {
  if (inputValue.value.toLowerCase() === "prénom") {
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/stone_wall_1.jpeg");
  color: white;
  font-family: "Gothica", "Times New Roman", Times, serif;

  .input-puzzle__wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    background: #08012589;
    border: 6px solid #080125;
    padding: 24px;
  }

  .input-puzzle__title {
    letter-spacing: 4px;
    margin: 0;
    text-align: center;
    font-size: 32px;
  }

  .input-puzzle__radio-group {
    display: flex;
    align-items: center;
    gap: 8px;

    .input-puzzle__radio__option {
      padding: 4px;
      letter-spacing: 4px;
      font-size: 24px;
      caret-color: transparent;

      label {
        font-size: 32px;
        padding: 16px;
        cursor: pointer;
      }

      input {
        opacity: 0;
      }
    }

    .input-puzzle__radio__option:has(input[aria-checked="true"]) {
      label {
        position: relative;
        background-image: url(../assets/img/little_fire.png);
        background-position: top;
        background-size: contain;
        background-repeat: no-repeat;
        padding-bottom: 0;
        overflow: hidden;
      }
    }
  }

  .input-puzzle__answer {
    display: flex;
    align-items: end;
    gap: 8px;

    input {
      height: 32px;
      box-shadow: 1px 2px 15px 0px #0b0227;
      border: 2px solid #ffdd02;
      outline: 1px solid #ff3813;
      margin-right: 32px;
      margin-top: 4px;

      &:focus-visible {
        outline: 2px solid blue;
        outline-offset: 2px;
        box-shadow: none;
      }
    }

    button {
      width: 100%;
      padding: 8px 12px;
      border: none;
      box-shadow: 1px 2px 15px 0px #000000;
      border-radius: 24px;
      background: radial-gradient(
        circle,
        rgba(255, 246, 0, 1) 0%,
        rgba(255, 169, 0, 1) 50%,
        rgba(255, 16, 16, 1) 100%
      );
      font-family: "Gothica", "Times New Roman", Times, serif;
      font-size: 24px;
      cursor: pointer;

      &:focus,
      &:hover {
        color: white;
        background: radial-gradient(
          circle,
          rgb(123 120 27) 0%,
          rgb(162 113 18) 50%,
          rgba(130, 37, 11, 1) 100%
        );
      }

      &:focus-visible {
        outline: 2px solid blue;
        outline-offset: 4px;
        box-shadow: none;
      }
    }
  }
}
</style>
