import React from 'react';
import { Paragraph } from '../../ui';

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
        though, is neither hype nor a fad. It has the potential to increase
        productivity across domains.
      </Paragraph>

      <Paragraph custom="text-left mb-2">
        All sorts of new use cases can be developed. What if, for example, you
        could simply ask a real estate platform to{' '}
        <span className="text-yellow-500 dark:text-yellow-300">
          find a house near a good school in a quiet neighborhood with a big
          backyard
        </span>
        . Applications like that are already possible and just waiting to be
        built.
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
          get in touch
        </a>
        .
      </Paragraph>
    </>
  );
}
