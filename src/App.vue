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
  scrollbar-width: thin;
  scrollbar-color: #e1e1e1 #797cc3;
  scroll-margin-block: 20px;
  scroll-behavior: smooth;
}
.content {
  background-color: #797cc3;
  color: #e1e1e1;
  width: 100%;
  height: 100vh;
  overflow: auto;
}
</style>
