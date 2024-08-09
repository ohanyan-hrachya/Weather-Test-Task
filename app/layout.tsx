import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import Nav from "./components/Nav";
import Header from "./components/Header";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section className={styles.container}>

            <Header />

            <main className={styles.main}>{children}</main>

            <Nav />

          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
