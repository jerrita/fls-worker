<script setup>
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>

  <div class="footer">
    <p>Jerrita's share list service</p>
    <p>Copywrong © 2023 Jerrita</p>
  </div>
</template>

<style scoped>
.box-card {
  max-width: 800px;
  margin: auto;
}
.footer {
  font-size: var(--el-font-size-small);
  color: grey;
  text-align: center;
}
</style>
