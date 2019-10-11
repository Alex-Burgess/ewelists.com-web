const test = {
  apiGateway: {
    REGION: "eu-west-1",
    LISTS: "https://4sdcvv0n2e.execute-api.eu-west-1.amazonaws.com/test/lists"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_vqox9Z8q7",
    APP_CLIENT_ID: "61pt55apuqgj2jgbsfjmj1efn8",
    IDENTITY_POOL_ID: "eu-west-1:2208d797-dfc9-40b4-8029-827c9e76e029",
    DOMAIN: "test-ewelists.auth.eu-west-1.amazoncognito.com",
    SCOPE: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
    REDIRECTSIGNIN: "http://localhost:3000",
    REDIRECTSIGNOUT: "http://localhost:3000/login",
    RESPONSETYPE: 'code',
  }
};

const staging = {
  apiGateway: {
    REGION: "eu-west-1",
    LIST: "https://yawecld0ag.execute-api.eu-west-1.amazonaws.com/staging/lists"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_Le825O3Pt",
    APP_CLIENT_ID: "g25ievgqbf4qtds8rik01i4md",
    IDENTITY_POOL_ID: "eu-west-1:704a4a75-e23e-4b9f-b7b1-ad7113e9c28d",
    DOMAIN: "staging-ewelists.auth.eu-west-1.amazoncognito.com",
    SCOPE: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
    REDIRECTSIGNIN: "https://staging.ewelists.com",
    REDIRECTSIGNOUT: "https://staging.ewelists.com/login",
    RESPONSETYPE: 'code',
  }
};

const prod = {
  apiGateway: {
    REGION: "eu-west-1",
    LIST: ""
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_8aOIk3Jcv",
    APP_CLIENT_ID: "251cvv5788hrieja107ciik223",
    IDENTITY_POOL_ID: "eu-west-1:f983160e-926c-47a7-a9a8-6dbceb68edbb",
    DOMAIN: "ewelists.auth.eu-west-1.amazoncognito.com",
    SCOPE: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
    REDIRECTSIGNIN: "https://ewelists.com",
    REDIRECTSIGNOUT: "https://ewelists.com/login",
    RESPONSETYPE: 'code',
  }
};

const environment = process.env.REACT_APP_STAGE;
console.log("Environment: " + environment);
var config;
switch (environment) {
  case "prod":
    console.log("Config: prod");
    config = prod;
    break;
  case "staging":
  console.log("Config: staging");
  config = staging;
    break;
  default:
    console.log("Config: test");
    config = test;
    break;
}

export default {
  // Add common config values here
  ...config
};
