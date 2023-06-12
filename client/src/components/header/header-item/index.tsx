import { FC, useRef, createRef } from "react";
import { IHeaderData } from "../header.data";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import ModalComponent from "@/components/createModal";
import Image from "next/image";
import Search from "@/components/search";

const HeaderItem: FC<IHeaderData> = ({ href, icon: Icon, title }) => {
  // const btnRef = useRef();
  const { asPath } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: SearchIsOpen,
    onOpen: SearchOnOpen,
    onClose: SearchOnClose,
  } = useDisclosure();

  return (
    <div
      className={clsx(
        "flex text-center items-center py-2 my-4 text-lg gap-2 cursor-pointer max-w-[90%] hover:bg-[#DBDBDB] hover:bg-opacity-20 hover:rounded-xl",
        {
          "font-bold": asPath === href,
          "font-light": asPath !== href,
        }
      )}
    >
      <Icon size={24} />
      {href ? (
        <Link className="hidden xl:block" href={href}>
          {title}
        </Link>
      ) : (
        <div
          className="hidden xl:block"
          onClick={title == "Поиск" ? SearchOnOpen : onOpen}
        >
          {title}
        </div>
      )}
      <ModalComponent
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title="Создание публикации"
      />
      <Search
        isOpen={SearchIsOpen}
        onClose={SearchOnClose}
      />
    </div>
  );
};

export default HeaderItem;
