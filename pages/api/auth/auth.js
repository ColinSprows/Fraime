import { Auth, Hub } from 'aws-amplify';

// Signup
async function signUp() {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,          // optional
        phone_number,   // optional - E.164 number convention
        // other custom attributes 
      },
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      }
    });
    console.log(user);
  } catch (error) {
    console.log('error signing up:', error);
  }
}

//Confirmation email resend
async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
}

//confirm after receiving code
async function confirmSignUp() {
  try {
    //doesn't allow doubled emails
    await Auth.confirmSignUp(username, code, { forceAliasCreation: false });
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

//Auto sign in after sign up
function listenToAutoSignInEvent() {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'autoSignIn') {
        const user = payload.data;
        // assign user
      } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
      }
    })
}

//Sign in
async function signIn() {
    try {
      const user = await Auth.signIn(username, password);
    } catch (error) {
      console.log('error signing in', error);
    }
}

//sign out
async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
}

//change password
async function changePassword (oldPassword, newPassword) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const data = await Auth.changePassword(user, oldPassword, newPassword);
      console.log(data);
    } catch(err) {
      console.log(err);
    }
};

//Forgot Password
// Send confirmation code to user's email
async function forgotPassword(username) {
    try {
      const data = await Auth.forgotPassword(username);
      console.log(data);
    } catch(err) {
      console.log(err);
    }
  } 
  
// Collect confirmation code and new password
async function forgotPasswordSubmit(username, code, newPassword) {
    try {
      const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
      console.log(data);
    } catch(err) {
      console.log(err);
    }
}

//Retrieve current authenticated user
async function currentAuthenticatedUser() {
    try {
      const user = Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
    } catch(err) {
      console.log(err);
    }
};


