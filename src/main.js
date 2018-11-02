// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import {store} from './store/store'

Vue.config.productionTip = false

import firebase from "firebase";

let app;
let config = {
  apiKey: "AIzaSyCOzvKlt8-Cl9belGSAtfe6J1Kw8qJpNQ0",
  authDomain: "okeygameapp.firebaseapp.com",
  databaseURL: "https://okeygameapp.firebaseio.com",
  projectId: "okeygameapp",
  storageBucket: "okeygameapp.appspot.com",
  messagingSenderId: "952012065470"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user){
  if(!app) {
    app = new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>',
    });
  }
});
firebase.firestore().settings({ timestampsInSnapshots: true });
export const auth = firebase.auth();
export const db = firebase.firestore();
