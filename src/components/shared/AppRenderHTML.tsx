import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import React from 'react';
import { Colors } from '~constants/colors.constants';

const AppRenderHTML = ({ text }: { text: string }) => {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      source={{ html: `<html lang="ru"><body>${text || ''}</html></body>` }}
      contentWidth={width}
      systemFonts={['Inter-Regular']}
      tagsStyles={{
        body: {
          fontSize: 14,
          lineHeight: 21,
          fontFamily: 'Inter-Regular',
          color: Colors.black,
        },
        p: { lineHeight: 21 },
        li: { lineHeight: 17 },
        img: { display: 'none' },
      }}
    />
  );
};

export default React.memo(AppRenderHTML);
