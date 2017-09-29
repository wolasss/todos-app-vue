import Vue from 'vue';
Vue.mixin({
	methods: {
		getTitle: function(title) {
			if (title.length < process.env.title_max_length) {
				return title;
			}

			return `${title.slice(0, process.env.title_max_length)}...`;
		}
	}
})