import Store from './components/Store.vue';
import Checkout from './components/Checkout.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import ProductDetails from './components/ProductDetails.vue';
import Login from './components/auth/signIn.vue';
import Register from './components/auth/Register.vue';
import Wall from './components/wall.vue';

export const routes = [
	{
		path: '/', 
		component: Store, 
		name: 'mainpage'
	},
	{
		path: '/product/:id', 
		component: ProductDetails, 
		name: 'product'
	},
	{
		path: '/wall/:wall', 
		component: Wall, 
		name: 'wall'
	},
	{
		path: '/checkout', 
		component: Checkout, 
		name: 'Checkout'
	},	
	{
		path: '/cart', 
		component: ShoppingCart, 
		name: 'shoppingcart'
	},
	{
		path: '/login', 
		component: Login, 
		name: 'login', 
		onlyGuest: true 
	},
	{
		path: '/register', 
		component: Register, 
		name: 'register', 
		onlyGuest: true
	},
	{
		path: '*', 
		redirect: '/' 
	}
];