import lscache from 'lscache';
import ReduxStore from '../redux/ReduxStore';
import moment from 'moment/moment';
import { pushNewAnnouncement } from '../../components/page/PageActions';

export const pushAnnouncementIfNeeded = data => {
  lscache.flushExpired();
  const allowDuplicates = JSON.parse(
    data.allow_duplicate.toString().toLowerCase()
  );
  if (data.ann_type === 'O' && !allowDuplicates) {
    if (!lscache.get(data.announcement_id)) {
      const diffInMinutes = moment(data.expire_time).diff(moment(), 'minutes');
      if (diffInMinutes > 0) {
        lscache.set(data.announcement_id, data.announcement_id, diffInMinutes);
        ReduxStore.store.dispatch(pushNewAnnouncement(data));
      }
    }
  } else {
    ReduxStore.store.dispatch(pushNewAnnouncement(data));
  }
};
