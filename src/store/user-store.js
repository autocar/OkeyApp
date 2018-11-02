import { UserModel } from '../models/models';
import { db, auth } from '../main';
import firebase from "firebase";

export default {
   state: {
      user: new UserModel(),
   },
   mutations: {
      setUser(state, payload) {
         state.user = payload;
      }
   },
   actions: {
      resetPasswordWithEmail({ commit }, payload) {
         // commit('setLoading', true)
      },
      signUpEmailPass({ commit, dispatch }, payload) {
         auth.createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
            const newUser = new UserModel();
            newUser.email = user.user.email;
            newUser.userId = user.user.uid;
            newUser.name = payload.displayName;
            newUser.photoUrl = user.user.photoURL;
            user.user.updateProfile({displayName: payload.displayName});
            console.log("emailpass signup", user);
            if(user.additionalUserInfo.isNewUser) dispatch("userDataSet", newUser);
            commit('setUser', newUser);
         }).catch(err => {
            console.log(err);
            alert(err.message);
         })
      },
      signInEmailPass({ commit }, payload) {
         auth.signInWithEmailAndPassword(payload.email, payload.password).then(user => {
            const newUser = new UserModel();
            newUser.email = user.user.email;
            newUser.userId = user.user.uid;
            newUser.name = user.user.displayName;
            newUser.photoUrl = user.user.photoURL;
            console.log("emailpass signin", user);
            commit('setUser', newUser);
         }).catch(err => {
            console.log(err);
            alert(err.message);
         })
      },
      signInGoogle({ commit, dispatch }) {
         auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
            const newUser = new UserModel();
            newUser.email = user.user.email;
            newUser.userId = user.user.uid;
            newUser.name = user.user.displayName;
            newUser.photoUrl = user.user.photoURL;
            console.log("google signin", user);
            if(user.additionalUserInfo.isNewUser) dispatch("userDataSet", newUser);
            commit('setUser', newUser);
         }).catch(err => {
            console.log(err);
            alert(err.message)
         })
      },
      signInFacebook({ commit, dispatch }) {
         auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(user => {
            const newUser = new UserModel();
            newUser.email = user.user.email;
            newUser.userId = user.user.uid;
            newUser.name = user.user.displayName;
            newUser.photoUrl = user.user.photoURL;
            console.log("facebook signin", user);
            if(user.additionalUserInfo.isNewUser) dispatch("userDataSet", newUser);
            commit('setUser', newUser);
         }).catch(err => {
            console.log(err);
            alert(err.message)
         })
      },
      autoSignIn({ commit }, payload) {
         if(payload) {
            const newUser = new UserModel();
            newUser.email = payload.email;
            newUser.userId = payload.uid;
            newUser.name = payload.displayName;
            newUser.photoUrl = payload.photoURL;
            console.log("autosign user", newUser);
            commit('setUser', newUser);
         }
      },
      logout({ commit }) {
         auth.signOut();
         commit('setUser', null);
      },
      userDataSet({},userData) {
         db.collection("users").doc(userData.userId).set({
            userId: userData.userId,
            email: userData.email,
            name: userData.name,
            photoUrl: userData.photoUrl
         }).then(()=>{ console.log("userDataSet Success"); }).catch(err=>{ console.log("userDataSet Error",err); });
      }
   },
   getters: {
      user(state) {
         return state.user
      }
   }
}
