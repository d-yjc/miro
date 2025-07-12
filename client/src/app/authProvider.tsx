import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

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
  return (
    <div className="mt-5">
      <Authenticator formFields={formFields}>
        {({ user }: any) =>
          user ? <div>{children}</div> : <div>Sign in below: </div>
        }
      </Authenticator>
    </div>
  );
};

export default AuthProvider;
