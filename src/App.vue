<template>
  <div id="app">
        
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
        return{
            afficheNav : true,
        }
    },
    updated(){
      console.log("updated")
    }
  }
</script>

<style lang="scss">


@import './assets/scss/custom.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';

.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'Photo';
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 100px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
