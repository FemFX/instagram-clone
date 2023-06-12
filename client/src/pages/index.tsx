import { useEffect } from "react";
import type { NextPage } from "next";

import Login from "@/screens/login";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import Home from "@/screens/home";

const HomePage: NextPage = () => {
  const { me } = useActions();
  const { user, loading, error } = useTypedSelector((state) => state.user);
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      me();
    }
  }, []);

  if (user) {
    return <Home user={user} />;
  }
  return <Login />;
};

export default HomePage;
