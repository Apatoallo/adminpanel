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
  { i18nKey: 'exen_menu_exen_profile', to: '/exen/profile' },
  { i18nKey: 'exen_menu_exen_infographic', to: '/exen/exen-coin-information' },
  { i18nKey: 'exen_menu_exen_stats', to: '/exen/stats' }
];

const ExenMenu = props => (
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

export default withStyles(styles)(ExenMenu);
