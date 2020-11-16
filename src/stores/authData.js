/* eslint-disable */ 
import firebase from "firebase/app";
import "firebase/auth";


export default {

  state: {
    loggedInUser:
      localStorage.getItem("userInfo") != null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
   
    loading: false,
    error: null
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
    loading: state => state.loading,
    error: state => state.error
  },
  mutations: {
    setUser(state, data) {
      state.loggedInUser = data;
      state.loading = false;
      state.error = null;
    },
    setLogout(state) {
      state.loggedInUser = null;
      state.loading = false;
      state.error = null;
      // this.$router.go("/");
    },
    setLoading(state, data) {
      state.loading = data;
      state.error = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    login({commit}, data) {
      commit("clearError");
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(user => {
          const newUser = {uid: user.user.uid};
          localStorage.setItem("userInfo", JSON.stringify(newUser));
          localStorage.setItem("userEmail", JSON.stringify(user.user.email));
          localStorage.setItem("userName", JSON.stringify(user.user.displayName));
          commit("setUser", {uid: user.user.uid});
          if (user.user.emailVerified == false) {
            throw new Error('WARNING: Your account has not been verified yet. Please check your email and try again.');
          }
          
        })
        .catch(function(error) {
          localStorage.removeItem("userInfo");
          if (error.code == "auth/wrong-password"){
            error.message = "Incorrect Password";
          }
          else if(error.code == "auth/user-not-found") {
            error.message = "User not found"
          }
          else if(error.code == "auth/user-disabled") {
            error.message = "User disabled"
          }
          commit("setError", error);
          // ...
        });
    },
    gmail({commit}, data) {



      commit("clearError");
      commit("setLoading", true);
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(user => { 
          const newUser = {uid: user.user.uid};
          localStorage.setItem("userInfo", JSON.stringify(newUser));
          localStorage.setItem("userEmail", JSON.stringify(user.user.email));
          localStorage.setItem("userName", JSON.stringify(user.user.displayName));
          commit("setUser", {uid: user.user.uid});
        })
      .catch(function(error){
          localStorage.removeItem("userInfo");
          commit("setError", error);
        })
    },
    facebook({commit}, data) {
      commit("clearError");
      commit("setLoading", true);
      

      
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(user => { 
          const newUser = {uid: user.user.uid};
          localStorage.setItem("userInfo", JSON.stringify(newUser));
          localStorage.setItem("userEmail", JSON.stringify(user.user.email));
          localStorage.setItem("userName", JSON.stringify(user.user.displayName));
          commit("setUser", {uid: user.user.uid});
        })
      .catch(function(error){
        localStorage.removeItem("userInfo");
        
        if (error.code == "auth/account-exists-with-different-credential")  {
          error.message = "Email already registerd as Username or Gmail.";
        }
        else{
          error.message = "Something went wrong. Please try again.";
        }
          commit("setError", error);
          
        })
    },
    forgotPassword({commit}, data) {
      commit("clearError");
      commit("setLoading", true);
     
     const actionCodeSettings = {
      //url: `${process.env.VUE_APP_HOST_NAME}/sign-in/?email=${user.email}`,
      url: `https://192.168.100.160:8080/`,
      
    };
        firebase
        .auth()
        .sendPasswordResetEmail(data.email,actionCodeSettings)
        .then(() => {
          commit("setLoading", false);
        }).catch((error) => {
         
          if (error.code == "auth/user-not-found"){
            error.message = "User not found";
          }
          commit("setError", error);
        })
    
    

    
    },
    signUserUp({commit}, data) {
      commit("setLoading", true);
      commit("clearError");
      
      firebase
      .auth()
      .fetchSignInMethodsForEmail(data.email)
      .then(signInMethods => {
        if (signInMethods.includes('password')){
          throw new Error('Email already registered');
        }
        else {

          firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(user => {
            user.user.updateProfile({displayName: data.name})
            const user2 = firebase.auth().currentUser;
            const actionCodeSettings = {
              //url: `${process.env.VUE_APP_HOST_NAME}/sign-in/?email=${user.email}`,
              url: `https://192.168.100.160:8080/`,
            };
            user2.sendEmailVerification(actionCodeSettings);
            commit("setLoading", false);
          })
          .catch(function(error){
            commit("setLoading", false);
            commit("setError", error);
            localStorage.removeItem("userInfo");
            if (errorCode == 'auth/weak-password') {
              throw new Error('Password too weak');
            } else if (errorCode == 'auth/email-already-in-use') {
              throw new Error('Email already in use');
            } else {
              throw new Error('Error occured, please try again');
            }
            
          });
        }
      })
      .catch(function(error) {
        commit("setError", error);
      });
      

    },
    signOut({commit}) {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            localStorage.removeItem("userInfo");
            commit("setLogout");
          },
          _error => {}
        );
    }
  }
};
