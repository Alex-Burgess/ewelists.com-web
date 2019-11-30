const test = {
  apiGateway: {
    REGION: "eu-west-1",
    LISTS: "https://4sdcvv0n2e.execute-api.eu-west-1.amazonaws.com/test/lists",
    NOTFOUND: "https://pff49212ai.execute-api.eu-west-1.amazonaws.com/test/notfound",
    PRODUCTS: "https://4cu83a3xga.execute-api.eu-west-1.amazonaws.com/test/products",
    CONTACT: "https://dond3owxm5.execute-api.eu-west-1.amazonaws.com/test/contact"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_vqox9Z8q7",
    APP_CLIENT_ID: "2effvksije4gnnrlefivcv246t",
    IDENTITY_POOL_ID: "eu-west-1:2208d797-dfc9-40b4-8029-827c9e76e029",
    DOMAIN: "test-ewelists.auth.eu-west-1.amazoncognito.com",
    SCOPE: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
    REDIRECTSIGNIN: "http://localhost:3000",
    REDIRECTSIGNOUT: "http://localhost:3000/login",
    RESPONSETYPE: 'code',
  },
  imagePrefix: "https://test.ewelists.com"
};

const staging = {
  apiGateway: {
    REGION: "eu-west-1",
    LISTS: "https://yawecld0ag.execute-api.eu-west-1.amazonaws.com/staging/lists",
    NOTFOUND: "https://jnbwllwjwl.execute-api.eu-west-1.amazonaws.com/staging/notfound",
    PRODUCTS: "https://p0ugkk400f.execute-api.eu-west-1.amazonaws.com/staging/products",
    CONTACT: "https://gwwqb70lka.execute-api.eu-west-1.amazonaws.com/staging/contact"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_Le825O3Pt",
    APP_CLIENT_ID: "5tmme79b0m94mp3i87e300piqp",
    IDENTITY_POOL_ID: "eu-west-1:704a4a75-e23e-4b9f-b7b1-ad7113e9c28d",
    DOMAIN: "staging-ewelists.auth.eu-west-1.amazoncognito.com",
    SCOPE: ['email', 'profile', 'aws.cognito.signin.user.admin', 'openid'],
    REDIRECTSIGNIN: "https://staging.ewelists.com",
    REDIRECTSIGNOUT: "https://staging.ewelists.com/login",
    RESPONSETYPE: 'code',
  },
  imagePrefix: ""
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
  imagePrefix: ""
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
