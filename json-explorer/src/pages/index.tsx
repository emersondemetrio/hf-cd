import { Open_Sans } from "next/font/google";
import Head from "next/head";
import { Container } from "~/components/container/container";

const openSans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const allClasses =
    `${openSans.className} flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300`;

  return (
    <>
      <Head>
        <title>Json Explorer</title>
        <meta name="description" content="Json Explorer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <main className={allClasses}>
        <Container />
      </main>
    </>
  );
}
