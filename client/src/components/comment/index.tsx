import { IComment } from "@/store/comment/comment.type";
import { useGetUserByIdQuery } from "@/store/user/user.api";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { RxAvatar } from "react-icons/rx";

interface ICommentProps {
  comment: IComment;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
  const { data, isLoading } = useGetUserByIdQuery(String(comment.authorId));
  if (!isLoading) {
    return (
      <>
        <div className="flex">
          {data.avatarPath ? (
            <Image
              src={`${process.env.API_URL}${data.avatarPath}`}
              width={30}
              height={30}
              alt="User Avatar"
              className="rounded-full"
            />
          ) : (
            <RxAvatar size={30} />
          )}
          <Link
            href={`/${data.username}`}
            className="font-bold flex items-center ml-2"
          >
            {data.username}
          </Link>
          <div className="flex items-center ml-3">{comment.text}</div>
        </div>
      </>
    );
  }
};

export default Comment;
