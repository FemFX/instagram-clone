import { FC } from "react";
import { data } from "./header.data";
import HeaderItem from "./header-item";
import { CgProfile } from "react-icons/cg";
import clsx from "clsx";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";

const Header: FC = () => {
  return (
    <header className="h-screen pr-8 xl:pr-0 xl:w-1/6 border-r border-r-[#DBDBDB] pl-8 fixed  ">
      <Link href="/">
        <h1 className="text-2xl font-normal font-[Itim] mb-10 xl:block hidden">
          Instagram
        </h1>
        <AiFillInstagram className="hidden" />
      </Link>
      {data.map((item) => (
        <HeaderItem key={item.title} {...item} />
      ))}
      <div
        className={clsx(
          "flex text-center items-center py-2 my-4 text-lg gap-2 cursor-pointer max-w-[90%] hover:bg-[#DBDBDB] hover:bg-opacity-20 hover:rounded-xl"
        )}
      >
        <CgProfile size={24} />
        <Link className="hidden xl:block" href={"/profile"}>
          Profile
        </Link>
      </div>
    </header>
  );
};

export default Header;
