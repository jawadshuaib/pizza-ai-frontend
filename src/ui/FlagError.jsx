import React from 'react';
import Flag from './Flag';
import { useSelector } from 'react-redux';

export default function FlagError() {
  const reason = useSelector((store) => store.error.reason);
  if (reason === null) return null;

  return <Flag color="yellow">{reason}</Flag>;
}
