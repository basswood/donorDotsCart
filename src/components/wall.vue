<template>
<div class="wallcontain">

  <div class="main-content">
    <section class="product-cart">
    <div v-if="noData">
      <h1>No wall with that name</h1>
    </div>
    <div v-if="isLoaded">
      <h1>{{pageData.welcome}}</h1>
        <div ref="rowView" class="row">
          <div
            class="list-item col-md-6 col-lg-3 col-xl-3 mr-15 mb-15 justify-content-center"
            :key="index"
            v-for="(currDot, index) in pageData.numDots"
            transition="list"
          >
          <div class="flip-card dot-circle o-hidden mb-30 d-flex justify-content-center center">
            <div class="flip-card-inner">
              <div class="flip-card-front ">
                  <div class="dot-text-front">
                    ${{currDot}}
                  </div>
              </div>
              <div class="flip-card-back ">
                  <div class="dot-text-back">
                    <button class="btn btn-success cartButton" @click="addItem(currDot)">
                      Add to cart
                    </button>
                  </div>
              </div> 
           </div>
          </div>  
                     
          </div> <!-- end loop -->
        </div>
      </div> 

    </section>

  </div>
 
       

    </div>
</template>

<script>
import {db } from '../config/firebaseConfig';
import { mapActions } from 'vuex';

//console.log('db',db);

export default {
  name: "home",
  components: {},
  data() {
    return {
      pageData: [],
      isLoaded: false,
      noData: false
    };
  },
  methods: {
    ...mapActions(['updateDotCart']),
    addItem(dot) {
      
      // const order = {
      //   item: dot,
      //   quantity: 1,
      //   isAdd: true
      // };
      //console.log(JSON.stringify(order));
      //alert(dot);
      this.updateDotCart(dot);
    }
  },
created () {
    //console.log('route',this.$route);
    //console.log('param',this.$route.params.wall);
 //console.log(this.$route.params.wall);
     db.collection('walls').where('name', '==', this.$route.params.wall).get().then((querySnapshot) => {
        //this.loading = false
        
         if (querySnapshot.empty) {
           //console.log('empty');
            this.noData = true;
         }
        querySnapshot.forEach((doc) => {
          //console.log('doc',doc);
          let data = {
            'name': doc.data().name,
            'numDots': doc.data().numDots,
            'welcome': doc.data().welcome,
          }

          //console.log(data);
          this.pageData = data;
          //console.log(this.pageData);
          this.isLoaded = true;
        })
        
      })
    .catch(function(error) {
         console.log("Error getting documents: ", error);
     });
},

};
</script>
<style>
.o-hidden {
    overflow: hidden;
}

.dot-text-front {
  background-color: #555abf;
  color:white;
  font-size: 5.5em;
  text-align: center;
  vertical-align: middle;
  font-family: arial;
  padding-top:25%;
  height: 100%;
}
.dot-text-back {
  color:white;
  /*color: #663399;*/
  font-size: 3em;
  text-align: center;
  vertical-align: middle;
  font-family: arial;
  padding-top: 35%;
  height: 100%;
  text-align: center;
}
.dot-circle {
  border-radius: 50%;
  border: 7px solid #fff;
  box-shadow: 0 0 0 8px #555abf, 0 4px 20px 1px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.08);
}

.mb-15{
  margin-bottom: 30px;
}
.flip-card {
  background-color: transparent;
  width: 15em;
  height: 15em;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  line-height: 1.15;
  /*box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);*/
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-back {
  background: linear-gradient(150deg, #281483 15%, #8f6ed5 70%, #d782d9 94%);
  /*background-color: #9e88b5;*/
  color: white;
  transform: rotateY(180deg);
}

</style>
