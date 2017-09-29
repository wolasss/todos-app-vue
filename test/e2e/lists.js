module.exports = function() {
	this.Given(/^I have visited "([^"]*)" page$/, function(url) {
		client.url(url);
	});

	this.Then(/^"([^"]*)" should be visible$/, function(selector) {
		client.waitForExist(selector);
		client.waitForVisible(selector);
	});

	this.Then(/^"([^"]*)" should not be visible$/, function(selector) {
		client.waitForVisible(selector, 1000, true);
	});

	this.When(/^I set value of "([^"]*)" to "([^"]*)" element$/, function(val, selector) {
		client.setValue(selector, val);
	});

	this.When(/^I click "([^"]*)" button$/, function(selector) {
		client.waitForExist(`button${selector}`);
		client.waitForVisible(`button${selector}`);
		client.click(`button${selector}`);
		client.waitForVisible(`.button.is-loading`, 1000, true);
	});

	this.Then(/^the "([^"]*)" list should be visible$/, function(name) {
		client.waitForVisible('button.is-loading', 1000, true);
		client.pause(500);

		const lists = client.getText('.list-item .name');
		const list = lists.find(l => l === name);

		if (!list) {
			throw new Error("Added list is not visible");
		}
	});

	this.Given(/^I have clicked on a "([^"]*)" list$/, function(name) {
		const list = client.element(`.list-item[name='${name}']`);

		if (list) {
			client.execute(`document.querySelector(".list-item[name='${name}']").scrollIntoView()`);
			client.moveTo(list.value.ELEMENT);
			list.click();
		} else {
			throw new Error("List cannot be found");
		}
	});

	this.Then(/^I should be redirected to the list page$/, function() {
		if (client.url().value.indexOf('list/') <= 0) {
			throw new Error('The user was not redirected to the list');
		}
	});

	this.Given(/^I have double clicked on a "([^"]*)"$/, function(selector) {
		client.waitForVisible(selector);
		client.doubleClick(selector);
	});

	this.Then(/^"([^"]*)" should have text "([^"]*)"$/, function(selector, text) {
		client.waitForExist(selector, 2000);
		client.waitForVisible('.editable-text-input', 1000, true);
		const title = client.getText(selector);

		if (typeof(title) === "string") {
			if (title !== text) {
				throw new Error("List name was not edited");
			}
		} else {
			if (!title.find(t => t === text)) {
				throw new Error("List name was not edited");
			}
		}
	});

	this.Given(/^that I am on the list page$/, function() {
		if (client.url().value.indexOf('list/') <= 0) {
			throw new Error('The user was not redirected to the list');
		}
	});

	this.Then(/^the "([^"]*)" task should be visible$/, function(name) {
		client.waitForVisible('button.is-loading', 1000, true);
		client.pause(500);
		const lists = client.getText('.task-item .editable');

		if (typeof(lists) === "string") {
			if (lists !== name) throw new Error("Added task is not visible");
		} else {
			const list = lists.find(l => l === name);
			if (!list) {
				throw new Error("Added task is not visible");
			}
		}
	});

	this.Then(/^the "([^"]*)" task should not be visible$/, function(name) {
		client.waitForVisible('button.is-loading', 1000, true);

		if (client.isExisting('.task-item .editable')) {
			const lists = client.getText('.task-item .editable', 1000, true);
			const list = lists.find(l => l === name);


			if (list) {
				throw new Error("Added task is still visible");
			}
		}
	});

	let beforeClick;

	this.When(/^I click on a "([^"]*)"$/, function(selector) {
		client.waitForExist(selector, 2000);
		client.waitForVisible(selector, 2000);
		beforeClick = client.isSelected(selector) ? 'on' : 'off';
		client.scroll(selector);
		client.click(selector);
	});

	this.Then(/^"([^"]*)" should be toggled$/, function(selector) {
		if (beforeClick === "on") {
			client.waitForSelected(selector, 2000, true);
		} else {
			client.waitForSelected(selector);
		}
	});

	this.When(/^I refresh the page$/, function() {
		client.pause(1000);
		client.refresh();
	});

	this.Then(/^I should be redirected to the home page$/, function() {
		if (!client.url().value.match(/\/$/)) {
			throw new Error('The user was not redirected to the home page');
		}
	});
};