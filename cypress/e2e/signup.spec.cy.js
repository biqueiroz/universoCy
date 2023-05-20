

describe('cadastro', function () {

    context('quando o usuário é novato', function(){
        const user = {
            name: 'Bianca Queiroz',
            email: 'biancagqueiroz@putsbox.com',
            password: 'Teste123'
        }

        before(function(){
            cy.task('removeUser', user.email)
            .then(function (result) {
                console.log(result)
            })
        })

        it('deve cadastrar com sucesso', function () {
            cy.visit('/signup')
    
            cy.get('input[placeholder="Nome"]').type(user.name)
            cy.get('input[placeholder="E-mail"]').type(user.email)
            cy.get('input[placeholder="Senha"]').type(user.password)
    
            // cy.intercept('POST', '/users', {
            //     statusCode: 200
            // }).as('postUser')
    
            cy.contains('button', 'Cadastrar').click()
    
            // cy.wait('@postUser')
    
            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })
  

    context('quando o email já existe', function(){
        const user = {
            name: 'Ana Queiroz',
            email: 'anaxxqueiroz@putsbox.com',
            password: 'Teste123',
            is_provider: true
        }

        before(function(){
            cy.task('removeUser', user.email)
            .then(function (result) {
                console.log(result)
            })
    
            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function(response){
                expect(response.status).to.eq(200)
            })
        })

        it('não deve cadastrar o usuário', function () {
            cy.visit('/signup')
    
            cy.get('input[placeholder="Nome"]').type(user.name)
            cy.get('input[placeholder="E-mail"]').type(user.email)
            cy.get('input[placeholder="Senha"]').type(user.password)
    
            cy.contains('button', 'Cadastrar').click()
    
            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Email já cadastrado para outro usuário.')
        })
    })
})