import React from 'react';

import ContentLoader from 'react-content-loader';

export const CardSkeleton: React.FC = React.memo(() => (
  <ContentLoader
    speed={2}
    width={180}
    height={340}
    viewBox="0 0 180 340"
    backgroundColor="#ffdcdc"
    foregroundColor="#ffa1a1"
    style={{ boxShadow: '1px 0 6px rgba(0, 0, 0, 0.18)', borderRadius: 7 }}
  >
    <rect x="34" y="11" rx="8" ry="8" width="111" height="82" />
    <rect x="12" y="316" rx="3" ry="3" width="155" height="20" />
    <rect x="12" y="96" rx="4" ry="4" width="155" height="98" />
    <rect x="12" y="201" rx="4" ry="4" width="155" height="110" />
  </ContentLoader>
));
