import React from 'react';
import { Image, Paragraph } from '../../ui';
import githubImage from '../../assets/github.svg';
import Href from '../../ui/Href';

export default function About() {
  return (
    <>
      <Paragraph custom="text-left mb-2">Hi,</Paragraph>
      <Paragraph custom="text-left mb-2">
        My last <Href href="https://j4wad.com">project</Href> used vector
        embeddings, stored as a static pickle file, to provide data for a
        Generative AI chatbot.{' '}
      </Paragraph>
      <Paragraph custom="text-left mb-2">
        This project takes that one step further by combining Generative AI with
        the ability to query an SQL style database.
      </Paragraph>
      {/* <Paragraph custom="text-left mb-2">
        Many technologies fall victim to the Gartner hype cycle. Generative AI,
        though, is neither hype nor a fad. It has already increased productivity
        across domains.
      </Paragraph> */}

      <Paragraph custom="text-left mb-2">
        All sorts of use cases are possible with this sort of approach. What if,
        for example, you could simply ask a real estate platform to{' '}
        <span className="text-yellow-500 dark:text-yellow-300">
          find a house near a good school in a quiet neighborhood with a big
          backyard
        </span>
        . Natural language based applications like that are now possible and
        just waiting to be built.
      </Paragraph>
      <Paragraph custom="text-left">
        Feel free to{' '}
        <Href href="https://www.linkedin.com/in/jawadshuaib">get in touch</Href>
        .
      </Paragraph>
      <Href href="https://github.com/jawadshuaib/pizza-ai-frontend">
        <Image
          src={githubImage}
          custom="mb-3"
          align="float-left"
          alt="Link to repo"
        />
      </Href>
    </>
  );
}
