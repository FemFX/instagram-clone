import Layout from "@/components/layout";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { IProfileProps } from "@/pages/u/[username]";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

const bgVariants = {
  initial: {
    opacity: 0,
  },
  hovered: {
    opacity: 0.3,
    transition: {
      duration: 0.1,
    },
  },
};

const likeVariants = {
  initial: {
    display: "none",
  },
  hovered: {
    display: "flex",
  },
};

const Profile: FC<IProfileProps> = ({ user }) => {
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

  return (
    <Layout>
      <div className="max-w-[1000px]">
        <div className="flex w-full gap-3">
          {user && user.avatarPath ? (
            <Image
              src={`${process.env.API_URL}${user.avatarPath}`}
              width={120}
              height={120}
              alt="User Avatar"
              className="rounded-full ml-10 flex-0 w-[70px] h-[70px] xs:w-[120px] xs:h-[120px]"
            />
          ) : (
            <RxAvatar className="flex-0" size={170} />
          )}
          <div className="flex-1">
            <div>
              <div className="text-xl">{user.username}</div>
              {authUser &&
                authUser.id !== user.id &&
                !authUser.subscriptions.find(
                  (sub) => sub.toChannel.id === user.id
                ) && <Button>Подписаться</Button>}
            </div>

            <div className="flex gap-4">
              <div>
                <span className="font-bold mr-1">
                  {user?.posts.length || 0}
                </span>
                Публикаций
              </div>
              <div>
                <span className="font-bold mr-1">
                  {user.subscribers.length}
                </span>
                Подписчиков
              </div>
              <div>
                <span className="font-bold mr-1">
                  {user.subscriptions.length}
                </span>
                Подписок
              </div>
            </div>
          </div>
        </div>
        <hr className="my-3 max-w-[950px]" />
        <div className="flex flex-wrap justify-center max-w-[950px] gap-1 ml-1/5">
          {user.posts.map((post) => (
            <motion.div
              initial="initial"
              whileHover="hovered"
              className="relative cursor-pointer"
              key={post.id}
            >
              <motion.div
                variants={likeVariants}
                className="font-bold text-white opacity-1 z-10 absolute top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex text-center"
              >
                <AiFillHeart />
                <div>{post.likes.length}</div>
              </motion.div>
              <motion.div
                variants={bgVariants}
                className="absolute w-full h-full border-2 border-black bg-black z-1 t-0 r-0 opacity-0 hover:opacity-0.2 flex items-center justify-center text-white"
              ></motion.div>
              <Image
                src={`${process.env.API_URL}${post.images[0].imagePath}`}
                className="w-[1/3+4px] h-full"
                width={280}
                height={280}
                alt="post image"
              />
            </motion.div>
          ))}
        </div>
      </div>
      Постов пока нет
    </Layout>
  );
};

export default Profile;
