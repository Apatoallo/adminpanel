import { MODAL_TYPES } from './pageConstants';
import * as uuid from 'uuid/v1';
import I18n from '../../common/i18n/I18n';
import ReduxStore from '../../common/redux/ReduxStore';

export const PAGE_ACTIONS = {
  SHOW_MODAL: 'SHOW_MODAL',
  SHOW_SNACKBAR: 'SHOW_SNACKBAR',
  SHOW_LOADING: 'SHOW_LOADING',
  HIDE_LOADING: 'HIDE_LOADING',
  PUSH_NEW_ANNOUNCEMENT: 'PUSH_NEW_ANNOUNCEMENT',
  SEND_ANNOUNCEMENT_RESPONSE: 'SEND_ANNOUNCEMENT_RESPONSE'
};

export const showSuccessAlert = (content, action = null) => ({
  type: PAGE_ACTIONS.SHOW_MODAL,
  payload: {
    modalType: MODAL_TYPES.SUCCESS_ALERT,
    content,
    action
  }
});

export const showErrorAlert = (content, action = null) => ({
  type: PAGE_ACTIONS.SHOW_MODAL,
  payload: {
    modalType: MODAL_TYPES.ERROR_ALERT,
    content,
    action
  }
});

export const showDialog = (content, callbacks = {}) => ({
  type: PAGE_ACTIONS.SHOW_MODAL,
  payload: {
    modalType: MODAL_TYPES.DIALOG,
    content,
    callbacks
  }
});

export const showSnackbar = (data, callbacks = {}) => ({
  type: PAGE_ACTIONS.SHOW_SNACKBAR,
  payload: {
    id: data.uuid || uuid(),
    modalType: MODAL_TYPES.SNACKBAR,
    content: { text: data.message || data },
    data,
    callbacks
  }
});

export const showLoading = () => ({
  type: PAGE_ACTIONS.SHOW_LOADING,
  payload: {}
});

export const hideLoading = () => ({
  type: PAGE_ACTIONS.HIDE_LOADING,
  payload: {}
});

export const forceToRefreshAction = () => ({
  type: PAGE_ACTIONS.SHOW_MODAL,
  payload: {
    modalType: MODAL_TYPES.DIALOG,
    content: {
      title: I18n.translate('refresh_required_dialog_title'),
      text: I18n.translate('refresh_required_dialog_text'),
      okButtonText: I18n.translate('refresh_required_dialog_button'),
      strict: true
    },
    callbacks: {
      ok: () => window.location.reload()
    }
  }
});

export const forceToRefresh = () =>
  ReduxStore.store.dispatch(forceToRefreshAction());

export const pushNewAnnouncement = data => ({
  type: PAGE_ACTIONS.PUSH_NEW_ANNOUNCEMENT,
  payload: {
    id: data.uuid || uuid(),
    type: 'ANNOUNCEMENT',
    announcementId: data.announcement_id,
    announcementType: data.ann_type,
    modalType: MODAL_TYPES.DIALOG,
    paragraphs: data.paragraphs,
    responses: data.responses,
    ...JSON.parse(data.ann_text)
  }
});

export const sendAnnouncementResponse = data => ({
  type: PAGE_ACTIONS.SEND_ANNOUNCEMENT_RESPONSE,
  payload: {
    request: {
      method: 'POST',
      url: `/p/v1/user/mark_announcement/`,
      requireToken: true,
      data
    }
  }
});
