import index_html from 'file-loader?name=index.html!./index.html'; // eslint-disable-line
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import Header from 'components/header.vue';
import Layout from 'components/layout.vue';
import List from 'components/list.vue';
import EditableText from 'components/editable-text.vue';
import Loader from 'components/loader.vue';
import ConfirmationModal from 'components/confirmation-modal.vue';
import FA from 'styles/vendor/font-awesome.css';

import routes from './routes';
import mixins from './mixins';

Vue.component('list', List);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('app-header', Header);
Vue.component('layout', Layout);
Vue.component('editable-text', EditableText);
Vue.component('loader', Loader);
Vue.component('confirmation-modal', ConfirmationModal);

document.getElementsByClassName('loading-app')[0].style.display = 'none';

const router = new VueRouter({
	mode: 'history',
	routes
});

const app = new Vue({
	router,
	el: "#app",
	render(h) {
		return h(Layout)
	}
});