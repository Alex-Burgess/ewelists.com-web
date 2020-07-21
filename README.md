# ewelists-web
Web application written in React. This documentation has a few basic notes, but more comprehensive documentation is available at the main repo [Ewelists](https://github.com/Alex-Burgess/ewelists.com).

## React Docs
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `REACT_APP_SENTRY=true npm run build`

Runs the app in development mode, but logs to senty.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for a local/test environment to the `build` folder.

### `REACT_APP_STAGE=staging npm run build`

Builds the application for staging environment.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## UI and E2E Cypress tests
Run All tests:
```
npx cypress run --headless --browser chrome
```

Run a specific test:
```
npx cypress run --spec "cypress/integration/about.spec.js" --headless --browser chrome
```

Update snapshots:
```
CYPRESS_updateSnapshots=true npx cypress run --headless --browser chrome
```
