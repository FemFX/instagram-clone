import { IUser } from "@/store/user/user.type";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { RxAvatar } from "react-icons/rx";

const Subscriptions: FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className="max-w-[500px] overflow-x-scroll flex gap-1 justify-between snap-x">
      {user.subscriptions &&
        user.subscriptions.map((subscription) => {
          return (
            <>
              <Link
                key={subscription.id}
                href={`/u/${subscription.toChannel.username}`}
                className="text-center min-w-[100px] flex flex-col items-center mx-auto flex-1 basis-1/6"
              >
                {user.avatarPath ? (
                  <Image
                    src={`${process.env.API_URL}${user.avatarPath}`}
                    width={60}
                    height={60}
                    alt="User Avatar"
                    className="rounded-full h-[60px]"
                  />
                ) : (
                  <RxAvatar className="flex-0" size={170} />
                )}
                <div className="text-xs">{subscription.toChannel.username}</div>
              </Link>
            </>
          );
        })}
    </div>
  );
};

export default Subscriptions;
