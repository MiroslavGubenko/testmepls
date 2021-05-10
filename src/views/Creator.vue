<template>
  <div class="creator">
    <input type="text" placeholder="название теста" v-model="name" />
    <div class="list" v-for="i in 10" :key="i">
      <label>Вопрос {{ i }}</label>
      <label>Тип вопроса</label>
      <select v-model="type">
        <option value="text">TEXT</option>
        <option value="img">IMG</option>
        <option value="open">OPEN</option>
      </select>
      <textarea :placeholder="i"></textarea>
      <div class="answer" v-for="i in 4" :key="i">
        <span>{{ i }}</span
        ><input type="text" />
      </div>
      {{ type }}
    </div>
    <button>сохранить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "",
      name: "",
      Questions: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.creator {
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.list {
  display: flex;
  flex-direction: column;
}
</style>
