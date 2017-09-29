import Home from './pages/home.vue';
import List from './pages/list.vue';
import PageNotFound from './pages/404.vue';

export default [{
	path: "/",
	name: 'home',
	component: Home
}, {
	path: "/list/:id",
	name: 'list',
	component: List
}, {
	path: "*",
	component: PageNotFound
}];