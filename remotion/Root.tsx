import React from 'react';
import { Composition } from 'remotion';
import GroundhogDayAi, { compositionConfig } from './GroundhogDayAi';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={compositionConfig.id}
      component={GroundhogDayAi}
      durationInFrames={compositionConfig.durationInSeconds * compositionConfig.fps}
      fps={compositionConfig.fps}
      width={compositionConfig.width}
      height={compositionConfig.height}
    />
  );
};
