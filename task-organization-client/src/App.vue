<template>
  <div id="app">
    <container></container>
  </div>
</template>

<script>
  import Container from './components/Container.vue';

  export default {
    name: 'app',
    components: {
      'container': Container
    },
    data() {
      return {

      }
    },
    created: function() {
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  html {
    font-size: 12px;
  }

  hr {
    background: #212121;
    border: 0;
    height: 0;
    margin: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
</style>
