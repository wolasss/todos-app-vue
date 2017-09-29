import Vue from 'vue';

export default {
	get: function(id) {
		return Vue.http.get(`${process.env.api_url}/todolists/`).then((response) => Promise.resolve(response.body.find(t => t.id == id)));
	},
	getAll: function() {
		return Vue.http.get(`${process.env.api_url}/todolists/`).then((response) => {
			return response.body;
		});
	},
	update: function(id, name) {
		return Vue.http.put(`${process.env.api_url}/todolists/${id}/`, {
			name
		});
	},
	remove: function(id, name) {
		return Vue.http.delete(`${process.env.api_url}/todolists/${id}/`, {
			name
		});
	},
	save: function(name) {
		return Vue.http.post(`${process.env.api_url}/todolists/`, {
			name
		}).then((response) => {
			return response.body;
		});
	}
}