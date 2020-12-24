import { createContext, useReducer, useContext } from "react";
import axios from "axios";

const initialState = {
  users: {
    loading: false,
    data: null,
    error: null,
  },
  user: {
    loading: false,
    data: null,
    error: null,
  },
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (e) => ({
  loading: false,
  data: null,
  error: e,
});

function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: loadingState,
      };
      break;
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: success(action.data),
      };
    case "GET_USERS_ERROR":
      return {
        ...state,
        users: error(action.error),
      };
    case "GET_USER":
      return {
        ...state,
        user: loadingState,
      };
      break;
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: success(action.data),
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        user: error(action.error),
      };

    default:
      break;
  }
}

const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UsersStateContext);
  if (!state) throw new Error("cannot find usersProvider");

  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) throw new Error("cannot find usersProvider");

  return dispatch;
}

export async function getUsers(dispatch) {
  dispatch({ type: "GET_USERS" });
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/`);
    dispatch({ type: "GET_USERS_SUCCESS", data: res.data });
  } catch (e) {
    dispatch({ type: "GET_USERS_ERROR", error: e });
  }
}

export async function getUser(dispatch,id) {
  dispatch({ type: "GET_USER" });
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: "GET_USER_SUCCESS", data: res.data });
  } catch (e) {
    dispatch({ type: "GET_USER_ERROR", error: e });
  }
}
