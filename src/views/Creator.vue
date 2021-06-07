<template>
  <div class="creator">
    <div class="input">
      <label for="test_discription">Название теста</label>
      <input id="test_discription" v-model="test.discription" type="text" />
    </div>
    <hr />
    <ul v-if="qs">
      <li class="card-new-q" v-for="(q, i) in qs" :key="i">
        <div class="input">
          <label for="q_title">Вопрос №{{ i + 1 }} :</label>
          <textarea type="text" v-model="q.title" />
        </div>
        <hr />
        Варианты ответов :
        <ul>
          <li v-for="k in 4" :key="k">
            <span>{{ k }}</span
            ><textarea cols="30" type="text" v-model="q.variants[k - 1]" />
          </li>
          <hr />
          Номер правильного ответа :
          <select v-model="test.answers_true[i]" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </ul>
        <button @click="DeleteQ(i)">Удалить</button>
      </li>
    </ul>
    <button class="add_q" @click="AddNewQ">добавить вопрос</button>
    <hr />
    <hr />
    <button class="save_q_pack" v-if="qs.length" @click="SaveQPack">
      сохранить тест
    </button>
    <button class="go_to_main" onclick="window.location.href='/'">
      на главную
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qs: [],
      test: {
        discription: "",
        questions: {},
        answers_true: [],
      },
    };
  },
  methods: {
    AddNewQ: function () {
      this.qs.push({
        title: "",
        variants: [],
      });
    },
    DeleteQ: function (i) {
      this.qs.splice(i, 1);
    },
    SaveQPack: async function () {
      this.test.questions = this.qs;
      let url = "http://192.168.0.126:8000/tests";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(this.test),
      })
        .then((res) => res.json())
        .then(console.log(JSON.stringify(this.test)))
        .catch((e) => console.log(e));

      this.test.discription = "";
      this.qs = [];
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin-top: 20px;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
  color: white;
}
textarea {
  text-align: center;
  resize: none;
  margin: 2px;
}
.creator {
  padding-top: 50px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  .input {
    display: flex;
    flex-direction: column;
  }
  .card-new-q {
    border: 2px solid white;
    margin: 15px;
    padding: 15px;
    border-radius: 5px;
  }
  button {
    color: #797cc3;
    margin: 5px;
    cursor: pointer;
    padding: 5px 20px;
    font-size: 0.8em;
  }
  .save_q_pack {
    color: green;
  }
}
</style>
