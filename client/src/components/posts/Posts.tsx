import { useGetPostsQuery } from "@/store/post/post.api";
import { Spinner } from "@chakra-ui/react";
import { FC, useState, useEffect } from "react";
import Post from "../post/Post";
import { useRouter } from "next/router";
import Subscriptions from "../subscriptions";
import { IUser } from "@/store/user/user.type";

const Posts: FC<{ user: IUser }> = ({ user }) => {
  const { query, push } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(+query.p || 0);

  const { data, isLoading } = useGetPostsQuery(String(currentPage), {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    query.p && setCurrentPage(+query.p);
  }, [query]);

  if (isLoading) {
    <div className="flex justify-center items-center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>;
  }
  if (data) {
    return (
      <div className="flex justify-center items-center flex-col">
        <Subscriptions user={user} />
        {data &&
          data.posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        <div className="flex">
          {currentPage !== 0 && (
            <button
              onClick={() => {
                push(`?p=${currentPage - 1}`);
              }}
            >
              {currentPage}
            </button>
          )}
          <button
            onClick={() => {
              push(`?p=${currentPage}`);
            }}
          >
            {currentPage + 1}
          </button>
          {data.hasMore && (
            <button
              onClick={() => {
                push(`?p=${currentPage + 1}`);
              }}
            >
              {currentPage + 2}
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Posts;
