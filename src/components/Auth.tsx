import { Authenticator, useTheme, View, Text } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text
          fontSize={tokens.fontSizes.xxl}
          fontWeight={tokens.fontWeights.bold}
        >
          URL Chat Extension
        </Text>
        <Text color={tokens.colors.neutral[60]}>
          Chat with others on the same webpage
        </Text>
      </View>
    );
  },
};

const formFields = {
  signUp: {
    username: {
      label: "Username",
      placeholder: "Enter your username",
      isRequired: true,
      order: 1,
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
      isRequired: true,
      order: 2,
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      isRequired: true,
      order: 3,
    },
    confirm_password: {
      label: "Confirm Password",
      placeholder: "Confirm your password",
      isRequired: true,
      order: 4,
    },
  },
};

export function Auth({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator
      components={components}
      formFields={formFields}
      signUpAttributes={["email"]}
    >
      {children}
    </Authenticator>
  );
}
