import React from 'react';
import { useSelector } from 'react-redux';
import H1 from '../../ui/H1';
import Paragraph from '../../ui/Paragraph';

export default function Success() {
  const upload = useSelector((store) => store.order.upload);
  console.log(upload.path);

  return (
    <>
      <H1>Order Completed!</H1>
      <Paragraph>We have mailed your pizza to you!</Paragraph>
    </>
  );
}
