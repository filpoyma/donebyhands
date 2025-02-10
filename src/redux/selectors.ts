import { TStoreState } from '~redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectOverlayState = (state: TStoreState) => state.app.isOverlayShown;
export const selectIsOnboardingPassed = (state: TStoreState) => state.app.onBoardingPassed;

export const selectPrivacyPolicy = (state: TStoreState) => state.app.generalSettings.privacy_policy;
export const selectTermsOfService = (state: TStoreState) =>
  state.app.generalSettings.terms_of_service;
export const selectRentRules = (state: TStoreState) => state.app.generalSettings.rent_rules;

export const selectSupportPhNumber = (state: TStoreState) => state.app.generalSettings.call_phone;
export const selectSupportLink = (state: TStoreState) => state.app.generalSettings.write_to_chat;
export const selectSupportIcon = (state: TStoreState) => state.app.generalSettings.support_icon;
export const selectFAQ = (state: TStoreState) => state.app.generalSettings.faq_blocks;
export const selectIsNewVersionAvailable = (state: TStoreState) => state.app.isNewVersionAvailable;

export const selectLoginInfo = (state: TStoreState) => state.auth.isLoggedIn;
export const selectUser = (state: TStoreState) => state.auth.user;
export const selectUserPoints = (state: TStoreState) => state.auth.user?.points;
export const selectUserBindingsCards = (state: TStoreState) => state.auth.user?.bindings;
export const selectPushNotifications = (state: TStoreState) => state.notification.list;

export const selectOnboardingImages = (state: TStoreState) =>
  state.app.generalSettings?.onboarding_slides;

export const selectTools = (state: TStoreState) => state.rent.tools;

export const selectPostomats = (state: TStoreState) => state.parcelLockers.list;

const selectParcelLocker = (state: TStoreState) => state.parcelLockers.byId;
export const selectParcelLockersTools = createSelector(
  [selectParcelLocker, selectTools],
  (parcelLocker, tools) =>
    tools.filter(tool => parcelLocker.cells.find(cell => `${cell.tool_id}` === tool?.id)),
);

export const selectPostomatId = (state: TStoreState) => state.order.current.postomatId;
export const selectOrder = (state: TStoreState) => state.order.current;
export const selectPromocodes = (state: TStoreState) => state.order.current.promocodes;
export const selectToolId = (state: TStoreState) => state.order.current.toolId;

export const selectTool = createSelector([selectTools, selectToolId], (toolsCards, toolId) =>
  toolsCards.find(tool => tool.id.toString() === toolId.toString()),
);

export const selectToolByIdById = (id: string) => (state: TStoreState) => {
  return state.rent.tools.find(tool => tool.id === id);
};

export const selectPostomat = createSelector(
  [selectPostomats, selectPostomatId],
  (postomats, postomatId) => postomats.find(postomat => `${postomat?.id}` === `${postomatId}`),
);

export const selectRentedToolsModel = (state: TStoreState) => state.rent.rentedTools;
export const selectCurrentRentedTools = (state: TStoreState) => state.rent.currentRentedTools;
export const selectCurRentedToolsLength = (state: TStoreState) =>
  state.rent.currentRentedTools.length;

export const selectExtendOrder = (state: TStoreState) => state.order.extend;
export const selectUserPosition = (state: TStoreState) => state.map.userPosition;

export const selectExtendsTariffs = (state: TStoreState) => state.rent.extendsTariffs;
