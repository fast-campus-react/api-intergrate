import React, { useState } from "react";
import User from "./User";
import { useUserState, useUserDispatch, getUsers } from "./UsersContext";

function Users() {
  //const [state, refetch] = useAsync(getUsers, [], true);
  const state = useUserState();
  const dispatch = useUserDispatch();

  const [userId, setUserId] = useState(null);
 

  const { loading:isLoading, data: users, error } = state.users;

  const fetchData = () => {
    getUsers(dispatch);
  };

  if (isLoading) return <div>로딩중 </div>;
  if (error) return <div>에러가 발생헀습니다. </div>;
  if (!users) return <button onClick={fetchData}>요청하기 </button>;

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
      <button onClick={fetchData}>다시 요청하기 </button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
