<template>
  <div id="app">
    <div class="start-loading" v-if="startLoading">Bekleyiniz...</div>
    <router-view v-if="!startLoading" />
    <div class="copyright"><a href="#" title="Dogunet yazılım geliştirme"><b>DOGUNET</b>SOFTWARE</a></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      startLoading: true
    }
  },
  created() {
    this.startLoading = false;
  },
};
</script>

<style>
/*awesome*/
@import 'assets/css/font-awesome.min.css';

body {
  background-image: url("./assets/images/login-bg-lamb.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #818080;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

#app {
  font-family: 'FontAwesome',"Helvetica Neue",Helvetica,Arial,sans-serif /* "Avenir", Helvetica, Arial, sans-serif */;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.start-loading {
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  background: #ffffff;
}

.copyright { text-align: center; }
.copyright a {
  line-height: 50px;
  color: #636363;
  font-family: monospace !important;
  font-size: 1.1rem;
  text-decoration: none;
}

::-webkit-scrollbar { width: 3px; height: 3px; }
::-webkit-scrollbar-track { background: #a1a1a1; }
::-webkit-scrollbar-thumb { background: #888888; }
::-webkit-scrollbar-thumb:hover { background: #555555; }

h2.modal-title { margin-top: 5px; padding-bottom: 5px; border-bottom: 1px solid #e4e4e4; }

</style>
