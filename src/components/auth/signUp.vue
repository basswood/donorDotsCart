<template>
  <div
    class="auth-layout-wrap"
    :style="{ backgroundImage: 'url(' + bgImage + ')' }"
  >
    <div class="auth-content">
      <div class="card o-hidden">
        <div class="row">
          <div class="col-md-12 text-center ">
            <div class="px-3">
              <div class="auth-logo text-center mt-4">

                <img :src="logo" alt="" />
              </div>
              <div class="flex-grow-1"></div>
              <div class="p-4">
              <h1 class="mb-3 text-18">Sign Up</h1>
              <b-form @submit.prevent="submit">
                <b-form-group label="Your Name">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    v-model="name"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error col mt-1"
                    v-if="!$v.name.minLength"
                    >Name must have at least
                    {{ $v.name.$params.minLength.min }}letters.</b-alert
                  >
                </b-form-group>

                <b-form-group label="Email">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    type="email"
                    v-model="email"
                  >
                  </b-form-input>
                </b-form-group>

                <b-form-group label="Password">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    type="password"
                    v-model.trim="$v.password.$model"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error col mt-1"
                    v-if="!$v.password.minLength"
                    >Minimum
                    {{ $v.password.$params.minLength.min }} charaters.</b-alert
                  >
                </b-form-group>

                <b-form-group label="Repeat Password">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    type="password"
                    v-model.trim="$v.repeatPassword.$model"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error col mt-1"
                    v-if="!$v.repeatPassword.sameAsPassword"
                    >Passwords must be identical.</b-alert
                  >
                </b-form-group>
                  <b-alert
                    show
                    variant="success"
                    class="error col mt-1"
                    v-if="submitStatus === 'OK'"
                    >Account creation was successful. Please confirm by verifying email.</b-alert
                  >
                  <b-alert
                    show
                    variant="warning"
                    class="error col mt-1"
                    v-if="errorMessage != null "
                    >{{errorMessage}}</b-alert
                  >
                  <b-alert
                    show
                    variant="warning"
                    class="error col mt-1"
                    v-if="submitStatus === 'ERROR'"
                    >There was sort of error. Please check form.</b-alert
                  >
                <b-button
                  type="submit"
                  block
                  variant="primary"
                  :disabled="submitStatus === 'PENDING' || $v.$invalid"
                  class="btn-rounded"
                  >Sign Up</b-button
                >

                <div v-once class="typo__p" v-if="submitStatus === 'PENDING'">
                  <div class="spinner sm spinner-primary mt-3"></div>
                </div>
              </b-form>
            </div>

            
              <div class="text-center pb-20">
                <span class="lined-title text-center">- OR -</span>
              </div>
              <div class="w-90 mb-30">

                <a @click="gmailLogin" class="btn btn-outline-primary btn-outline-google btn-block btn-icon-text btn-rounded">
                  <i class="i-Google-Plus"></i> Sign in with Google
                </a>
                <a  @click="facebookLogin" class="btn btn-outline-primary btn-outline-facebook btn-block btn-icon-text btn-rounded">
                  <i class="i-Facebook-2"></i> Sign in with Facebook
                </a>

              </div>
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
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "SignUp"
  },

  data() {
    return {
      name: "",
      email: "",
      bgImage: require("@/assets/images/photo-wide-4.jpg"),
      logo: require("@/assets/images/logo.png"),
      signInImage: require("@/assets/images/photo-long-3.jpg"),
      password: "",
      repeatPassword: "",
      submitStatus: null,
      errorMessage: null
    };
  },

  validations: {
    name: {
      required,
      minLength: minLength(4)
    },

    password: {
      required,
      minLength: minLength(5)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }

    // add input
    // peopleAdd: {
    //   required,
    //   minLength: minLength(3),
    //   $each: {
    //     multipleName: {
    //       required,
    //       minLength: minLength(5)
    //     }
    //   }
    // },
    // validationsGroup:['peopleAdd.multipleName']
  },

  computed: {
    ...mapGetters(["loggedInUser", "loading", "error"])
    
  },

  methods: {
    ...mapActions(["gmail","facebook","signUserUp"]),
    gmailLogin() {
      this.gmail();
    },
    facebookLogin() {
      this.facebook();
    },    
    //   validate form
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.signUserUp({ email: this.email, password: this.password, name:this.name });
        this.submitStatus = "PENDING";
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
    makeToast(variant = null) {
      this.$bvToast.toast("Please fill the form correctly.", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },
    makeToastTwo(variant = null) {
      this.$bvToast.toast("Successfully Created Account", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },

    inputSubmit() {
      console.log("submitted");
    }
  },
  watch: {
    loggedInUser(val) {
      if (val && val.uid && val.uid.length > 0) {
          this.submitStatus = "OK";
          //this.$router.push("/");
      
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


