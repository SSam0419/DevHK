import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevHK",
  description: "",
};

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
