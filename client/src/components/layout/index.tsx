import { FC } from "react";
import Meta from "../meta";
import Header from "../header";
import styles from "./Layout.module.scss";

const Layout: FC<any> = ({ children, ...rest }) => {
  return (
    <>
      <Meta {...rest} />
      <div className={styles.grid}>
        <nav>
          <Header />
        </nav>
        <main>
          <section>{children}</section>
        </main>
      </div>
    </>
  );
};

export default Layout;
