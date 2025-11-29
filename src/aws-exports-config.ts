// import { Amplify } from "aws-amplify";
// import awsconfig from "./aws-exports";

// Amplify.configure(awsconfig);

// export default Amplify;
import { Amplify } from "aws-amplify";

const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_b1zQPLRxx",
      userPoolClientId: "5vl7p8d8nul36mu331p1364llt",
      identityPoolId: "us-east-1:054761bb-6f9b-4733-a9fc-b761dd3b6dc9",
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint:
        "https://nwbcv32rg5furd2nz3x4qk2xi4.appsync-api.us-east-1.amazonaws.com/graphql",
      region: "us-east-1",
      defaultAuthMode: "userPool", // Use Cognito User Pools authentication
    },
  },
};

Amplify.configure(awsconfig);

export default Amplify;
