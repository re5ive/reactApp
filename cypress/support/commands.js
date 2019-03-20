// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', ({client, userType}) => {
	const types = {
		admin: {
			username: 'admin',
			password: 'dtp@123456',
			client: client || 'DXB'
		},
		test: {
			name: 'test',
			password: 'dtp@123456',
			client: client || 'DXB'
		}
	}
	// get user type
	const user = types[userType]
	cy.visit('http://localhost:3000')
	cy.get('input[name="username"]').clear()
		.type(user.username)
	cy.get('input[name="password"]').clear()
		.type(user.password)
	cy.get('input[name="client"]').clear()
		.type(user.client)
	cy.get('.login--btn').click()
})

Cypress.Commands.add('selectAgGridRow', () => {
	return cy.get('.ag-body-viewport .ag-row-level-0').first().click({force: true})
})

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
