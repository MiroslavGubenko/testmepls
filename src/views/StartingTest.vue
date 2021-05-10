<template>
  <div class="starting-test" v-if="!starting_test">
    <div class="error" v-if="error">
      <p>{{ error }} !</p>
      <progress max="100" :value="bar"></progress>
    </div>
    <div class="input-box">
      <label for="name-input">Введите имя</label>
      <input
        id="name-input"
        type="text"
        placeholder="Ваше имя"
        v-model="test_settings.user"
      />
    </div>
    <div class="input-box">
      <label for="test-select">Выберете тест</label>
      <button @click="test_pick = true" class="btn btn-select-test">
        {{ test_settings.test.name }}
      </button>
      <cTestPickerVue
        @test="SetTest"
        v-show="test_pick"
        @close="test_pick = false"
      />
    </div>
    <div class="time-mode">
      <p>Время на тест</p>
      <input
        type="radio"
        id="off"
        name="time-choose"
        value="0"
        v-model="test_settings.timer"
        checked
      />
      <label for="off">Нет</label>

      <input
        type="radio"
        id="slovly"
        name="time-choose"
        value="15"
        v-model="test_settings.timer"
      />
      <label for="slovly"
        >15 <br />
        минут</label
      >

      <input
        type="radio"
        id="faster"
        name="time-choose"
        value="30"
        v-model="test_settings.timer"
      />
      <label for="faster"
        >30 <br />
        минут</label
      >
    </div>
    <button class="btn btn-start" @click="StartTest()">
      начать тестирование
    </button>
  </div>
  <cTestRoom :test_settings="test_settings" v-if="starting_test"></cTestRoom>
</template>

<script>
import cTestPickerVue from "../components/cTestPicker.vue";
import cTestRoom from "../components/cTestRoom.vue";
export default {
  components: { cTestPickerVue, cTestRoom },
  data() {
    return {
      error: "",
      bar: 0,
      test_settings: {
        user: "",
        test: { id: "", name: "..." },
        timer: "15",
        test_pack: {},
      },
      test_pick: false,
      starting_test: false,
    };
  },
  methods: {
    SetTest: function (i, t) {
      this.test_settings.test.id = i;
      this.test_settings.test.name = t;
      this.GetTestPack(i);
    },
    StartTest: function () {
      if (this.test_settings.user === "") {
        this.error = "Введите имя";
      }
      if (this.test_settings.test.id === "") {
        this.error = "Выберете тест";
      }
      if (this.error !== "") {
        let progress = setInterval(
          () =>
            this.bar >= 100
              ? (clearInterval(progress), (this.error = ""), (this.bar = 0))
              : (this.bar = this.bar + 2),
          50
        );
      } else {
        this.starting_test = true;
      }
    },
    GetTestPack: async function (id) {
      let url = `http://192.168.0.126:8000/${id}`;
      await fetch(url)
        .then((res) => res.json())
        .then((test) => (this.test_settings.test_pack = test))
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  outline: none;
  border: none;
  cursor: pointer;
}
.error {
  position: absolute;
  top: 10px;
  width: 340px;
  height: 50px;
  -webkit-box-shadow: 0px 12px 15px 1px #6b6dad;
  box-shadow: 0px 12px 15px 1px #6b6dad;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 5px;

  p {
    margin: 0;
    padding-top: 10px;
    font-size: 25px;
    color: rgb(182, 27, 27);
  }
  progress {
    height: 5px;
    width: 340px;
    border: 0px;
    border-radius: 5px;
    &::-moz-progress-bar {
      background: rgba(182, 27, 27, 0.5);
    }
    &::-webkit-progress-value {
      background: rgba(182, 27, 27, 0.5);
    }
  }
}
.starting-test {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #name-input {
    caret-color: white;
    cursor: pointer;
    &:focus {
      cursor: none;
    }
  }
  .input-box {
    display: flex;
    flex-direction: column;
    width: 340px;
    margin-top: 20px;
    label {
      font-size: 30px;
      margin: 20px 0 20px 0;
    }
    input[type="text"] {
      height: 45px;
      font-size: 25px;
      border-radius: 5px;
      outline: none;
      border: 2px solid white;
      background-color: #797cc2;
      color: white;
      padding: 10px;
    }
  }
  .time-mode {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 0 20px 0;
    p {
      font-size: 20px;
    }
  }
  .btn-select-test {
    height: 65px;
    font-size: 25px;
    border-radius: 5px;
    outline: none;
    border: 2px solid white;
    background-color: #797cc2;
    color: white;
  }
  .btn-start {
    width: 220px;
    height: 30px;
    border-radius: 5px;
    color: #797cc2;
    font-weight: 700;
    text-transform: uppercase;
  }
}
.time-mode {
  display: flex;
  input[type="radio"] {
    opacity: 0;
    width: 0;
    &:checked + label {
      border: 2px solid white;
      border-radius: 5px;
    }
  }
  label {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-family: sans-serif, Arial;
    font-size: 15px;
    font-weight: 700;
    border: 2px solid #797cc2;
    border-radius: 5px;

    &:hover {
      border: 2px solid rgb(172, 172, 172);
      cursor: pointer;
    }
  }
}
</style>
