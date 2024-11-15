// ** React/Next.js Imports
import * as React from "react";

// ** Third-Party Imports
import {
  Html,
  Button,
  Text,
  Container,
  Section,
  Heading,
  Body,
  Preview,
  Tailwind,
} from "@react-email/components";

// ** Custom Components, Hooks, Utils, etc.
import { env } from "@/env";

export const WelcomeEmailSubject = () => `Thank you for joining my FanSync!`;

export const WelcomeEmail = ({
  fanName,
  anthem,
  licenseId,
}: {
  fanName: string;
  anthem?: string;
  licenseId: string;
}) => {
  const url = env.NEXT_PUBLIC_BASE_URL;

  return (
    <Html lang='en'>
      <Preview>Welcome to FanSync - Your digital fan license awaits!</Preview>
      <Tailwind>
        <Body className='bg-black font-sans'>
          <Container className='mx-auto p-10 bg-white rounded-lg max-w-[600px]'>
            <Heading className='text-4xl leading-tight font-bold text-gray-900 text-center my-8'>
              Welcome to FanSync!
            </Heading>
            <Section className='p-5'>
              <Text className='text-base leading-7 text-gray-800'>
                Hey {fanName.split(" ")}! 🎵
              </Text>
              <Text className='text-base leading-7 text-gray-800'>
                Thanks for joining our community.{" "}
                {anthem && (
                  <span className='bg-gray-100 px-2 py-1 rounded font-bold text-black'>
                    We love that you chose &quot;{anthem}&quot; as your anthem!
                  </span>
                )}
              </Text>
              <Text className='text-base leading-7 text-gray-800'>
                Get ready to connect with your favorite artists in a whole new
                way.
              </Text>
            </Section>
            <Button
              href={`${url}/license/${licenseId}`}
              className='bg-black rounded-md text-white text-base no-underline text-center block py-3 px-5 mx-auto w-fit'
            >
              View Your License
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
