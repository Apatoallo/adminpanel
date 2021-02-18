import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import LeftMenu from '../../../components/left-menu/LeftMenu';
import Avatar from '../../../components/avatar/Avatar';
import { AvatarIcon } from '../../../components/icons/Icons';
import I18n from '../../../common/i18n/I18n';

const styles = theme => ({
  link: {
    color: theme.colors.textColor.blue,
    fontWeight: '500'
  },
  avatarIcon: {
    fill: theme.colors.background.avatarIcon
  }
});

const menuItems = [
  { i18nKey: 'settings_menu_account_settings', to: '/settings/account' },
  { i18nKey: 'settings_menu_security_settings', to: '/settings/security' },
  {
    i18nKey: 'settings_menu_notification_settings',
    to: '/settings/notification'
  },
  {
    i18nKey: 'settings_menu_activity_history',
    to: '/settings/activity-history'
  }
];

const SettingsMenu = props => (
  <LeftMenu
    header={
      props.userInfo && (
        <Avatar
          avatarIcon={
            <AvatarIcon className={props.classes.avatarIcon} size="40" />
          }
          text={props.userInfo.full_name}
          detailText={
            <Link className={props.classes.link} to="/settings/account">
              {I18n.translate(
                props.userInfo.verified_level < 3
                  ? 'avatar_verification_label'
                  : 'avatar_verified_account_label'
              )}
            </Link>
          }
        />
      )
    }
    items={menuItems}
  />
);

export default withStyles(styles)(SettingsMenu);
