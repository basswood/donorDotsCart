<template>
  <div
    class="auth-layout-wrap"
    :style="{ backgroundImage: 'url(' + bgImage + ')' }"
  >
    <div class="auth-content">
      <div class="card o-hidden">
        <div class="row">
          <div class="col-md-12">
            <div class="p-4">
              <div class="auth-logo text-center mb-30">
                <img :src="logo" />
              </div>
              <h1 class="mb-3 text-18">Sign In</h1>
              <b-form @submit.prevent="formSubmit">
                <b-form-group label="Email Address" class="text-12">
                  <b-form-input
                    class="form-control-rounded"
                    type="text"
                    v-model="email"
                    name="email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Password" class="text-12">
                  <b-form-input
                    class="form-control-rounded"
                    type="password"
                    name="password"
                    v-model="password"
                  ></b-form-input>
                </b-form-group>

                <!-- <b-button block to="/" variant="primary btn-rounded mt-2"
                  >Sign In</b-button
                > -->
                <div v-once class="typo__p text-center" v-if="loading">
                  <div class="spinner sm spinner-primary mt-3"></div>
                </div>
                  <b-alert
                    show
                    variant="warning"
                    class="error col mt-1"
                    v-if="errorMessage != null "
                    >{{errorMessage}}</b-alert
                  >


                <b-button
                  type="submit"
                  tag="button"
                  class="btn-rounded btn-block mt-2"
                  variant="primary mt-2"
                  :disabled="loading"
                >
                  SignIn
                </b-button>

                <b-button
                  to="signUp"
                  block
                  variant="primary mt-2"
                  class="btn-rounded"
                  >Create an account</b-button
                >
              </b-form>

              <div class="mt-3 text-center pb-20">
                <router-link to="forgot" tag="a" class="text-muted">
                  <u>Forgot Password?</u>
                </router-link>
              </div>
              <div class="w-100 mb-30">

              <div class="text-center pb-20">
                <span class="lined-title text-center">- OR -</span>
              </div>
              
                <a @click="gmailLogin" class="btn btn-outline-primary btn-outline-google btn-block btn-icon-text btn-rounded">
                  <i class="i-Google-Plus"></i> Sign in with Google
                </a>
                 
                <a  @click="facebookLogin" class="btn btn-outline-primary btn-outline-facebook btn-block btn-icon-text btn-rounded">
                  <i class="i-Facebook-2"></i> Sign in with Facebook
                </a>
              </div>  
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "SignIn"
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
      // // password: "vue006",
      userId: "",
      bgImage: "",
      logo: "",
      signInImage: ""
    };
  },
  computed: {
    validation() {
      return this.userId.length > 4 && this.userId.length < 13;
    },
    ...mapGetters(["loggedInUser", "loading", "error"])
  },

  methods: {
    ...mapActions(["login","gmail","facebook"]),
    
    formSubmit() {
      this.login({ email: this.email, password: this.password });
    },
    gmailLogin() {
      this.gmail();
      
    },
    facebookLogin() {
      this.facebook();
      
    },    
    // makeToast(variant = null, msg) {
    //   this.$bvToast.toast(msg, {
    //     title: ` ${variant || "default"}`,
    //     variant: variant,
    //     solid: true
    //   });
    // }
  },
  watch: {
    loggedInUser(val) {
      
      if (val && val.uid && val.uid.length > 0) {
          this.$router.push("/admin");
      
      }
    },
    error(val) {
      if (val != null) {
        this.errorMessage = val.message;
        
      }
    }
  }
};
</script>

<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
</style>
