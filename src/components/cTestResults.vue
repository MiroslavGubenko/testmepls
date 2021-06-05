<template>
  <div v-if="end" class="modal modal-test-end">
    <div class="modal-header">
      <h1>Тест завершен!</h1>
      <div class="name">
        <p>
          Тестируемый : <strong>{{ user }}</strong>
        </p>
      </div>
      <div class="test">
        <p>
          Тема : <strong>{{ test }}</strong>
        </p>
      </div>
      <p>
        Правильные ответы :
        <strong>{{ success }} из {{ answers_true.length }}</strong>
      </p>
      <p>
        Тест
        <strong
          v-if="success >= Math.round(answers_true.length * (1 - 20 / 100))"
          style="background-color: rgb(65, 175, 65); padding: 5px"
          >пройден</strong
        >
        <strong v-else style="background-color: rgb(180, 53, 53); padding: 5px"
          >не пройден</strong
        >
      </p>
    </div>
    <div class="modal-body">
      <div class="results">
        <div
          class="answers"
          v-for="(question, i) in current_test"
          :key="i"
          :class="[answers_chek[i] ? 'true' : 'false']"
        >
          <div class="q">
            <h4>
              <i>{{ i + 1 }}</i
              >. {{ question.title }}
            </h4>
          </div>
          <hr />
          <ul v-for="(v, k) in question.variants" :key="k">
            <li
              :class="{
                true_variant: k + 1 === Number(answers_true[i]),
                pick: k + 1 === answers[i],
              }"
            >
              {{ v }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div class="link-to-social"></div>
      <div class="back-to-main-page">
        <button class="go_to_main" onclick="window.location.href='/'">
          на главную
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    end: { type: Boolean, default: false },
    user: String,
    test: String,
    answers: Object,
    answers_true: Array,
    current_test: Object,
  },
  data() {
    return {
      answers_chek: {},
      success: 0,
    };
  },
  methods: {
    ChekAnswers: function () {
      for (var key in this.answers) {
        if (this.answers_true[key] == this.answers[key]) {
          this.answers_chek[key] = true;
          this.success++;
        } else this.answers_chek[key] = false;
      }
    },
    Log: function () {
      console.log(this.current_test);
      console.log(this.answers);
      console.log(this.answers_true);
    },
  },
  watch: {
    end: function () {
      this.ChekAnswers();
    },
  },
};
</script>

<style lang="scss" scoped>
hr {
  color: white;
}
p {
  margin: 0;
  padding-top: 10px;
  font-size: 25px;
  color: #e1e1e1;
}
.modal {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: auto;
  width: 80%;
  color: #e1e1e1;
  overflow-x: hidden;
  .modal-header {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-left: 20px;
  }
  .results {
    .answers {
      margin: 20px 20px;
      background-color: white;
      border-radius: 5px;
      padding: 20px;
      max-width: 600px;
    }
    .answers.true {
      border-left: 5px solid rgb(65, 175, 65);
      color: #4f4f4f;
      padding: 20px;
    }
    .answers.false {
      border-left: 5px solid rgb(180, 53, 53);
      color: #4f4f4f;
    }
    ul {
      list-style: none;
      width: 300px;
      li {
        margin: 5px;
        padding: 5px;
      }
    }
    div {
      padding-left: 20px;
    }
  }
  .true_variant {
    border-left: 5px solid rgb(65, 175, 65);
    color: green;
  }
  .pick {
    border-left: 5px solid #4f4f4f41;
  }
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    .go_to_main {
      cursor: pointer;
      color: #797cc2;
      padding: 10px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
}
</style>
