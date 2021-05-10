<template>
  <div class="content">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/css/normalize.css";
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap");
* {
  font-family: "Source Sans Pro", sans-serif;
  padding: 0;
  margin: 0;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: #797cc3;
  color: #e1e1e1;
}
</style>
