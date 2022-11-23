<template>
  <div id="app">
    <nav>
      <router-link to="/weather">Weather</router-link> |
      <router-link to="/about">Population</router-link> |
      <router-link to="/economy">Economy</router-link> |
      <router-link to="/">Traffic</router-link> 

    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
