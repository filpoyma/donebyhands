import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { HeaderText } from '~components/shared/text';
import { Row, ScreenView } from '~components/view';
import { Colors } from '~constants/colors.constants';
import { MainStackParamList, Screens } from '~constants/navigators.constants';
import SecButton from '~components/shared/buttons/Sec.button';
import { hp, wp } from '~utils/dimensions.utils';
import { BackButtonHeader } from '~components/widgets/headers';
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { selectUser } from '~redux/selectors';
import FileImageIcon from '~assets/icons/fileImage.svg';

type DocumentsScreenProps = StackScreenProps<MainStackParamList, Screens.documents>;

const DocumentsScreen: React.FC<DocumentsScreenProps> = ({ navigation }) => {
  const user = useSelector(selectUser);

  const selfiesUri = user?.photo_doc_uri
    ?.filter(({ type }) => type === 'selfie')
    .map(({ photo }) => photo);

  const passportsUri = user?.photo_doc_uri
    ?.filter(({ type }) => type === 'document')
    .map(({ photo }) => photo);

  const isEditable = user?.docs_status === 'not_checked' || user?.docs_status === 'rejected';
  return (
    <ScreenView fullArea>
      <BackButtonHeader title="Документы" onBackButtonPress={navigation.goBack} />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            <HeaderText size="h4" centered={false}>
              Фотографии паспорта: главная и прописка
            </HeaderText>

            <Row style={styles.photos}>
              {[0, 1].map(i => (
                <View key={i} style={styles.photoContainer}>
                  {passportsUri && passportsUri[i] ? (
                    <Image
                      style={styles.photo}
                      source={{ uri: passportsUri[i], cache: 'force-cache' }}
                      resizeMode="cover"
                    />
                  ) : (
                    <FileImageIcon height={32} width={32} />
                  )}
                </View>
              ))}
            </Row>
          </View>
          <View>
            <HeaderText size="h4" centered={false}>
              Селфи с паспортом
            </HeaderText>

            <Row style={styles.photos}>
              {[0].map(i => (
                <View key={i} style={styles.photoContainer}>
                  {selfiesUri && selfiesUri[i] ? (
                    <Image
                      style={styles.photo}
                      source={{ uri: selfiesUri[i], cache: 'force-cache' }}
                      resizeMode="cover"
                    />
                  ) : (
                    <FileImageIcon height={32} width={32} />
                  )}
                </View>
              ))}
            </Row>
          </View>
        </View>
        <View style={styles.secButton}>
          <SecButton
            text="Редактировать"
            disabled={!isEditable}
            onPress={() => {
              navigation.navigate(Screens.documentsEdit);
            }}
          />
        </View>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(45),
    gap: hp(32),
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    color: Colors.weak,
  },
  photos: {
    marginTop: hp(12),
    gap: wp(8),
  },
  photo: {
    width: 129,
    height: 141,
    borderRadius: wp(18),
  },
  photoContainer: {
    width: 129,
    height: 141,
    backgroundColor: Colors.grey2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    marginTop: hp(16),
  },
  secButton: {
    marginBottom: 8,
    gap: 8,
  },
});

export default DocumentsScreen;
