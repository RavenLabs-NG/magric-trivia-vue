<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView />
</template>

<style scoped>

body{
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  background: #f5f5f5;
}
#app {
  text-align: center;
  color: #285312;
  height: 100%;
  padding: 20px 0px;
  max-width: 80%;
  margin: 0 auto;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
h1,h2,h3,h4,h5,h6{
  margin: 0;
}

.button{
    background: #c4d600;
    color: white;
    border: none;
    font-size: 1.3em;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    border-radius: 0.375rem;
    display: inline-block;
  }

  .button:hover{
    transform: scale(1.018);
  }

  .button:focus{
    outline: none;
  }
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}


</style>
