<template>
  <div class="modal modal-test-end">
    <div class="modal-header"><h1>Тест завершен!</h1></div>
    <div class="modal-body">
      <div class="name">
        <h3>Тестируемый : {{ user }}</h3>
      </div>
      <div class="test">
        <h3>Тема : {{ test }}</h3>
      </div>
      <div class="results">
        <ul>
          <li v-for="(answer, i) in answers" :key="i">{{ answer }}</li>
        </ul>
      </div>
    </div>
    <div class="modal-footer">
      <div class="link-to-social"></div>
      <div class="back-to-main-page"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user", "test", "answers", "true"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background-color: white;
  height: 100%;
  width: 100%;
  color: #4f4f4f;
  ul {
    list-style: none;
  }
  div {
    padding-left: 20px;
  }
}
</style>
