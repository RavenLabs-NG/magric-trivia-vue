<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
<div class="container flex flex-col h-dvh w-screen bg-green">
    <!-- Main navigation container -->
    <nav
    class="w-full items-center justify-center">
    <div class="flex w-full flex-wrap items-center justify-center">
        <!-- Logo -->
        <a
          class="mb-4 me-5 ms-2 mt-3 flex items-center"
          href="http://magric.ng/home"
        >
          <img
            src="@/assets/images/logo.jpg"
            style="height: 50px"
            alt="Logo"
            loading="lazy"
          />
        </a>
      </div>
  </nav>
  <RouterView  />
</div>
</template>

<style scoped></style>
