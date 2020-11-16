<template>
  <div>
    <stripe-elements
      ref="elementsRef"
      :pk="publishableKey"
      :amount="amount"
      
      @token="tokenCreated"
      @loading="loading = $event"
    >
    </stripe-elements>
    <button @click="submit">Pay ${{amount / 100}}</button>
  </div>
</template>

<script>
import {db } from '../config/firebaseConfig';
import { StripeElements } from 'vue-stripe-checkout';
export default {
  components: {
    StripeElements
  },
  data: () => ({
    loading: false,
    amount: 1,
    publishableKey: 'pk_test_oPkCYTidJmEpMDedmeGI03N900ZCtq8tS7', 
    token: null,
    charge: null,
    description: 'Donor Dot Charge'
  }),
  methods: {
    submit () {
      this.$refs.elementsRef.submit();
    },
    tokenCreated (token) {
        console.log('token-->',token);
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        currency: 'usd',
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer (charge) {
      // Send to charge to your backend server to be processed
      // Documentation here: https://stripe.com/docs/api/charges/create
        console.log('charge-->',charge);
        
        const chargesRef = db.collection("charges")
        const pushId = chargesRef.doc().id
        db.collection("charges").doc(pushId).set(charge)
    }

  }
}
</script>
