import { Box, Flex, Tab, TabList, Tabs, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import WelcomeLogo from "../components/user/userAuthentication/WelcomeLogo";
import LoginCard from "../components/user/userAuthentication/LoginCard";
import SignUpCard from "../components/user/userAuthentication/SignUpCard";
import UserRequestHandler from "../handlers/UserRequestHandler";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../Util";
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import LoadingPage from "./LoadingPage";

function LoginPage() {
  const [loginUserName, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayLoginForm, setDisplayLoginForm] = useState(true);
  const [displaySignupForm, setDisplaySignupForm] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    AuthRequestHandler.isAuth()
      .then(res => {
        setIsAuthenticated(res.isAuth);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  function loginHandler() {
    AuthRequestHandler.login(loginUserName, loginPassword)
      .then((result) => {
        LocalStorageHandler.storeUserData({
          id: result.id,
          username: result.username,
          email: result.email,
          role: result.role
        });
        navigate('home');
      }).catch(e => {
        console.log(e)
        showError('Invalid Credentials', toast)
      });
  }

  function signUpHandler() {
    if (!email) {
      showError('Email cannot be empty', toast);
      return;
    }

    if (!signUpUsername) {
      showError('Username cannot be empty', toast);
      return;
    }

    if (!signUpPassword) {
      showError('Password cannot be empty', toast);
      return;
    }

    if (signUpPassword !== confirmPassword) {
      showError('Passwords do not match', toast);
      return;
    }

    UserRequestHandler.createUser(signUpUsername, email, signUpPassword)
      .then(() => {
        showSuccess('You are now registered! proceed to login', toast);
        setDisplayLoginForm(true)
        setDisplaySignupForm(false)
      }).catch((e: any) => showError(e.response.data.message, toast));
  }

  const tabs = [
    {
      label: 'Login',
      onClick: () => {
        setDisplayLoginForm(true)
        setDisplaySignupForm(false)
      }
    },
    {
      label: 'Sign Up',
      onClick: () => {
        setDisplayLoginForm(false)
        setDisplaySignupForm(true)
      }
    },
  ]

  if (isAuthenticated === null) {
    return <LoadingPage />
  } else if (isAuthenticated) {
    navigate('../home');
  } else {
    return (
      <>
        <Flex justify="center" align="center" minHeight="100vh">
          <WelcomeLogo />
          <Box w='100%'>
            <Tabs w={'200px'} bg={'rgb(45, 55, 72)'} variant={'line'} borderRadius={5}>
              <TabList>
                {tabs.map((tab) =>
                  <Tab w={'100px'} onClick={tab.onClick} key={tab.label}>
                    {tab.label}
                  </Tab>
                )}
              </TabList>
            </Tabs>
            {displayLoginForm &&
              <LoginCard
                username={loginUserName}
                usernameSetter={setLoginUsername}
                password={loginPassword}
                passwordSetter={setLoginPassword}
                loginHandler={loginHandler}
              />
            }
            {displaySignupForm &&
              <SignUpCard
                username={signUpUsername}
                usernameSetter={setSignUpUsername}
                password={signUpPassword}
                passwordSetter={setSignUpPassword}
                confirmPassword={confirmPassword}
                confirmPasswordSetter={setConfirmPassword}
                email={email}
                emailSetter={setEmail}
                signUpHandler={signUpHandler}
              />
            }
          </Box>
        </Flex>
      </>
    );
  }
}

export default LoginPage;
