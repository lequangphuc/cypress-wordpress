require('cypress-testing-library/add-commands');

Cypress.Commands.add('inputFile', (selector, fileUrl, type = '') => {
  return cy.get(selector).then(subject => {
    return cy.fixture(fileUrl, 'base64').
      then(Cypress.Blob.base64StringToBlob).
      then(blob => {
        return cy.window().then(win => {
          const el = subject[0];
          const nameSegments = fileUrl.split('/');
          const name = nameSegments[nameSegments.length - 1];
          const testFile = new win.File([blob], name, { type });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
          return subject;
        });
      });
  });
});

Cypress.Commands.add('login', ({ username, password }) => {
  cy.visit('/wp-admin').
  get('#user_login').invoke('attr', 'value', username).
  get('#user_pass').invoke('attr', 'value', password).
  get('#loginform').submit().wait(1000);
});

Cypress.Commands.add('uploadFile', () => {
  cy.visit('/wp-admin/media-new.php?browser-uploader').
  inputFile('#async-upload', imageLocation).
  get('#html-upload').click().
  visit('/wp-admin/upload.php?mode=list');
});

Cypress.Commands.add('deleteFile', (fileName) => {
  cy.visit('/wp-admin/upload.php?mode=list').
  get(`a[aria-label="Delete “${fileName}” permanently"]`).
  click({ force: true, multiple: true });
});

Cypress.Commands.add('editFile', (fileName) => {
  cy.visit('/wp-admin/upload.php?mode=list').
  get(`a[aria-label="Edit “${fileName}”"]`).
  click({ force: true });
});

Cypress.Commands.add('bulkActions', (selector) => {
  cy.get('#cb-select-all-1').click().
  get('#bulk-action-selector-top').select(selector).
  get('#doaction').click();
});

Cypress.Commands.add('createPost', (header, content) => {
  content = content || 'default';
  cy.visit('/wp-admin/post-new.php').
  get('#title').type(header).
  get('#content-html').click().
  get('#content').type(content).wait(1000).
  get('#publish').wait(500).click().wait(1500);
});

Cypress.Commands.add('createPage', (header, content) => {
  content = content || 'default';
  cy.visit('/wp-admin/post-new.php?post_type=page').
  get('#title').type(header).
  get('#content-html').click().
  get('#content').type(content).wait(1000).
  get('#publish').wait(500).click().wait(1500);
});

Cypress.Commands.add('deletePost', ({ title, postType }) => {
  postType = postType || 'post';
  cy.visit(`wp-admin/edit.php?post_type=${postType}`).
  get(`a[aria-label="Move “${title}” to the Trash"]`).
  click({force: true , multiple: true });
});

Cypress.Commands.add('editPost', ({ title, postType }) => {
  postType = postType || 'post';
  cy.visit(`wp-admin/edit.php?post_type=${postType}`).
  get(`a[aria-label="Edit “${title}”"]`).
  click({ force: true });
});

Cypress.Commands.add('createCategory', (title, parent) => {
  parent = parent || 'None';
  cy.visit('/wp-admin/edit-tags.php?taxonomy=category').
  get('#tag-name').type(title).
  get('#parent').select(parent).
  get('#submit').click().wait(500);
});

Cypress.Commands.add('deleteCategory', (name) => {
  cy.visit('/wp-admin/edit-tags.php?taxonomy=category').
  get(`a[aria-label="Delete “${name}”"]`).
  click({force: true , multiple: true });
});

Cypress.Commands.add('deleteAllCategories', () => {
  cy.visit('/wp-admin/edit-tags.php?taxonomy=category').
  get('#cb-select-all-1').click().
  get('#bulk-action-selector-top').select('delete').
  get('#doaction').click().wait(500);
});

Cypress.Commands.add('logoutWpAdmin', () => {
  cy.get('#wpadminbar > a').contains('Log Out').
  click({ force: true }).wait(500);
});

Cypress.Commands.add('requestUrl', (url, status) => {
  cy.request({
    url: url,
    followRedirect: false,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(status);
  })
});

Cypress.Commands.add('requestPrivateUrl', ({ url, isPermission = true }) => {
  cy.request({
    url: url,
    followRedirect: false,
    failOnStatusCode: false,
  }).then((response) => {
    (isPermission) ? expect(response.status).to.eq(200)
                   : expect(response.status).to.eq(404);
  })
});

Cypress.Commands.add('deactivatePlugin', (plugin) => {
  cy.visit('wp-admin/plugins.php?plugin_status=active').
  get(`a[aria-label="Deactivate ${plugin}"]`).
  click().wait(1000);
});

Cypress.Commands.add('activatePlugin', (plugin) => {
  cy.visit('wp-admin/plugins.php?plugin_status=inactive').
  get(`a[aria-label="Activate ${plugin}"]`).
  click().wait(1000);
});

Cypress.Commands.add('deletePlugin', (plugin) => {
  cy.visit('wp-admin/plugins.php?plugin_status=inactive').
  get(`a[aria-label="Delete ${plugin}"]`).
  click().wait(1000);
});

Cypress.Commands.add('installPlugin', (pluginFile) => {
  cy.visit('wp-admin/plugin-install.php').
  get('.upload-view-toggle').click().
  inputFile('#pluginzip', pluginFile).
  get('#install-plugin-submit').click().wait(2000);
});