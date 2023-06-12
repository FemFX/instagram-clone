import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, me } from "@/store/user/user.actions";

const Login: FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    async function a() {
      const response = await dispatch<any>(me());
      // console.log(response.payload);
    }
    a();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = dispatch<any>(
      login({
        password,
        usernameOrEmail,
      })
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default Login;
