<template>
  <div class="main-container">
    <div class="btn-group">
      <router-link to="/creator" tag="button">Создание<br />тестов</router-link>
      <router-link to="/testing" tag="button">Тестирование</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .btn-group {
    width: 360px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: #1e1e21;
    border-radius: 10px;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 160px;
      width: 160px;
      color: white;
      background: none;
      border: 1px solid #1e1e21;
      border-radius: 5px;
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      text-decoration: none;
      transition: 0.3s;
      &:hover {
        background-color: #59595c;
        border: 1px solid #59595c;
      }
    }
  }
}
</style>
