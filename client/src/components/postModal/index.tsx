import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import { IPost } from "@/store/post/post.type";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import Comment from "../comment";
import EmotionButtons from "../post/EmotionButtons";
import AddComment from "../post/AddComment";

interface IPostModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  post: IPost;
}

const PostModal: FC<IPostModal> = ({ isOpen, onClose, onOpen, post }) => {
  return (
    <>
      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex w-full">
              <div className="w-1/2">
                <Image
                  src={`${process.env.API_URL}${post.images[0].imagePath}`}
                  alt="Post image"
                  width={444}
                  height={555}
                  className="w-full m-0"
                />
              </div>
              <div className="w-1/2 ml-3 flex flex-col justify-between">
                <div className="flex w-full justify-between">
                  <div className="flex">
                    {post.user.avatarPath ? (
                      <Image
                        src={`${process.env.API_URL}${post.user.avatarPath}`}
                        width={30}
                        height={30}
                        alt="User Avatar"
                        className="rounded-full"
                      />
                    ) : (
                      <RxAvatar size={30} />
                    )}
                    <Link
                      href={`/${post.user.username}`}
                      className="font-bold flex items-center ml-2"
                    >
                      {post.user.username}
                    </Link>
                  </div>
                  <div className="flex items-center justify-end cursor-pointer">
                    <BsThreeDots size={25} />
                  </div>
                </div>
                <hr />
                <div className="overflow-y-scroll max-h-[300px]">
                  {post.comments.length > 0 ? (
                    <div>
                      {post.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                      ))}
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center basis-1/2">
                      Комментариев пока нет
                    </div>
                  )}
                </div>
                <hr className="mt-3" />
                <div>
                  <EmotionButtons post={post} className="flex" />
                  <div>Likes : {post.likes ? post.likes.length : 0}</div>
                  <AddComment postId={post.id} />
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
