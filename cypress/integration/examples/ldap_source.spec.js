/**
 * created @ 3/14/2019 11:05 AM
 * with WebStorm
 * by Mohamed Rihan <rihan.info@gmail.com>
 * for tnexus-ui-beta-3
 */

context('Ldap Source Test', () => {

    before(() => {
        cy.login({userType: 'admin'}).then(_ => {
            cy.wait(1000).then(_ => {
                cy.get('a[href="/ldap/sources"]').click({force: true})
            })
        })
    })

    it('Should add topic', () => {
        cy.get('.admin--add-btn').click()
        cy.get('input[name="name"]')
            .type('e2e-test').should('have.value', 'e2e-test')
        cy.get('input[name="organization"]')
            .type('emiratesDubai.com').should('have.value', 'emiratesDubai.com')
        cy.get('div[name="type"]').click()
        cy.get('div[role="menu"]').contains('Simple Linux LDAP').click()

        cy.get('input[name="userAttribute"]')
            .type('Uid').should('have.value', 'Uid')

        cy.get('input[name="userClass"]')
            .type('user').should('have.value', 'user')

        cy.get('input[name="baseDn"]')
            .type('dc=dtp,dc=local').should('have.value', 'dc=dtp,dc=local')

        cy.get('input[name="userDn"]')
            .type('ou=sol,dc=dtp,dc=local').should('have.value', 'ou=sol,dc=dtp,dc=local')

        cy.get('input[name="bindDn"]')
            .type('cn=ldapadm,dc=dtp,dc=local').should('have.value', 'cn=ldapadm,dc=dtp,dc=local')

        cy.get('input[name="objectClass"]')
            .type('posixAccount').should('have.value', 'posixAccount')

        cy.get('input[name="bindCredential"]')
            .type('ldap@pass1').should('have.value', 'ldap@pass1')

        cy.get('input[name="connectionUrl"]')
            .type('ldap://192.168.102.205').should('have.value', 'ldap://192.168.102.205')

        cy.get('input[name="connectionPort"]')
            .type('389').should('have.value', '389')

        cy.get('input[name="tested"]').click()
            .wait(5000)
      // cy.get('#save').click()
       // cy.wait(6000)
       //cy.reload()
    })

    // it('Should edit topic', () => {
    //     cy.wait(4000)
    //     cy.get('.ag-body-viewport .e2e-test').first().click({force: true})
    //     cy.wait(4000)
    //     cy.get('#edit').click()
    //     cy.get('input[name="name"]')
    //         .type('1').should('have.value', 'e2e-test1')
    //     cy.get('#save').click()
    // })

    // it('Should delete Source', () => {
    //     cy.get('.ag-body-viewport .e2e-test1').first().click({force: true})
    //     cy.wait(2000)
    //     cy.get('#delete').click()
    //     cy.wait(5000)
    //     cy.get('div[class="dialog-delete"]').contains('Delete').click()
    // })

})

//col-id="name"