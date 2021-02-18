import React from 'react';
import InfoBar from '../../../components/info-bar/InfoBar';
import CustomerForm from '../../../components/customer-form/CustomerForm';
import VerificationContainer from '../../../components/verification-form/VerificationContainer';
import I18n from '../../../common/i18n/I18n';

class AccountSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.getDetail();

    this.state = {
      infoBarOpen: true,
      messages: [
        {
          type: this.props.userInfo.verified_level < 3 ? 'warning' : null,
          text: I18n.translate(
            this.props.userInfo.verified_level < 3
              ? `account_settings_verification_info_level${
                  this.props.userInfo.verified_level
                }`
              : 'account_settings_verification_info_level3_and_above'
          )
        }
      ],
      showVerificationArea: false
    };
  }

  handleInfoBarClose = () => {
    this.setState({ infoBarOpen: false });
  };

  sendSms = (countryCode, phoneNumber) => {
    const data = { country_code: countryCode, phone_number: phoneNumber };

    this.props
      .sendSms(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_sms_sent_success_message')
          );
          this.setState({ showVerificationArea: true });
        }
      })
      .catch(() => {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description'),
          okButtonText: I18n.translate('general_ok')
        });
      });
  };

  changeLanguage = langCode => {
    const data = { language: langCode };
    this.props
      .changeLanguage(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.getDetail().then(() => {
            this.props.showSnackbar(
              I18n.translate('settings_language_changed_success_message')
            );
            I18n.language = langCode.toUpperCase();
            window.location.reload();
          });
        }
      })
      .catch(() => {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description'),
          okButtonText: I18n.translate('general_ok')
        });
      });
  };

  verify = code => {
    const data = { token: code };

    this.props
      .verify(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_phone_number_verification_success_message')
          );
          this.props.getDetail();
        }
      })
      .catch(() => {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description'),
          okButtonText: I18n.translate('general_ok')
        });
      });
  };

  render() {
    const { handleInfoBarClose, sendSms, verify, changeLanguage } = this;
    const { messages, infoBarOpen, showVerificationArea } = this.state;
    const { userInfo, showDialog } = this.props;
    return (
      <div>
        {infoBarOpen && (
          <InfoBar
            messages={messages}
            closable={true}
            onClose={handleInfoBarClose}
          />
        )}
        <CustomerForm
          showDialog={showDialog}
          userInfo={userInfo}
          sendSms={sendSms}
          verify={verify}
          changeLanguage={changeLanguage}
          showVerificationArea={showVerificationArea}
        />
        <VerificationContainer userInfo={userInfo} />
      </div>
    );
  }
}

export default AccountSettings;
