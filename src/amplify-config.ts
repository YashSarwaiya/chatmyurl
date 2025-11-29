import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { sessionStorage } from "aws-amplify/utils";

// Configure token storage
cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

const config = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_b1zQPLRxx",
      userPoolClientId: "5vl7p8d8nul36mu331p1364llt",
      loginWith: {
        email: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint:
        "https://nwbcv32rg5furd2nz3x4qk2xi4.appsync-api.us-east-1.amazonaws.com/graphql",
      region: "us-east-1",
      defaultAuthMode: "apiKey",
      apiKey: "da2-umu4m6cwy5bg5dykzcvwvq6qym",
    },
  },
};

Amplify.configure(config, { ssr: false });

export default config;
