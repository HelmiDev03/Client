import type { Metadata } from "next";





export const metadata: Metadata = {
  title: "SignIn",
  description: "novencia signin page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
