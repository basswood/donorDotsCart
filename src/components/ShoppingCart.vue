<template>
  <div class="container table-responsive">
    <table id="cart" class="table table-hover table-sm">
      <thead>
        <tr>
          <th style="width:50%">Dot</th>
          <th style="width:10%">Price</th>
          
        </tr>
      </thead>



          <tr
            class=""
            :key="index"
            v-for="(currDot, index) in cartDotList"
            transition="list"
          >
            <td data-th="Dot">${{currDot.item}} Dot</td>
            <td data-th="Price">${{currDot.item.toFixed(2)}}</td>
          </tr>
      

      <tfoot>

        <tr>
          <td>
            <!--<button class="btn btn-warning" @click="saveShoppingCartLocal">
              <i class="fa fa-angle-left"></i> Save and Continue Shopping
            </button>-->
          </td>
          
          <td class="d-none d-sm-table-cell">
            <strong>Fees ${{ (cartTotalValue-cartValue).toFixed(2) }}</strong><br/>
            <strong>Total ${{ cartTotalValue }}</strong>
          </td>
          <td class="px-0">
            <button class="btn btn-success" @click="checkout">
              <span class="text-nowrap"
                >Checkout <i class="fa fa-angle-right d-inline"></i
              ></span>
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
//import CartItem from './cart/CartItem.vue'
export default {
  computed: {
    ...mapGetters([
      'cartItemList',
      'cartDotList',
      'isLoggedIn',
      'products',
      'currentUser',
      'cartValue',
      'cartTotalValue',
    ]),
    
    
  },
  components: {
    //appCartItem: CartItem,
  },

  methods: {
    ...mapActions([
      'saveShoppingCart',
      'addMessage',
      'saveToTransaction',
      'clearCart',
    ]),
    checkValidCart(itemList, prodList) {
      let isValid = true
      let message = ''

      itemList.map((item) => {
        for (let prodIdx = 0; prodIdx < prodList.length; prodIdx++) {
          if (prodList[prodIdx].id == item.id) {
            if (prodList[prodIdx].quantity < item.quantity) {
              message = `Only ${prodList[prodIdx].quantity} ${item.title} available in stock`
              isValid = false
              return
            }
            break
          }
        }
      })
      return {
        isValid,
        message,
      }
    },
    saveShoppingCartLocal() {
      if (this.isLoggedIn) {
        let { isValid, message } = this.checkValidCart(
          this.cartItemList,
          this.products
        )

        if (isValid) {
          this.saveShoppingCart({
            cartItemList: this.cartItemList,
            uid: this.currentUser.uid,
          }).then(() => {
            this.addMessage({
              messageClass: 'success',
              message: 'Your shopping cart is saved successfully',
            })
            this.$router.push('/')
          })
        } else {
          this.addMessage({
            messageClass: 'danger',
            message: message,
          })
        }
      } else {
        this.addMessage({
          messageClass: 'warning',
          message: 'Please login to save your cart',
        })
      }
    },
    checkout() {
      
        if (!this.cartDotList || this.cartDotList.length == 0) {
          this.addMessage({
            messageClass: 'warning',
            message: 'Your cart is empty!',
          })
          return
        }
        let { isValid, message } = this.checkValidCart(
          this.cartItList,
          this.products
        )

        if (isValid) {
          this.saveToTransaction({
            cartDotList: this.cartDotList,
            uid: this.currentUser.uid,
          }).then(() => {
            this.addMessage({
              messageClass: 'success',
              message: 'Your order has been successfully processed!',
            })
            this.saveShoppingCart({
              cartItemList: [],
              uid: this.currentUser.uid,
            })
            this.clearCart()
            this.$router.push('/')
          })
        } else {
          this.addMessage({
            messageClass: 'danger',
            message: message,
          })
        }

    },
  },
}
</script>

<style lang="scss" scoped>
.list-shopping-cart-leave-active {
  transition: all 0.4s;
}

.list-shopping-cart-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.table-sm {
  font-size: 0.875rem;
  ::v-deep h4 {
    font-size: 1.25rem;
  }
}
</style>
