import React from 'react';
import BackButtonHeader from '~components/widgets/headers/BackButton.header';
import { ScreenView } from '~components/view';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '~constants/colors.constants';
import { AppText } from '~components/shared/text';
import IconArrowUp from '~assets/icons/arrowUp.svg';
import IconArrowDown from '~assets/icons/arrowDown.svg';
import { useSelector } from 'react-redux';
import { selectFAQ } from '~redux/selectors';
import AppRenderHTML from '~components/shared/AppRenderHTML';

const FAQScreen = ({ navigation }: { navigation: any }) => {
  const [activeItems, setActiveItems] = React.useState<number[]>([]);
  const faq = useSelector(selectFAQ);
  const isActive = (index: number) => activeItems.includes(index);

  const handleToggleQuestion = (index: number) => {
    setActiveItems(activeItem =>
      activeItem.includes(index)
        ? activeItems.filter(item => item !== index)
        : [...activeItems, index],
    );
  };
  return (
    <ScreenView screenPaddings={true}>
      <BackButtonHeader title="Часто задаваемые вопросы" onBackButtonPress={navigation.goBack} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.questionsList}>
            {faq.map((question, index) => (
              <View
                key={question.id}
                style={{ borderBottomWidth: 1, borderBottomColor: Colors.grey }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => handleToggleQuestion(index)}>
                  <View
                    style={[styles.question, isActive(index) ? styles.questionActive : undefined]}>
                    <AppText style={styles.questionText}>{question.question}</AppText>
                    {isActive(index) ? <IconArrowUp /> : <IconArrowDown />}
                  </View>
                </TouchableOpacity>
                {isActive(index) && (
                  <View style={{ paddingBottom: 16 }}>
                    <AppRenderHTML text={question.answer} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  questionsList: {
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
  },
  questionActive: {
    paddingBottom: 4,
  },
  questionText: {
    maxWidth: 278,
    color: 'black',
    lineHeight: 21,
    fontSize: 14,
  },
  answerText: {
    color: Colors.black,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
  },
});

export default FAQScreen;
