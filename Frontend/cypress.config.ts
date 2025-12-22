import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:4200',
    setupNodeEvents() {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
