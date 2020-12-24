import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { asyncReducer } from "./asyncReducer";

function Users() {
  const [state, dispatch] = useReducer(asyncReducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchUses = async () => {
    dispatch({type:'LOADING'});
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users/"
      );
      dispatch({type:'SUCCESS',data:res.data});
    } catch (e) {
      dispatch({type:'ERROR',error:e});
    }

    
  };

  useEffect(() => {
    fetchUses();
  }, []);

  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중 </div>;
  if (error) return <div>에러가 발생헀습니다. </div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}({user.name})
          </li>
        ))}
        <li></li>
      </ul>
      <button onClick={fetchUses}>다시 요청하기 </button>
    </>
  );
}

export default Users;
