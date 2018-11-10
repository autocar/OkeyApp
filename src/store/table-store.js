import { TableModel, SaloonModel } from '../models/models';

export default {
   state: {
      saloons: [],
      tables: null,
      secilenSaloon: null,
   },
   mutations: {
      setTable(state, payload) {
         state.tables = payload
      },
      pushSaloon(state, payload){
         state.saloons.push(payload);
      },
      secSalon(state, payload){
         state.secilenSaloon = payload;
      },
      resetSaloons(state) {
         state.saloons = [];
      }
   },
   actions: {
      getTables({ commit, dispatch }, payload) {
         /* db.collection("tables").get().then(res=>{
            console.log(res);
         }).catch(err=>{
            console.log(err);
         }); */
      },
      getSaloons({commit}) {
         /* db.collection("saloons").get().then(res=>{
            commit("resetSaloons");
            res.forEach(r=>{
               var d = new SaloonModel();
               d.saloonName = r.data().name;
               d.saloonId = r.id;
               commit("pushSaloon", d);
            });
         }).catch(err=>{
            console.log(err);
         }) */
      },
      addSaloon({commit}, payload){
         /* const saloon = new SaloonModel();
         saloon.saloonName = payload.name;
         db.collection("saloons").add({ name: payload.name }).then(res=>{
            saloon.saloonId = res.id
            console.log("add saloon", saloon);
            commit("pushSaloon", saloon);
         }).catch(err=>{
            console.log(err);
         }); */
      },
      selectSaloon({commit}, payload){
         commit("secSalon", payload);
      }
   },
   getters: {
      tables(state) {
         return state.tables
      },
      saloons(state){
         return state.saloons
      },
      secilenSaloon(state){
         return state.secilenSaloon
      }
   }
}
