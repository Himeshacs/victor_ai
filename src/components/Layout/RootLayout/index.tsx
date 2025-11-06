import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import styles from "./RootLayout.module.css";

export const RootLayout = () => {
  return (
    <div className={styles.rootLayout}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
