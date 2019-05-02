# cypress-wordpress
Cypress helper commands for WordPress

## Usage

`cypress-wordpress` extends Cypress' `cy` command.

Add this line to your project's `cypress/support/commands.js`:

```
import 'cypress-wordpress/commands/cy-wordpress';
```

## Example

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
