import { IUser } from "@/store/user/user.type";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

interface IFooterProps {
  user: IUser;
}

const Footer: FC<IFooterProps> = ({ user }) => {
  return (
    <div className="2xl:ml-16 hidden xl:block max-w-[270px]">
      <div className="flex">
        {user.avatarPath && (
          <Image
            src={`${process.env.API_URL}${user.avatarPath}`}
            width={50}
            height={50}
            alt="User Avatar"
            className="rounded-full"
          />
        )}
        <div>
          <Link href={`/u/${user.username}`}>{user.username}</Link>
          <div className="text-gray-400">{user.fullName}</div>
        </div>
      </div>
      <div className="w-1/2 my-5 text-gray-400 text-xs font-bold">
        Информация Помощь Пресса API Вакансии Конфиденциальность Условия Места
        Язык
      </div>
      <div className="text-gray-400 font-semibold text-xs">
        © {new Date().getFullYear()} INSTAGRAM FROM META
      </div>
    </div>
  );
};

export default Footer;
