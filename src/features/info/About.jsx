import React from 'react';
import { Image, Paragraph } from '../../ui';
import githubImage from '../../assets/github.svg';

export default function About() {
  return (
    <>
      <Paragraph custom="text-left mb-2">Hi,</Paragraph>
      <Paragraph custom="text-left mb-2">
        I created Pizza AI to showcase the potential for using Generative AI to
        query privately held datasets - in this case, a pizza menu.
      </Paragraph>
      <Paragraph custom="text-left mb-2">
        Many technologies fall victim to the Gartner hype cycle. Generative AI,
        though, is neither hype nor a fad. It has already increased productivity
        across domains.
      </Paragraph>

      <Paragraph custom="text-left mb-2">
        All sorts of use cases are now possible. What if, for example, you could
        simply ask a real estate platform to{' '}
        <span className="text-yellow-500 dark:text-yellow-300">
          find a house near a good school in a quiet neighborhood with a big
          backyard
        </span>
        . Applications like that are now possible and just waiting to be built.
      </Paragraph>
      <Paragraph custom="text-left">
        Feel free to{' '}
        <a
          href="https://www.linkedin.com/in/jawadshuaib"
          target="_blank"
          rel="noopener noreferrer"
          className=" underline hover:text-blue-500 dark:text-blue-200"
        >
          get in touch
        </a>
        .
      </Paragraph>
      <a
        href="https://github.com/jawadshuaib/pizza-ai-frontend"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={githubImage}
          custom="mb-3"
          align="float-left"
          alt="Link to repo"
        />
      </a>
    </>
  );
}
