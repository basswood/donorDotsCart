import Vue from 'vue';
import Vuex from 'vuex';

import cart from './modules/cart';
import products from './modules/products';
import auth from './modules/auth';
import messages from './modules/messages';

import * as actions from './actions';
import authData from "./authData";

Vue.use(Vuex);

export default new Vuex.Store({
	actions,
	modules: {
		auth,
		authData,
		cart,
		products,
		messages
	}
});