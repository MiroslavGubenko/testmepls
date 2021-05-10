<template>
  <div class="container">
    <section class="discription">
      <div class="header">
        <p class="user">{{ user }}</p>
        <p class="test-name">Тема: {{ current_test.discription }}</p>
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
    ></cTestQRender>
    <div class="box-progress">
      <button
        v-show="counter_q !== 1"
        @click="counter_q--"
        class="btn btn-post"
      >
        &#10140;
      </button>
      <br />
      <button
        v-show="counter_q !== last_q"
        @click="counter_q++"
        class="btn btn-next"
      >
        &#10140;
      </button>
    </div>
    <button class="btn btn-exit-test">завершить тест</button>
  </div>
</template>

<script>
import cTestQRender from "./cTestQRender.vue";
export default {
  props: ["test_settings"],
  components: { cTestQRender },
  data() {
    return {
      user: this.test_settings.user || "NoName",
      timer: Number(this.test_settings.timer) || 0,
      counter_q: 1,
      last_q: Object.keys(this.test_settings.test_pack["questions"]).length,
      current_test: this.test_settings.test_pack["questions"],
      selected: "",
    };
  },
  methods: {},
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
      align-items: center;
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
      font-size: 30px;
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
  .box-progress {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .progress-counter {
    width: 100%;
    text-align: right;
    font-size: 15px;
  }
  .btn-next,
  .btn-post {
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
  .btn-post {
    transform: rotate(180deg);
  }
  .btn-exit-test {
    margin-top: 20px;
    background: none;
    color: white;
    border: 2px solid white;
    border-radius: 5px;
    &:hover {
      color: red;
      background-color: white;
    }
  }
}
</style>
