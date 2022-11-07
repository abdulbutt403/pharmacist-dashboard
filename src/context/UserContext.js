import axios from "axios";
import React from "react";
import { endPoint } from "../contants";
import { ToastContainer, toast } from "react-toastify";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  signOut,
  createUser,
};

// ###########################################################

async function loginUser(
  dispatch,
  login,
  password,
  role,
  history,
  setIsLoading,
  setError,
) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password && !!role) {
    const res = await axios.post(endPoint + "/users/login", {
      email: login,
      password: password,
      role: role,
    });
    console.log({res})

    if(res.data.token){
      setTimeout(() => {
        localStorage.setItem('id_token', res.data.token)
        setError(null)
        setIsLoading(false);
        dispatch({ type: 'LOGIN_SUCCESS' })
         history.push('/app/dashboard')
      }, 2000);
    }

  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

async function createUser(
  dispatch,
  login,
  password,
  fullName,
  role,
  history,
  setIsLoading,
  setError,
) {
  setIsLoading(true);

  if (!!login && !!password && !!role) {
    try {
      const res = await axios.post(endPoint + "/users/create", {
        email: login,
        password: password,
        role: role,
        fullName: fullName,
      });
      if(res.data.success){
        toast.success(`Successfully Registered ${role}`)
      }
      if(res.data.msg.length){
        toast.warning(`${role} already exist`)
      }
    } catch (error) {
      console.log(error);
    }

    console.log(role);
    setTimeout(() => {
      //   localStorage.setItem('id_token', 1)
      //   setError(null)
      setIsLoading(false);
      //   dispatch({ type: 'LOGIN_SUCCESS' })

      //   history.push('/app/dashboard')
    }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
