import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

import Amplify, { Auth } from 'aws-amplify';
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "eu-west-1",
    userPoolId: "eu-west-1_vqox9Z8q7",
    identityPoolId: "eu-west-1:2208d797-dfc9-40b4-8029-827c9e76e029",
    userPoolWebClientId: "2effvksije4gnnrlefivcv246t",
    oauth: {
        domain: "test-ewelists.auth.eu-west-1.amazoncognito.com",
        scope: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
        redirectSignIn: "http://localhost:3000",
        redirectSignOut: "http://localhost:3000/login",
        responseType: 'code',
        options: {
            AdvancedSecurityDataCollectionFlag: false
        }
    }
  }
});

addMatchImageSnapshotCommand();

Cypress.Commands.add("login", (email, password) => {
  return Auth.signIn(email, password)
      .then(user => {
        console.log('===> user', user);

        let session = Auth.currentSession();

        console.log('===> session', session);
      })
      .catch(err => console.log('===> err', err));
})
