import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const ToolsCardLoader = () => (
  <ContentLoader
    speed={2}
    width={156}
    height={250}
    viewBox="0 0 156 250"
    backgroundColor="#f7f7f7"
    foregroundColor="#e0e0e0">
    <Rect x="0" y="0" rx="12" ry="12" width="100%" height="100%" />
  </ContentLoader>
);

export default ToolsCardLoader;
