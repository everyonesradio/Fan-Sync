import React from "react";
import clientPromise from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Meta from "@/components/Meta";
import WelcomeSection from "@/views/WelcomeSection";
import AboutSection from "@/views/AboutSection";
import CardSection from "@/views/CardSection";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  };
};

const Home = ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <Meta />
      <div className="snap-y snap-mandatory h-screen w-screen overflow-scroll scrollbar-hide">
        <WelcomeSection />
        <AboutSection />
        <CardSection isConnected={isConnected}/>
      </div>
    </main>
  );
};

export default Home;
