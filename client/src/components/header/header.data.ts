import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiOutlineVideoCamera,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
export interface IHeaderData {
  title: string;
  href?: string;
  icon: any;
}

export const data: IHeaderData[] = [
  {
    title: "Главная",
    href: "/",
    icon: AiFillHome,
  },
  {
    title: "Поиск",
    icon: AiOutlineSearch,
  },
  {
    title: "Интересное",
    href: "/explore",
    icon: AiOutlineCompass,
  },
  {
    title: "Reels",
    href: "/reels",
    icon: AiOutlineVideoCamera,
  },
  {
    title: "Сообщения",
    href: "/direct/inbox",
    icon: FaTelegramPlane,
  },
  {
    title: "Уведомления",
    icon: AiOutlineHeart,
  },
  {
    title: "Создать",
    icon: IoMdAddCircleOutline,
  },
];
