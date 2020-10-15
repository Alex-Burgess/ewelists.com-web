const test = {
  apiGateway: {
    REGION: "eu-west-1",
    LISTS: "https://gud7ku7zf6.execute-api.eu-west-1.amazonaws.com/test/lists",
    NOTFOUND: "https://5w37xs4dnf.execute-api.eu-west-1.amazonaws.com/test/notfound",
    PRODUCTS: "https://u9guul2t42.execute-api.eu-west-1.amazonaws.com/test/products",
    CONTACT: "https://fsl437n0mb.execute-api.eu-west-1.amazonaws.com/test/contact"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_LW335q3ga",
    APP_CLIENT_ID: "57l6m89od9d2s2vsjflig7dtkb",
    IDENTITY_POOL_ID: "eu-west-1:bcadf81b-b117-4879-af06-9303deba01df",
    DOMAIN: "test-ewelists.auth.eu-west-1.amazoncognito.com",
    SCOPE: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
    REDIRECTSIGNIN: "http://localhost:3000",
    REDIRECTSIGNOUT: "http://localhost:3000/login",
    RESPONSETYPE: 'code',
  },
  imagePrefix: "https://test.ewelists.com",
  rootDomain: "https://test.ewelists.com",
  sentry: "https://d8b578cadd2a449eb20814921c4de6bf@o393405.ingest.sentry.io/5244580",
  ga: "UA-168019304-3",
  facebookDesktopUrl: "https://www.facebook.com/dialog/send",
  facebookAppId: "1053511994854271"
};

const staging = {
  apiGateway: {
    REGION: "eu-west-1",
    LISTS: "https://1t9bk9chy6.execute-api.eu-west-1.amazonaws.com/staging/lists",
    NOTFOUND: "https://9il4415hr2.execute-api.eu-west-1.amazonaws.com/staging/notfound",
    PRODUCTS: "https://pylbx9egxj.execute-api.eu-west-1.amazonaws.com/staging/products",
    CONTACT: "https://97lx3orrxf.execute-api.eu-west-1.amazonaws.com/staging/contact"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_GhBKej6to",
    APP_CLIENT_ID: "53055ln8c1vmejj56pe7j8tqa3",
    IDENTITY_POOL_ID: "eu-west-1:049fcad6-1b09-4d60-bfa4-6ce8115a5db5",
    DOMAIN: "staging-ewelists.auth.eu-west-1.amazoncognito.com",
    SCOPE: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
    REDIRECTSIGNIN: "https://staging.ewelists.com",
    REDIRECTSIGNOUT: "https://staging.ewelists.com/login",
    RESPONSETYPE: 'code',
  },
  imagePrefix: "",
  rootDomain: "https://staging.ewelists.com",
  sentry: "https://07023ac975a14c6abb70d9d6a48e2255@o393405.ingest.sentry.io/5244570",
  ga: "UA-168019304-1",
  facebookDesktopUrl: "https://www.facebook.com/dialog/send",
  facebookAppId: "1053511994854271"
};

const prod = {
  apiGateway: {
    REGION: "eu-west-1",
    LISTS: "https://0q9l8rzjga.execute-api.eu-west-1.amazonaws.com/prod/lists",
    NOTFOUND: "https://lnsfi2fo7i.execute-api.eu-west-1.amazonaws.com/prod/notfound",
    PRODUCTS: "https://rd7ynfvepb.execute-api.eu-west-1.amazonaws.com/prod/products",
    CONTACT: "https://i3dvu042be.execute-api.eu-west-1.amazonaws.com/prod/contact"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_8aOIk3Jcv",
    APP_CLIENT_ID: "332d51kavmed0afpk2li1plv19",
    IDENTITY_POOL_ID: "eu-west-1:f983160e-926c-47a7-a9a8-6dbceb68edbb",
    DOMAIN: "ewelists.auth.eu-west-1.amazoncognito.com",
    SCOPE: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
    REDIRECTSIGNIN: "https://ewelists.com",
    REDIRECTSIGNOUT: "https://ewelists.com/login",
    RESPONSETYPE: 'code',
  },
  imagePrefix: "",
  rootDomain: "https://ewelists.com",
  sentry: "https://c5ce6fba823641b8be4c628d42133e57@o393405.ingest.sentry.io/5242440",
  ga: "UA-168019304-2",
  facebookDesktopUrl: "https://www.facebook.com/dialog/send",
  facebookAppId: "1053511994854271"
};

var config;
switch (process.env.REACT_APP_STAGE) {
  case "prod":
    console.log("Config: prod");
    config = prod;
    config['environment'] = "prod";
    break;
  case "staging":
    console.log("Config: staging");
    config = staging;
    config['environment'] = "staging";
    break;
  case "test":
    console.log("Config: test");
    config = test;
    config['environment'] = "test";
    break;
  default:
    console.log("Config: test (localhost)");
    config = test;
    config['environment'] = "test";
    config['rootDomain'] = "http://localhost:3000";
    break;
}

export default {
  // Add common config values here
  ...config
};
