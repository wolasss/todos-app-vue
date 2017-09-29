import Vue from 'vue';

export default {
	getAll: function(listId) {
		return Vue.http.get(`${process.env.api_url}/todolists/${listId}`).then((response) => response.body);
	},
	save: function(task) {
		return Vue.http.post(`${process.env.api_url}/todos/`, task).then((response) => {
			return response.body;
		});
	},
	remove: function(id) {
		return Vue.http.delete(`${process.env.api_url}/todos/${id}`);
	},
	toggle: function(task) {
		return Vue.http.put(`${process.env.api_url}/todos/${task.id}/`, task);
	},
	update: function(task) {
		return Vue.http.put(`${process.env.api_url}/todos/${task.id}/`, task);
	}
}