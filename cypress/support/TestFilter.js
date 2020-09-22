/// <reference types="Cypress" />

const TestFilter = (definedTags, runTest) => {
  if (Cypress.env('TEST_TAGS')) {
    const tags = Cypress.env('TEST_TAGS').split(',');
    const isFound = definedTags.some((definedTag) => tags.includes(definedTag));

    if (isFound) {
      runTest();
    }
  } else {
    // No tags present, could be ui test runner, or just wanted to run all tests.
    runTest();
  }
};

export default TestFilter;
