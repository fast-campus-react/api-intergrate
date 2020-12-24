import axios from "axios";
import { useAsync } from "react-async";

async function getUser({ id }) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return res.data;
}

function User({ id }) {
  const { data: user, error, isLoading } = useAsync({
    promiseFn: getUser,
    id,
    watch: id,
  });
  

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
