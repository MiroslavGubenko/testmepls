<template>
  <div class="q-text">
    <img v-if="img" :src="img" alt="foto-q" />
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
</template>

<script>
export default {
  props: ["img", "variants", "counter_q"],
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  img {
    width: 50%;
    border-radius: 5px;
    border: 3px solid white;
    margin: 20px 0 20px 0;
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
      &.selected {
        box-shadow: inset 0px 0px 0px 5px rgb(175, 230, 255);
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
</style>
