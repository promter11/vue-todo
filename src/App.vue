<template>
  <div id="app">
    <nav class="nav">
      <router-link
        class="nav__link"
        exact-active-class="nav__link--exact"
        to="/"
      >
        Home
      </router-link>
      <router-link
        class="nav__link"
        exact-active-class="nav__link--exact"
        to="/about"
      >
        About
      </router-link>
      <router-link
        class="nav__link"
        exact-active-class="nav__link--exact"
        to="/photos"
      >
        Photos
      </router-link>
    </nav>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import "./main.scss";

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 15px;
  background: linear-gradient(to left, #d7dde8, #757f9a);
}

.nav {
  margin-bottom: 40px;

  &__link {
    &:not(:last-child) {
      margin-right: 20px;
    }

    &--exact {
      font-weight: bold;
      color: #757f9a;
    }
  }
}
</style>
