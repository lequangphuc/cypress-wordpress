# cypress-wordpress
Cypress helper commands for WordPress

## Get Started

`cypress-wordpress` extends Cypress' `cy` command.

Add this line to your project's `cypress/support/commands.js`:

```
import 'cypress-wordpress/commands/cy-wordpress';
```

## Usage

### Example

```javascript
cy.login({
    username: 'administrator',
    password: '123456'
});

cy.uploadFile('file/avatar.png');

cy.deleteFile('avatar');

cy.bulkActions('delete');

cy.createPage('Hello World', 'This is example content');

cy.deletePost({
    title: 'Hello World',
    postType: 'page',
});

cy.viewPost({
    title: 'Sample Product',
    postType: 'product'
});

cy.requestUrl({
    url: 'wp-content/redirect.php',
    status: 301
});

cy.requestPrivateUrl({
    url: 'wp-content/avatar.png',
    isPermission: true
});

cy.createAccount({
    username: 'phuclq',
    password: '$P$B2JvYconDNTLqHEP9',
    role: 'subscriber'
});

cy.deactivatePlugin('Prevent Direct Access Gold');

cy.activatePlugin('Protect Pages & Posts Gold');

cy.installPlugin('plugin/prevent_direct_access_gold.zip');

```

### Writing Your First Test

```javascript
describe('My First Test', () {

    it('Cypress WordPress', () {
        cy.login({
            username: 'admin2',
            password: '123456'
        }).
        createPage('Hello World', 'My first post').
        viewPost({
            title: 'Hello World',
            postType: 'page'
        }).
        url().should('include', 'hello-world').
        get('h1.entry-title').
        should('contain', 'Hello World');
    });

});
```