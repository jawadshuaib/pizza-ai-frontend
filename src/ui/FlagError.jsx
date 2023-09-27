import React from 'react';
import Flag from './Flag';
import { useAppSelectors } from '../hooks/useAppSelectors';

export default function FlagError() {
  const { reason } = useAppSelectors();
  if (reason === null) return null;

  return <Flag color="yellow">{reason}</Flag>;
}
