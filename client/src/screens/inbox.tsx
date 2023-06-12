import Layout from "@/components/layout";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { isClient } from "@/utils/isClient";
import dynamic from "next/dynamic";
import { FC, useEffect } from "react";
import io from "socket.io-client";

export interface IInboxProps {}

const Inbox: FC<IInboxProps> = ({}) => {
  const { user: authUser } = useTypedSelector((state) => state.user);
  const { me } = useActions();
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !authUser &&
      localStorage.getItem("token")
    ) {
      // Code to run on client-side only
      me();
    }
  }, [authUser]);
  useEffect(() => {
    const socket = io("http://localhost:4000/", {
      transports: ["websocket"],
      auth: { token: localStorage.getItem("token") },
    });
    socket.on("connect", () => {
      console.log("Connected to server");

      // Создание новой комнаты
    //   const data = socket.emit("getRooms");
    //   console.log(data);
    });
  });

  //   socket.emit('getRooms')

  return (
    <Layout>
      <div className="flex items-center">
        <div className="h-[90vh] w-full max-w-[950px] border-[1px] border-gray-300 -ml-72 mt-10 flex">
          <div className="w-[30%] border-[1px] border-gray-300">
            <div className="text-center border-b-[2px] py-4 font-bold">
              {/* {authUser.username} */}
            </div>
          </div>
          <div className="w-[70%] border-[1px] border-gray-300">321</div>
        </div>
      </div>
    </Layout>
  );
};
export default Inbox;
