import React, { useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import User from "./User";

async function getUsers() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/");
  return res.data;
}

function Users() {
  const [state, refetch] = useAsync(getUsers, [], true);
  const { loading, data: users, error } = state;
  const [userId, setUserId] = useState(null);

  if (loading) return <div>로딩중 </div>;
  if (error) return <div>에러가 발생헀습니다. </div>;
  if (!users) return <button onClick={refetch}>요청하기 </button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={()=>setUserId(user.id)}>
            {user.username}({user.name})
          </li>
        ))}
        <li></li>
      </ul>
      <button onClick={refetch}>다시 요청하기 </button>
      {userId && <User id={userId}/>}
    </>
  );
}

export default Users;
