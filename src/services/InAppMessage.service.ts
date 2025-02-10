import { StyleSheet } from 'react-native';
import { hideMessage, MessageType, showMessage } from 'react-native-flash-message';

import InfoIcon from '~assets/icons/info.svg';
import { Colors } from '~constants/colors.constants';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import { TSvgComponent } from '~typedefs/common';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    paddingVertical: SCREEN_PADDINGS.vertical,
    borderWidth: 1,
    borderColor: Colors.borders,
    borderRadius: 10,
    shadowColor: Colors.blackShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 32,

    elevation: 4,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 12,
  },
});

const iconSize = 24;

const createIcon = ({
  Component,
  color,
  colorAttribute,
}: {
  Component: TSvgComponent;
  color: Colors;
  colorAttribute: 'fill' | 'stroke';
}) => ({
  Component,
  props: {
    [colorAttribute]: color,
    width: iconSize,
    height: iconSize,
  },
});

const icons = {
  default: createIcon({
    Component: InfoIcon,
    color: Colors.grey2,
    colorAttribute: 'stroke',
  }),
  info: createIcon({
    Component: InfoIcon,
    color: Colors.blue,
    colorAttribute: 'stroke',
  }),
  success: createIcon({
    Component: InfoIcon,
    color: Colors.green,
    colorAttribute: 'stroke',
  }),
  danger: createIcon({
    Component: InfoIcon,
    color: Colors.red,
    colorAttribute: 'stroke',
  }),
  warning: createIcon({
    Component: InfoIcon,
    color: Colors.yellow,
    colorAttribute: 'stroke',
  }),
};

const InAppMessageService = {
  showMessage(text: string, type: MessageType = 'none') {
    const icon = this.getIcon(type);

    showMessage({
      type,
      floating: true,
      message: text,
      duration: 4000,
      backgroundColor: Colors.white,
      color: Colors.black,
      style: styles.container,
      textStyle: styles.text,
      icon: icon?.Component,
      iconProps: icon?.props,
    });
  },

  getIcon(type: MessageType) {
    return type !== 'none' ? icons[type] : undefined;
  },

  getOptions(type: MessageType) {
    const icon = this.getIcon(type);

    return {
      floating: true,
      duration: 7000,
      backgroundColor: Colors.white,
      color: Colors.black,
      style: styles.container,
      textStyle: styles.text,
      icon: icon?.Component,
      iconProps: icon?.props,
    };
  },

  hideMessage() {
    hideMessage();
  },

  danger(message: string) {
    this.showMessage(message, 'danger');
  },

  info(message: string) {
    this.showMessage(message, 'info');
  },
};

export default InAppMessageService;
