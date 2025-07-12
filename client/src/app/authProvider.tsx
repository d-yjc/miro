import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
            userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID 
        }
    }
})
const AuthProvider = ({ children }: any) => {
  return (
    <div className="mt-5">
      <Authenticator>
        {({ user }: any) =>
          user ? <div>{children}</div> : <div>Sign in below: </div>
        }
      </Authenticator>
    </div>
  );
};

export default AuthProvider;
