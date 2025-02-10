import React from 'react';

import { View, Text, FlatList } from 'react-native';
import { Row, ScreenView } from '~components/view';
import BackButtonHeader from '~components/widgets/headers/BackButton.header';
import GiftIcon from '~assets/icons/gift.svg';
import GemIcon from '~assets/icons/gem.svg';
import { Colors } from '~constants/colors.constants';
import { HorizontalSeparator } from '~components/shared/GapH';
import styles from './Notificatiom.styles';
import { NotificationsScreenProps } from '~typedefs/screens/Notification';
import { useSelector } from 'react-redux';
import { selectPushNotifications } from '~redux/selectors';
import NotificationService from '~services/Notification.service';
import { INotification } from '~typedefs/models/Notification.model';

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const unReadedIds = React.useRef<Set<INotification['id']>>(new Set(null));
  const notifications = useSelector(selectPushNotifications);
  const [isFetching, setIsFetching] = React.useState(false);

  const setReaded = () => {
    if (unReadedIds.current.size)
      setTimeout(() => {
        NotificationService.readNotification([...unReadedIds.current]).catch(err =>
          console.error('Err to set notification read', err?.message),
        );
      }, 5000);
  };
  const onRefresh = () => {
    setIsFetching(() => {
      NotificationService.getNotifications()
        .then(() => {
          setIsFetching(false);
        })
        .catch(err => console.error('err to get notifications:', err?.message));
      return true;
    });
  };
  return (
    <ScreenView screenPaddings={false}>
      <BackButtonHeader paddings title="Уведомления" onBackButtonPress={navigation.goBack} />
      <FlatList
        data={notifications}
        ItemSeparatorComponent={HorizontalSeparator}
        // ListEmptyComponent={ItemToolCardWideEmpty}
        renderItem={({ item }) => {
          if (!item.is_read) {
            unReadedIds.current.add(item?.id);
          }
          return (
            <Row style={[styles.container, item.is_read ? { backgroundColor: Colors.white } : {}]}>
              <View style={[styles.icon, item.is_read ? { backgroundColor: Colors.grey } : {}]}>
                {item.is_read ? <GiftIcon /> : <GemIcon />}
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.description}</Text>
              </View>
            </Row>
          );
        }}
        keyExtractor={item => item.id}
        onEndReached={setReaded}
        onRefresh={onRefresh}
        refreshing={isFetching}
      />
    </ScreenView>
  );
};

export default NotificationsScreen;
