import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';

import { Row, ScreenView } from '~components/view';
import ShareIcon from '~assets/icons/share.svg';
import { Screens } from '~constants/navigators.constants';
import { BackButtonHeader } from '~components/widgets/headers';
import { onShareTools } from '~utils/helpers.utils';
import { AppText, HeaderText } from '~components/shared/text';
import ItemPage from '~components/widgets/ItemPage';
import { BaseButton } from '~components/shared/buttons';
import styles from './ToolsPage.styles';
import { ToolsPageScreenProps } from '~typedefs/screens/ToolsPage';
import { selectPostomatId, selectTools } from '~redux/selectors';
import { metricaLink } from '~constants/api.constants';
import { orderActions } from '~redux/reducers/order';
import rentService from '~services/Rent.service';
import MapInFrameScreen from '~screens/BottomTab/Map/MapInFrame.screen';
import renderLoading from '../../../components/shared/Loaders/appLoader';
import { Colors } from '~constants/colors.constants';
import { formatTimeString } from '~utils/dateFormatters.utils';

const ToolsPageScreen: React.FC<ToolsPageScreenProps> = ({ navigation, route }) => {
  const { itemId: toolId } = route.params;
  const additionalToolDataInit = {
    available: false,
    name: '',
    parce_locker_id: '',
    message: '',
  };
  const [additionalToolData, setAdditionalToolData] = React.useState(additionalToolDataInit);
  const isSelectedToolNotInPostomat = !additionalToolData.available;
  const [isLoading, setIsLoading] = React.useState(true);
  const toolsCards = useSelector(selectTools);
  const postomatId = useSelector(selectPostomatId);
  const dispatch = useDispatch();
  const isFirstRender = React.useRef(true);
  const tool = toolsCards.find(item => item.id.toString() === toolId);
  const toolImages = tool?.images.map(image => ({ id: image.id, uri: image.image })) || [];

  React.useLayoutEffect(() => {
    dispatch(orderActions.clearCurrentOrder(postomatId));
    dispatch(orderActions.updateCurrentOrder({ toolId }));
  }, []);

  React.useEffect(() => {
    if (!postomatId) {
      setAdditionalToolData(additionalToolDataInit);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    rentService
      .getTool(toolId)
      .then(availTool => {
        const selectedTool = availTool?.availability_status.find(
          postomat => postomat?.parce_locker_id === postomatId,
        );
        if (selectedTool) setAdditionalToolData(selectedTool);
        else setAdditionalToolData(additionalToolDataInit);
      })
      .catch(err => {
        console.error('Get Tool Error', err?.message);
        setAdditionalToolData(additionalToolDataInit);
      })
      .finally(() => {
        setIsLoading(false);
        isFirstRender.current = false;
      });
  }, [postomatId, toolId]);

  const onShareHandler = React.useCallback(() => {
    onShareTools(`Аренда инструмента "${tool?.name}" без залога. \n\n ${metricaLink}`);
  }, [tool?.name]);

  const onSubmit = React.useCallback(async () => {
    if (!postomatId) return;
    navigation.navigate(Screens.arrangeRental);
  }, [navigation, postomatId]);

  const onPressInstruction = React.useCallback(() => {
    const pdfUri = tool?.instruction;
    if (!pdfUri) return;
    navigation.navigate(Screens.pdfViewer, { pdfUri });
  }, [tool?.instruction]);

  return (
    <ScreenView fullArea screenPaddings={true}>
      <BackButtonHeader
        RightIcon={ShareIcon}
        onBackButtonPress={navigation.goBack}
        onRightButtonPress={onShareHandler}
      />
      <HeaderText size="h2" centered={false}>
        {tool?.name}
      </HeaderText>
      <View style={styles.images}>
        <ItemPage
          item={{
            images: toolImages,
            description: tool?.description || '',
            onPressInstruction: onPressInstruction,
            id: tool?.id,
          }}
        />
      </View>
      <HeaderText size="h4" centered={false} style={styles.headerText}>
        Ближайший постамат
      </HeaderText>
      <View style={styles.mapFrame}>
        {(!isLoading || !isFirstRender.current) && (
          <MapInFrameScreen
            toolId={toolId}
            isSelectedToolNotInPostomat={isSelectedToolNotInPostomat}
          />
        )}
      </View>
      <Row style={styles.leaseButton}>
        <Row style={styles.text}>
          <AppText style={styles.textStyle}>От </AppText>
          <HeaderText>{tool?.price}</HeaderText>
          <AppText style={styles.textStyle}> руб.</AppText>
        </Row>
        <View style={{ flex: 1 }}>
          <BaseButton
            text={
              isLoading
                ? ''
                : isSelectedToolNotInPostomat
                ? formatTimeString(additionalToolData.message) || 'Недоступно'
                : 'К тарифам'
            }
            disabled={isSelectedToolNotInPostomat || isLoading}
            onPress={onSubmit}
          />
          {renderLoading(isLoading, Colors.grey3, 25)}
        </View>
      </Row>
    </ScreenView>
  );
};

export default ToolsPageScreen;
