import clientPromise from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Meta from "@/components/Meta";

type ConnectionStatus = {
  isConnected: boolean;
}

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("fanbase")
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

const Home = ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <Meta />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1 className="fixed left-0 top-0 flex w-full justify-center text-3xl italic font-bold font-mono border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            MEET SGaWD...
          </h1>
          {isConnected ? (
            <h2 className="flex justify-center text-xl font-bold">
              You are connected to MongoDB
            </h2>
          ) : (
            <h2 className="flex justify-center text-xl font-bold">
              Could not connect to MongoDB
            </h2>
          )}
        </div>
      </div>
    </main>
    
  );
}

export default Home;
