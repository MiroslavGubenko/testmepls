<template>
  <div class="component">
    <h2 v-if="tests_list.length != 0">Список созданных тестов</h2>
    <h2 v-else>Список тестов пуст</h2>
    <div class="cards">
      <div class="card_body" v-for="(test, k) in tests_list" :key="k">
        <p>
          <strong>{{ test.discription }}</strong>
        </p>
        <hr />
        <details v-if="test.questions.length != 0">
          <summary>Список вопросов</summary>
          <ul>
            <li v-for="(q, i) in test.questions" :key="i">
              <p>Вопрос № {{ i + 1 }} : {{ q.title }}</p>
              <hr />
            </li>
          </ul>
        </details>
        <p v-else>Вопросов нету</p>
        <div class="card_btn">
          <button @click="OpenTest(test)">
            <strong>редактировать &#9998;</strong>
          </button>
          <button @click="DeleteTest(test.id, k)">&#10006;удалить тест</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["update"],
  data() {
    return {
      tests_list: [],
    };
  },
  methods: {
    LoadTests: async function () {
      let url = "http://192.168.0.126:8000/tests";
      await fetch(url)
        .then((res) => res.json())
        .then((r) => (this.tests_list = r))
        .catch((e) => console.log(e));
    },
    OpenTest: function (test) {
      this.$emit("test_open", test);
      console.log(test);
    },
    DeleteTest: async function (i, k) {
      let url = `http://192.168.0.126:8000/tests/${i}`;
      fetch(url, { method: "DELETE" }).catch((e) => console.log(e));
      this.tests_list.splice(k, 1);
    },
  },
  mounted() {
    this.LoadTests();
  },
  watch: {
    update: function () {
      if (this.update) {
        this.LoadTests();
        this.$emit("update");
      }
    },
  },
};
</script>

<style lang="css">
hr {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 90%;
  color: white;
}
ul {
  list-style: none;
}
.component {
  min-height: 50px;
  border: 3px solid #797cc3;
  overflow: auto;
  padding: 15px;
  margin: 20px;
  background-color: white;
  color: #797cc3;
  border-radius: 15px;
}
.card_body {
  margin: 5px;
  border: 1px solid #797cc3;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  max-width: 300px;
  width: 300px;
  min-height: 100px;
}
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
button {
  color: rgb(95, 18, 18);
  margin: 5px;
  cursor: pointer;
  padding: 5px 20px;
  font-size: 0.8em;
}
</style>
