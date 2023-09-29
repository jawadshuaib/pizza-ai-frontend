import React from 'react';
import { Paragraph } from '../../ui';

export default function About() {
  return (
    <>
      <Paragraph custom="text-left mb-2">
        Hi, I created Pizza AI to showcase how to leverage Generative AI to
        query privately held dataset - in this case, a pizza menu.
      </Paragraph>
      <Paragraph custom="text-left mb-2">
        Many technologies fall victim to the Gartner hype cycle. Sometimes,
        their true potential lays much farther than originally thought
        (Metaverse, NFT, Blockchain, etc).
      </Paragraph>
      <Paragraph custom="text-left mb-2">
        However, I believe that Generative AI is neither hype nor a fad. It has
        the potential to increase productivity across domains.
      </Paragraph>

      <Paragraph custom="text-left mb-2">
        All sorts of new use cases can be developed. For example, instead of
        navigating through cumbersome filtering options, a real estate platform
        could allow prospective buyers to simply articulate their housing
        preferences through natural language:{' '}
        <span className="text-yellow-300">
          Find me a house near a good school in a quiet neighborhood with a big
          backyard.
        </span>
      </Paragraph>
      <Paragraph custom="text-left mb-2">
        Generative AI does away with hours of search, and replaces it with
        intutive natural language based queries.
      </Paragraph>
      <Paragraph custom="text-left mb-8">
        There are endless possibilities. And this is why I am excited!
      </Paragraph>
      <Paragraph custom="text-left">
        Feel free to{' '}
        <a
          href="https://www.linkedin.com/in/jawadshuaib"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-200 underline hover:text-blue-500"
        >
          get in touch with me
        </a>
        .
      </Paragraph>
    </>
  );
}
