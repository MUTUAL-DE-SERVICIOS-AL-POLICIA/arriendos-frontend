import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://192.168.2.136:9001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
