import { useUserState, useUserDispatch, getUser } from "./UsersContext";
import { useEffect } from "react";

function User({ id }) {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const { loading:isLoading, data: user, error } = state.user;

  useEffect(()=>{
      getUser(dispatch,id);
  },[dispatch,id]);
 
  if (isLoading) return <div>로딩중 </div>;
  if (error) return <div>에러가 발생헀습니다. </div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
    </div>
  );
}

export default User;
