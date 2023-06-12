import { FC } from "react";
import { Spinner } from "@chakra-ui/react";
import Footer from "@/components/footer";
import Layout from "@/components/layout";
import Posts from "@/components/posts/Posts";
import { IUser } from "@/store/user/user.type";

interface IHomeProps {
  user: IUser;
}

const Home: FC<IHomeProps> = ({ user }) => {
  return (
    <Layout title="Instagram" description="Instagram desc">
      <div className="w-full flex justify-center  2xl:gap-16 gap-4 mt-10">
        <Posts user={user} />
        <Footer user={user} />
      </div>
    </Layout>
  );
};

export default Home;
