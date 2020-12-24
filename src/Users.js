import React, { useState } from "react";
import axios from "axios";
import { useAsync } from "react-async";
import User from "./User";

async function getUsers() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/");
  return res.data;
}

function Users() {
  //const [state, refetch] = useAsync(getUsers, [], true);
  const { data: users, error, isLoading, reload,run } = useAsync({
    deferFn: getUsers,
  });
  const [userId, setUserId] = useState(null);

  if (isLoading) return <div>로딩중 </div>;
  if (error) return <div>에러가 발생헀습니다. </div>;
  if (!users) return <button onClick={run}>요청하기 </button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username}({user.name})
          </li>
        ))}
        <li></li>
      </ul>
      <button onClick={run}>다시 요청하기 </button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
