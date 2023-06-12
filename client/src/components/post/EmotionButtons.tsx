import { FC, useEffect, useState } from "react";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import PostModal from "../postModal";
import { useDisclosure } from "@chakra-ui/react";
import { IPost } from "@/store/post/post.type";
import { useLikeMutation } from "@/store/like/like.api";
import { useAnimationControls, motion } from "framer-motion";
import { useTypedSelector } from "@/hooks/useTypedSelector";

interface IEmotionButtonsProps {
  className: string;
  post: IPost;
}

const EmotionButtons: FC<IEmotionButtonsProps> = ({ className, post }) => {
  const controls = useAnimationControls();
  const { user } = useTypedSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [like] = useLikeMutation();
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(
      user.likes?.some((like1) => {
        return post.likes.find((like2) => like1.id === like2.id);
      })
    );
  }, [user, isLiked, setIsLiked]);
  return (
    <div className={className}>
      <motion.div
        animate={controls}
        onClick={() => {
          if (!isLiked) {
            controls.start({
              scale: [1.05, 1.1, 1],
              transition: {
                duration: 0.2,
              },
            });
          }
          like(post.id);
          setIsLiked(!isLiked);
        }}
      >
        <AiFillHeart
          color={isLiked ? "#ED4956" : ""}
          size={30}
          className="cursor-pointer transition-all"
        />
      </motion.div>
      <AiFillMessage onClick={onOpen} size={30} className="cursor-pointer" />
      <FaTelegramPlane size={30} className="cursor-pointer" />
      <PostModal
        post={post}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default EmotionButtons;
