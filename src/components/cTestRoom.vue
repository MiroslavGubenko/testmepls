<template>
  <div class="container" v-if="!test_end">
    <section class="discription">
      <div class="header">
        <p class="user">Тестируемый : {{ user }}</p>
        <p class="test-name">Тема: {{ test_settings.test_pack.discription }}</p>
      </div>
      <div class="timer" v-if="timer !== 0">{{ timer }}</div>
    </section>
    <p class="q-couner">Вопрос № {{ counter_q }}</p>
    <progress :value="counter_q" :max="last_q"></progress>
    <p class="progress-counter">{{ counter_q }} / {{ last_q }}</p>
    <section class="q-body">
      <p>{{ current_test[counter_q].title }}</p>
    </section>
    <cTestQRender
      :type="current_test[counter_q].type"
      :variants="current_test[counter_q].variants"
      :img="current_test[counter_q].img"
      :counter_q="counter_q"
      @selected="AddAnswer"
    ></cTestQRender>
    <button
      v-show="counter_q !== last_q"
      @click="counter_q++"
      class="btn btn-next"
    >
      &#10140;
    </button>
    <button class="btn btn-exit-test" v-if="counter_q == last_q">
      закончить тест
    </button>
    <button @click="Log()">answers_true</button>
    <button @click="Timer(timer)">1</button>
  </div>
  <cTestResults
    :user="user"
    :test="test_settings.test_pack.discription"
    :answers="answers"
    v-if="test_end"
  ></cTestResults>
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
      counter_q: 1,
      last_q: Object.keys(this.test_settings.test_pack["questions"]).length,
      current_test: this.test_settings.test_pack["questions"],
      selected: "",
      test_end: false,
      answers: {},
      answers_true: this.test_settings.test_pack["right"],
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
            //alert("Время закончилось");
          } else {
            self.timer = `${minutes}:${seconds}`;
          }
          --timeMinut;
        }, 1000);
    },
    Log: function () {
      console.log(this.answers_true[6]);
    },
    AddAnswer: function (i) {
      this.answers[this.counter_q] = i;
      console.log(this.answers);
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
  }
  .btn-exit-test {
    margin-top: 20px;
    margin-bottom: 20px;
    background: none;
    color: white;
    font-size: 20px;
    border: 2px solid white;
    border-radius: 5px;
    height: 40px;
    &:hover {
      color: rgb(103, 216, 129);
      background-color: white;
    }
  }
}
</style>
