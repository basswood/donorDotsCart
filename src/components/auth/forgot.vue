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
                <img :src="logo" alt="" />
              </div>
              <h1 class="mb-3 text-18">Forgot Password</h1>
              
              <b-form @submit.prevent="submit">
                <b-form-group label="Email">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    type="email"
                    v-model="email"
                  >
                  </b-form-input>
                </b-form-group>
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
                  <b-alert
                    show
                    variant="success"
                    class="error col mt-1"
                    v-if="submitStatus === 'OK'"
                    >Reset password link sent to your email.</b-alert
                  >
                <b-button
                  type="submit"
                  block
                  variant="primary"
                  
                  class="btn-rounded"
                  >Reset Password</b-button
                >
              </b-form>
              <div class="flex-grow-1"><hr></div>
              <div class="mt-3 text-center">
                <router-link to="signIn" tag="a" class="text-muted ">
                  <u>Go back to Sign-in</u>
                </router-link>
              </div> 
              <div class="flex-grow-1"><br /></div>
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
    title: "Forgot Password"
  },
  data() {
    return {
      email: "",
      bgImage: require("@/assets/images/photo-wide-4.jpg"),
      logo: require("@/assets/images/logo.png"),
      formImage: require("@/assets/images/photo-long-3.jpg"),
      errorMessage: null,
      submitStatus: ""
    };
  },
  computed: {
 ...mapGetters(["error","loading"])
  },
  methods: {
    ...mapActions(["forgotPassword"]),
    submit() {
      this.errorMessage = null;
      this.submitStatus = "LOADING";
      //alert(this.email);
      this.forgotPassword({ email: this.email});
      setTimeout(() => {
        if (this.errorMessage != null){
          this.submitStatus = "NOTHING";
        }
        else{
          this.submitStatus = "OK";

        }
      }, 1000);
    }
  },
  watch:{
        error(val) {
      if (val != null) {
        this.errorMessage = val.message;
           
      }
    }
  }
};
</script>
