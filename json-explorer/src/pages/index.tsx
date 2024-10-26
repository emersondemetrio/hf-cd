import { Open_Sans } from 'next/font/google';
import Head from "next/head";
import { JsonArea } from '~/components/json/json';

const openSans = Open_Sans({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Json Explorer</title>
        <meta name="description" content="Json Explorer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <main className={
        `${openSans.className} flex min-h-screen flex-col items-center justify-center`
      }>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Json Explorer
          </h1>
          <JsonArea />
        </div>
      </main>
    </>
  );
}
