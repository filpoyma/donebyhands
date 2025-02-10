import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const TariffsLoader = () => (
  <ContentLoader
    speed={2}
    width={500}
    height={65}
    viewBox="0 0 500 65"
    backgroundColor="#f7f7f7"
    foregroundColor="#e0e0e0">
    <Rect x="0" y="0" rx="12" ry="12" width="138" height="65" />
    <Rect x="146" y="0" rx="12" ry="12" width="138" height="65" />
    <Rect x="294" y="0" rx="12" ry="12" width="138" height="65" />
  </ContentLoader>
);

export default TariffsLoader;
