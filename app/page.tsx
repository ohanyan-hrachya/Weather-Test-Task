import type { Metadata } from "next";
import Content from "./[slug]/page";

export default function IndexPage() {
  return <Content params={{
    slug: ""
  }} />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
