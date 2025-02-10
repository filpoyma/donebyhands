import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { Colors } from '~constants/colors.constants';
import { ITextInputComponentProps } from '~components/shared/input/interfaces';
import { AppText } from '~components/shared/text';
import { Row } from '~components/view';
import { hp, ms, wp } from '~utils/dimensions.utils';

const TextInputLabeled: React.FC<ITextInputComponentProps> = ({
  value = '',
  onChangeTextNamed,
  name,
  label = '',
  labelBottom = '',
  labelError,
  hideBottomLabel = false,
  LeftIcon,
  leftIconSize = 20,
  RightIcon,
  rightIconSize = 20,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <Row
        style={[
          styles.inputContainer,
          labelError ? { borderColor: Colors.red, borderWidth: 1 } : {},
        ]}>
        {LeftIcon && (
          <LeftIcon style={styles.leftIcon} width={leftIconSize} height={leftIconSize} />
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(e: string) => onChangeTextNamed(name, e)}
          keyboardType="default"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          placeholder="Введите"
          placeholderTextColor={Colors.weak}
          {...props}
        />
        {RightIcon && (
          <RightIcon style={styles.rightIcon} width={rightIconSize} height={rightIconSize} />
        )}
      </Row>
      {labelBottom && !labelError && <AppText>{labelBottom}</AppText>}
      {!hideBottomLabel && labelError && (
        <AppText style={[styles.label, { color: Colors.red }]}>{labelError}</AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  inputContainer: {
    height: hp(56),
    paddingVertical: hp(20),
    paddingHorizontal: wp(20),
    borderRadius: ms(16),
    backgroundColor: Colors.grey,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: Colors.black,
    fontSize: ms(14),
    fontFamily: 'Inter-SemiBold',
    height: hp(56),
  },
  label: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.weak,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
});

export default React.memo(TextInputLabeled);
