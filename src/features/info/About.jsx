import React from 'react';
import { Paragraph } from '../../ui';

export default function About() {
  return (
    <>
      <Paragraph custom="text-left mb-2">
        Hi, I created Pizza AI to showcase the potential for using Generative AI
        to query privately held dataset - in this case, a pizza menu.
      </Paragraph>
      <Paragraph custom="text-left mb-2">
        Many technologies fall victim to the Gartner hype cycle. However, I
        believe that Generative AI is neither hype nor a fad. It has the
        potential to increase productivity across domains.
      </Paragraph>

      <Paragraph custom="text-left mb-2">
        All sorts of new use cases can be developed. What if, for example, you
        could simply ask a real estate platform to{' '}
        <span className="text-yellow-500 dark:text-yellow-300">
          find a house near a good school in a quiet neighborhood with a big
          backyard
        </span>
        . Applications like that are just waiting to be built. Which is why I am
        extremely excited by this tech.
      </Paragraph>
      {/* <Paragraph custom="text-left mb-2">
        Generative AI does away with hours of search, and replaces it with
        intutive natural language based queries.
      </Paragraph> */}
      <Paragraph custom="text-left">
        Feel free to{' '}
        <a
          href="https://www.linkedin.com/in/jawadshuaib"
          target="_blank"
          rel="noopener noreferrer"
          className=" underline hover:text-blue-500 dark:text-blue-200"
        >
          get in touch with me
        </a>
        .
      </Paragraph>
    </>
  );
}
