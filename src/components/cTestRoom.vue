<template>
  <div class="container" v-if="!test_end">
    <section class="discription">
      <div class="header">
        <p class="user">Тестируемый : {{ user }}</p>
        <p class="test-name">Тема: {{ test_settings.test_pack.discription }}</p>
      </div>
      <div class="timer" v-if="timer !== 0">{{ timer }}</div>
    </section>
    <p class="q-couner">Вопрос № {{ counter_q + 1 }}</p>
    <progress :value="counter_q + 1" :max="last_q"></progress>
    <p class="progress-counter">{{ counter_q + 1 }} / {{ last_q }}</p>
    <section class="q-body">
      <p>{{ current_test[counter_q].title }}</p>
    </section>
    <cTestQRender
      :variants="current_test[counter_q].variants"
      :img="current_test[counter_q].img"
      :counter_q="counter_q"
      @selected="AddAnswer"
    ></cTestQRender>
    <button
      v-show="counter_q !== last_q - 1"
      @click="Counter"
      class="btn btn-next"
      :disabled="!answers[counter_q]"
    >
      &#10140;
    </button>
    <button
      @click="test_end = true"
      class="btn btn-exit-test"
      :disabled="!answers[counter_q]"
      v-if="counter_q == last_q - 1"
    >
      закончить тест
    </button>
  </div>
  <cTestResults
    :user="user"
    :test="test_settings.test_pack.discription"
    :answers="answers"
    :answers_true="answers_true"
    :end="test_end"
    :current_test="current_test"
  ></cTestResults>
  <div class="modal_start" v-if="show_modal_start">
    <div>
      <button class="back" @click="$router.go(-1)">x</button>
      <p>Тема : {{ test_settings.test_pack.discription }}</p>
      <p>Тестируемый : {{ user }}</p>
      <p>
        Таймер : <span v-if="timer === 0">нету</span>
        <span v-else>{{ timer }} минут</span>
      </p>
      <button @click="Start()" class="start">Начать</button>
    </div>
  </div>
</template>

<script>
import cTestQRender from "./cTestQRender.vue";
import cTestResults from "./cTestResults.vue";
export default {
  props: ["test_settings"],
  components: { cTestQRender, cTestResults },
  data() {
    return {
      user: this.test_settings.user || "NoName",
      timer: Number(this.test_settings.timer) || 0,
      counter_q: 0,
      last_q: Object.keys(this.test_settings.test_pack["questions"]).length,
      current_test: this.test_settings.test_pack["questions"],
      selected: "",
      test_end: false,
      answers: {},
      answers_true: this.test_settings.test_pack["answers_true"],
      show_modal_start: true,
    };
  },
  methods: {
    Timer: function (timeMinut) {
      timeMinut = timeMinut * 60;
      let self = this,
        t = setInterval(function () {
          let seconds = timeMinut % 60,
            minutes = Math.trunc((timeMinut / 60) % 60);
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          if (timeMinut == -1) {
            clearInterval(t);
            self.test_end = true;
          } else {
            self.timer = `${minutes}:${seconds}`;
          }
          --timeMinut;
        }, 1000);
    },
    AddAnswer: function (i) {
      this.answers[this.counter_q] = i;
    },
    Start: function () {
      this.show_modal_start = false;
      if (this.timer > 0) {
        this.Timer(this.timer);
      }
    },
    Counter: function () {
      this.counter_q++;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 600px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #797cc3;

  section {
    width: 600px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: white;
    color: #4f4f4f;
  }
  .q-body {
    min-height: 60px;
    font-size: 20px;
    font-weight: 800;
    overflow-wrap: break-word;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .discription {
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-left: 50px;
      .test-name {
        font-size: 25px;
        font-weight: 600;
      }
    }
    .timer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      margin-right: 50px;
      font-size: 20px;
      background-color: #797cc3;
      color: white;
      border-radius: 50%;
    }
  }
  progress {
    height: 20px;
    border: 0px;
    border-radius: 5px;
    &::-moz-progress-bar {
      background: rgb(103, 216, 129);
      border-radius: 5px;
    }
    &::-webkit-progress-value {
      background: rgb(103, 216, 129);
      border-radius: 5px;
    }
  }
  .progress-counter {
    width: 100%;
    text-align: right;
    font-size: 15px;
  }
  .btn-next {
    align-self: flex-end;
    margin: 5px 0px;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    font-size: 30px;
    &:hover {
      color: rgb(103, 216, 129);
    }
    &:disabled,
    &[disabled] {
      background-color: gray;
      color: white;
      cursor: not-allowed;
    }
  }
  .btn-exit-test {
    margin-top: 20px;
    margin-bottom: 20px;
    background: rgb(103, 216, 129);
    color: white;
    font-size: 20px;
    border: 2px solid white;
    border-radius: 5px;
    height: 40px;
    &:hover {
      color: rgb(103, 216, 129);
      background-color: white;
    }
    &:disabled,
    &[disabled] {
      background-color: gray;
      color: white;
      cursor: not-allowed;
    }
  }
}
.modal_start {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #797cc3;
  color: #e1e1e1;
  z-index: 1;
  p {
    align-self: flex-start;
    font: 1.5em sans-serif;
  }
  button {
    cursor: pointer;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    color: #797cc2;
    font-weight: 700;
    text-transform: uppercase;
    margin: 30px 0;
    &:hover {
      color: rgb(103, 216, 129);
      background-color: white;
    }
  }
  button.back {
    width: 30px;
    height: 30px;
    padding: 5px;
    background: none;
    color: white;
    border: 2px solid #e1e1e1;
    border-radius: 50%;
  }
}
</style>
