Feature: 
	Scenario: Adding a list
		Given I have visited "http://localhost:8080/" page
		Then ".input-add-element" should be visible
		When I set value of "e2e:test" to ".input-add-element" element
		And I click ".button-add-element" button
		Then the "e2e:test" list should be visible
	
	Scenario: Visiting a list
		Given I have clicked on a "e2e:test" list
		Then I should be redirected to the list page

	Scenario: Editing list name
		Given I have double clicked on a ".list-title .editable"
		Then ".editable-text-input" should be visible
		When I set value of "e2e:test edited" to ".editable-text-input" element
		And I click ".editable-text-button" button
		Then ".list-title .editable" should have text "e2e:test edited"
		And ".editable-text-input" should not be visible

	Scenario: Adding task
		Given that I am on the list page
		Then ".input-add-element" should be visible
		When I set value of "e2e:task" to ".input-add-element" element
		And I click ".button-add-element" button
		Then the "e2e:task" task should be visible

	Scenario: Editing task name
		Given I have double clicked on a ".task-title .editable"
		Then ".editable-text-input" should be visible
		When I set value of "e2e:task edited" to ".editable-text-input" element
		And I click ".editable-text-button" button
		Then ".task-title .editable" should have text "e2e:task edited"
		And ".editable-text-input" should not be visible

	Scenario: Toggling task completeness
		Given that I am on the list page
		When I click on a "[name='e2e:task edited'] .task-checkbox"
		Then "[name='e2e:task edited'] .task-checkbox" should be toggled
		When I refresh the page
		Then "[name='e2e:task edited'] .task-checkbox" should be toggled

	Scenario: Removing task
		Given that I am on the list page
		When I click on a "[name='e2e:task edited'] .button-delete"
		Then ".modal.is-active" should be visible
		When I click ".button-confirm" button
		Then ".modal.is-active" should not be visible
		Then the "e2e:task edited" task should not be visible
	
	Scenario: Removing list
		Given that I am on the list page
		When I click on a ".button-delete-list"
		Then ".modal.is-active" should be visible
		When I click on a ".modal.is-active .button-confirm"
		Then ".modal.is-active" should not be visible
		Then I should be redirected to the home page