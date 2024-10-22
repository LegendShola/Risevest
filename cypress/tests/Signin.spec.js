import signInPage from '../pageObjects/signinPage';
const data = require('../fixtures/testData.json');

describe('User sign in process', () => {

    // Instantiate Page Objects for signInPage
    const signIn = new signInPage();

    beforeEach(() => {
        cy.visit('');
    })

    it('Verify user is able to sign in successfully', () => {

        const email = data.validEmail;
        const password = data.password;
        signIn.signIn(email, password);
        signIn.assertSuccess();

    });

    it('Verify user is unable to sign in with an wrong email address', () => {

        const email = data.wrongEmail;
        const password = data.password;
        signIn.signIn(email, password);
        signIn.assertFailure();

    });

    it('Verify user is unable to sign in with an invalid email address', () => {

        const email = data.invalidEmail;
        const password = data.password;
        signIn.signIn(email, password);
        signIn.assertInvalidEmail();

    });

    it('Verify user is unable to sign in with invalid password', () => {

        const email = data.validEmail;
        const password = data.invalidPassword;
        signIn.signIn(email, password);
        signIn.assertFailure();

    });

    it('Verify user is unable to sign in with an empty password field', () => {

        const email = data.validEmail;
        const password = data.invalidPassword;
        signIn.signInEmptyPassword(email, password);
        signIn.assertEmptyPassword();

    });

    it('Verify user is unable to sign in with an empty email field', () => {

        const email = data.validEmail;
        const password = data.password;
        signIn.signInEmptyEmail(email, password);
        signIn.assertEmptyEmail();

    });

    it('Verify user is unable to sign in with an empty email and password field', () => {

        const email = data.validEmail;
        const password = data.password;
        signIn.signInEmptyEmailAndPassword(email, password);
        signIn.assertEmptyEmail();
        signIn.assertEmptyPassword();

    });

});
