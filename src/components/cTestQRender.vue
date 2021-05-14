<template>
  <div v-if="type === 'text'" class="q-text">
    <ul>
      <li
        v-for="(variant, i) in variants"
        :key="i"
        @click="(selected = i), $emit('selected', i + 1)"
        :class="{ selected: selected === i }"
      >
        <span>{{ i + 1 }}</span>
        <p>{{ variant }}</p>
      </li>
    </ul>
  </div>
  <div v-if="type === 'img'" class="q-img">
    <img :src="img" alt="foto-q" />
    <textarea></textarea>
  </div>
  <div v-if="type === 'open'" class="q-open"><textarea></textarea></div>
</template>

<script>
export default {
  props: ["type", "img", "variants", "counter_q"],
  emits: ["selected"],
  data() {
    return {
      selected: "",
    };
  },
  methods: {},
  watch: {
    counter_q: function () {
      this.selected = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.q-text {
  .selected {
    border-radius: 5px;
    border: 3px solid rgb(175, 230, 255);
  }
  color: #4f4f4f;
  ul {
    list-style: none;
    li {
      min-height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      background-color: white;
      border-radius: 5px;
      border: 3px solid #797cc2;
      cursor: pointer;
      &:hover {
        border-radius: 5px;
        border: 3px solid #797cc2;
        background-color: rgb(175, 230, 255);
      }
      span {
        margin: -5px 40px 0px 8px;
        display: inline-block;
        text-align: center;
        border-radius: 50%;
        color: white;
        background-color: #797cc2;
        width: 20px;
        height: 20px;
      }
      p {
        width: 80%;
        font-size: 20px;
        line-height: 17px;
      }
    }
  }
}
.q-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    border-radius: 5px;
    border: 3px solid white;
    margin-bottom: 5px;
  }
  textarea {
    border-radius: 5px;
    outline: none;
    width: calc(100% - 50px);
    max-width: calc(100% - 50px);
    min-width: calc(100% - 50px);
    padding: 20px;
    color: #4f4f4f;
    font-size: 20px;
    max-height: 600px;
  }
}
.q-open {
  textarea {
    border-radius: 5px;
    outline: none;
    width: calc(100% - 50px);
    max-width: calc(100% - 50px);
    min-width: calc(100% - 50px);
    padding: 20px;
    color: #4f4f4f;
    font-size: 20px;
    max-height: 600px;
  }
}
.selected {
  border-radius: 5px;
  border: 3px solid rgb(175, 230, 255);
}
</style>
