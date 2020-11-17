# ewelists-web
Web application written in React. This documentation has a few basic notes, but more comprehensive documentation is available at the main repo [Ewelists](https://github.com/Ewelists/ewelists.com).

## Test Environment

Run the application locally in development mode [http://localhost:3000](http://localhost:3000):
```
npm start
```

Runs the app in development mode, but log to senty:
```
npm run start:sentry
```

Create a build for the test environment:
```
npm run build:test
```

Deploy the build to the test environment (requires aws session):
```
npm run deploy:test
```

## Cypress test Commands
Open cypress test runner:
```
npm run cypress:open
```

Run All tests from CLI:
```
npm run cypress:run:all
```

Run just smoke tests:
```
npm run cypress:run:smoke
```

Run just regression tests
```
npm run cypress:run:regression
```

Update snapshots from CLI:
```
npm run cypress:run:snapshots
```

Run a specific test from CLI:
```
npm run cypress:run:all -- --spec cypress/integration/views/edit-list.spec.js
```

Run cypress tests with a different environment:
```
npm run cypress:run:all --config-file cypress.staging.json --tag "staging"
```


## React Docs
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
