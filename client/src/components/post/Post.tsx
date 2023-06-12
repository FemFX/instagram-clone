import { IPost } from "@/store/post/post.type";
import { FC, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { AnimatePresence } from "framer-motion";
import { MotionImage } from "./MotionImage";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import EmotionButtons from "./EmotionButtons";
import AddComment from "./AddComment";
import { RxAvatar } from "react-icons/rx";
import { Button } from "@chakra-ui/react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDeletePostMutation } from "@/store/post/post.api";

interface IPostProps {
  post: IPost;
}

const animationVariants = {
  initial: {
    x: 0,
  },
  animate: (custom) => ({
    x: -(468 * custom),
  }),
};

const Post: FC<IPostProps> = ({ post }) => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const { user } = useTypedSelector((state) => state.user);
  const [deletePost] = useDeletePostMutation();

  return (
    <div className="border-b-[1px] border-b-[#ccc] py-5">
      <div className="flex justify-start">
        {post.user.avatarPath ? (
          <Image
            src={`${process.env.API_URL}${post.user.avatarPath}`}
            width={40}
            height={40}
            alt="User Avatar"
            className="rounded-full h-[40px]"
          />
        ) : (
          <RxAvatar size={30} />
        )}
        <Link
          href={`/u/${post.user.username}`}
          className="font-bold flex items-center"
        >
          {post.user.username}
        </Link>
        <div className="flex justify-center items-center text-center h-dull my-auto ml-3 text-gray-400 text-xs ">
          {formatDistance(new Date(post.createdAt), new Date())}
        </div>
        {user.id === post.user.id && (
          <Button
            onClick={() => deletePost(String(post.id))}
            size={"xs"}
            className="flex justify-end items-center text-center h-dull my-auto ml-3 text-gray-400 text-xs "
          >
            Удалить
          </Button>
        )}
      </div>
      <div className="mt-5 max-w-[468px] overflow-hidden relative flex">
        {activeImage !== 0 && (
          <GrFormPrevious
            onClick={() => setActiveImage(activeImage - 1)}
            size={20}
            className="absolute top-1/2 bg-white left-2 rounded-full z-10 cursor-pointer"
          />
        )}
        <div className="flex">
          {post.images.map((image) => {
            return (
              <AnimatePresence key={image.id}>
                <MotionImage
                  variants={animationVariants}
                  initial="initial"
                  animate="animate"
                  custom={activeImage}
                  src={`${process.env.API_URL}${image.imagePath}`}
                  width={468}
                  height={468}
                  alt="Post image"
                  className="max-w-[468px] max-h-[468px] rounded"
                />
              </AnimatePresence>
            );
          })}
        </div>
        {activeImage < post.images.length - 1 && (
          <GrFormNext
            onClick={() => setActiveImage(activeImage + 1)}
            size={20}
            className="absolute top-1/2 bg-white right-2 rounded-full cursor-pointer"
          />
        )}
      </div>
      <EmotionButtons post={post} className="flex gap-3 mt-2" />
      <div>Likes : {post.likes ? post.likes.length : 0}</div>
      {post.comments.length !== 0 && (
        <div>{post.comments[post.comments.length - 1].text}</div>
      )}
      {post.comments.length > 1 && (
        <div className="cursor-pointer">
          Показать все комментарии({post.comments.length})
        </div>
      )}
      <AddComment postId={post.id} />
    </div>
  );
};

export default Post;
