import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import dayjs from 'dayjs';

import { Row } from '~components/view';
import BackButtonHeader from '~components/widgets/headers/BackButton.header';
import { Colors } from '~constants/colors.constants';
import { GapV16, GapV24, HorizontalSeparator } from '~components/shared/GapH';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import { MainStackParamList, Screens } from '~constants/navigators.constants';
import { StackScreenProps } from '@react-navigation/stack';
import userApi from '~api/user.api';
import { getQueryParams } from '~utils/helpers.utils';
import { IUserPoints } from '~typedefs/models/User.model';
import ScreenView from '../../../components/view/Screen.view';

type PointsHistoryScreenProps = StackScreenProps<MainStackParamList, Screens.pointsHistory>;

const pointsInit = {
  id: '',
  points: 0,
  created: '',
  type: 0,
};

const PointsHistoryScreen: React.FC<PointsHistoryScreenProps> = ({ navigation }) => {
  const [pointsHistory, setPointsHistory] = React.useState<IUserPoints[]>([pointsInit]);
  const [page, setPage] = React.useState<string | null>('1');
  const fetchMorePoints = async () => {
    if (page === null) return;
    try {
      const data = await userApi.getUserPoints(page);
      const nextPage = data?.next ? getQueryParams(data.next).page : null;
      setPointsHistory(prevPoints => {
        return prevPoints[0]?.id ? [...prevPoints, ...data.results] : data.results;
      });
      setPage(nextPage);
    } catch (err: any) {
      console.error('Err to get userPoints', err?.message);
    }
  };
  return (
    <ScreenView fullArea screenPaddings={false}>
      <BackButtonHeader paddings title="История баллов" onBackButtonPress={navigation.goBack} />
      <FlatList
        data={pointsHistory}
        onEndReached={fetchMorePoints}
        ItemSeparatorComponent={HorizontalSeparator}
        contentContainerStyle={{ flexGrow: 1 }}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={GapV16}
        ListFooterComponent={GapV24}
        // persistentScrollbar={true}
        // ListEmptyComponent={RentedToolsCardEmply}
        keyExtractor={item => `${item?.id}`}
        renderItem={({ item }) => {
          if (!item?.id) return null;
          return (
            <Row style={styles.container}>
              <View style={[styles.icon, item.type === 1 ? { backgroundColor: Colors.black } : {}]}>
                <Text style={styles.iconText}>
                  {item.type === 1 ? item.points * -1 : item.points}
                </Text>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.type === 1 ? 'Списано' : 'Получено'}</Text>
              </View>
              <Text style={styles.subtitle}>{dayjs(item?.created).format('D MMMM HH:mm')}</Text>
            </Row>
          );
        }}
      />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    paddingBottom: SCREEN_PADDINGS.vertical - 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    backgroundColor: Colors.red,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.white,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 16,
    gap: 4,
    justifyContent: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'NatoSans-Bold',
    lineHeight: 18,
  },
  subtitle: {
    color: Colors.weak,
    fontSize: 10,
    fontFamily: 'NatoSans-Regular',
    lineHeight: 12,
  },
});

export default PointsHistoryScreen;
