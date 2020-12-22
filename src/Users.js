import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
    case "SUCCESS":
    case "ERROR":
    default:
      return state;
  }
}

function Users() {
  const fetchUses = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users/"
      );
    } catch (e) {}

    setLoading(false);
  };

  useEffect(() => {
    fetchUses();
  }, []);

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
