import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import Profile from "@/screens/profile";
import { IUser } from "@/store/user/user.type";
import axios from "axios";
import { useRouter } from "next/router";

export interface IProfileProps {
  user: IUser;
}

const ProfilePage: NextPage<IProfileProps> = ({ user }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return <Profile user={user} />;
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await axios.get(`${process.env.API_URL}/user/all`);

//   const paths = data.map((p) => {
//     return {
//       params: { username: p.username },
//     };
//   });
//   return { paths, fallback: "blocking" };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { data } = await axios.get(
//     `${process.env.API_URL}/user/username/${params.username}`
//   );
//   return {
//     props: {
//       user: data,
//     },
//   };
// };
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const { data } = await axios.get(
    `${process.env.API_URL}/user/username/${params.username}`
  );
  return {
    props: {
      user: data,
    },
  };
};

export default ProfilePage;
