<template>
  <div class="box-modal">
    <div class="head-modal">
      <p>Выберете тест</p>
      <button class="btn btn-close" @click="$emit('close')">закрыть</button>
    </div>
    <div class="body-modal">
      <div
        class="card"
        v-for="(test, i) in tests_list"
        :key="i"
        @click="TestPick(i, test)"
      >
        <p>{{ test }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close", "test"],
  data() {
    return {
      tests_list: undefined,
    };
  },
  created() {
    this.GetTestsList();
  },
  methods: {
    GetTestsList: async function () {
      let url = "http://192.168.0.126:8000/ListTests";
      await fetch(url)
        .then((res) => res.json())
        .then((ListTests) => (this.tests_list = ListTests))
        .catch((e) => console.log(e));
    },
    TestPick: function (i, t) {
      this.$emit("test", i, t);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.btn {
  outline: none;
  border: none;
  cursor: pointer;
}
.box-modal {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background-color: #797cc3;
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;

  .head-modal {
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    p {
      font-size: 30px;
    }
    .btn-close {
      height: 30px;
      padding: 5px;
      font-weight: 600;
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
  .body-modal {
    width: 500px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    .card {
      width: 500px;
      display: inline-block;
      border: 2px solid rgb(216, 216, 216);
      border-radius: 5px;
      margin: 20px 20px 20px 0;
      cursor: pointer;

      &:hover {
        border: 2px solid white;
      }
      p {
        font-size: 20px;
        margin: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
