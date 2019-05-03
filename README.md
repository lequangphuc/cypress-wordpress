# cypress-wordpress
Cypress helper commands for WordPress.

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/lequangphuc/cypress-wordpress/blob/master/LICENSE)
[![version](https://img.shields.io/badge/version-1.0.0-red.svg)](https://github.com/lequangphuc/cypress-wordpress)

## Table of Contents

- [Get Started](#get-started)
- [Usage](#usage)
  - [Example](#example)
  - [Writing Your First Test](#writing-your-first-test)
- [License](#license)

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

cy.visit('wp-admin/edit.php?post_type=page').
deletePost('Hello World');

cy.visit('wp-admin/edit.php?post_type=product').
viewPost('WooCommerce Product');

cy.getUrlStatus({
    url: 'wp-content/redirect.php',
    status: 301
});

cy.requestPrivateUrl({
    url: 'wp-content/avatar.png',
    isPermission: false
});

cy.createAccount({
    username: 'phuclq',
    password: '$P$B2JvYconDNTLqH9',
    role: 'subscriber'
});

cy.deactivatePlugin('Prevent Direct Access Gold');

cy.activatePlugin('Protect Pages & Posts Gold');

cy.installPlugin('plugin/prevent_direct_access_gold.zip');

```

### Writing Your First Test

```javascript
describe('My First Test', () => {

    it('Cypress WordPress', () => {
        cy.login({
            username: 'admin2',
            password: '123456'
        }).
        createPage('Hello World', 'My first post').
        visit('wp-admin/edit.php?post_type=page').
        viewPost('Hello World').
        url().should('include', 'hello-world').
        get('h1.entry-title').
        should('contain', 'Hello World');
    });

});
```

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
