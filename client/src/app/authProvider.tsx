import React from "react";
import {
  Authenticator,
  Heading,
  useTheme,
  Text,
  View,
  Image,
  useAuthenticator,
  Button,
  Theme,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

import "./globals.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

const theme: Theme = {
  name: "CustomAuthTheme",
  tokens: {
    colors: {
      background: {
        primary: { value: "#f0f8ff" },
        secondary: { value: "#fafafa" },
      },
    },
    components: {
      authenticator: {
        router: { backgroundColor: "#ffffff" },
        form: {},
      },
      button: {
        primary: {
          _hover: {
            backgroundColor: { value: "#163cfa" },
            color: { value: "#ffffff" },
          },
        },
        link: {
          _hover: {
            color: { value: "#163cfa" },
          },
        },
      },
      
    },
  },
};

const components = {
  // Other component overrides remain unchanged...
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://miro-s3-images.s3.us-east-1.amazonaws.com/logo.png"
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color="#ffffff">© All Rights Reserved</Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toForgotPassword } = useAuthenticator();
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toForgotPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      );
    },
  },
};

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Enter a username",
      label: "User",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter an email",
      label: "E-mail",
      isRequired: true,
      type: "email",
    },
    password: {
      order: 3,
      placeholder: "Enter a strong password",
      label: "Password",
      isRequired: true,
      type: "password",
    },
    confirm_password: {
      order: 4,
      placeholder: "Re-enter password",
      label: "Confirm Password",
      isRequired: true,
      type: "password",
    },
  },
};

const AuthProvider = ({ children }: any) => {
  const bgUrl =
    "https://miro-s3-images.s3.us-east-1.amazonaws.com/360_F_617150830_aVVfotioNvn6Hi7EmNrhltksCamTDaQK.jpg";
  return (
    // Outer div now sets full-page background
    <div
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover", // scale & crop so it fills the container
        backgroundRepeat: "no-repeat", // don’t tile
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="mt-5">
        <ThemeProvider theme={theme}>
          <Authenticator formFields={formFields} components={components}>
            {({ user }: any) =>
              user ? <div>{children}</div> : <div>Sign in below: </div>
            }
          </Authenticator>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AuthProvider;
