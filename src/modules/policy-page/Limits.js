import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../common/i18n/I18n';
import StyledPaper from '../../components/common/StyledPaper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  pageContainer: {},
  topPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomPanel: {
    marginTop: '24px'
  },
  commissionArea: {
    minWidth: '44.5%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: '24px'
  },
  commissionLabel: {
    fontSize: '16px',
    color: 'rgba(48, 66, 98, 0.87)'
  },
  commissionRatio: {
    fontSize: '18px',
    fontWeight: '900',
    color: 'rgba(48, 66, 98, 0.87)'
  },
  limitsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 32px 36px 16px'
  },
  limitRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: '24px'
  },
  description: {
    fontSize: '15px'
  },
  xx: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  depositPanel: {
    marginRight: '48px'
  },
  mainTitle: {
    fontWeight: '500',
    marginBottom: '20px',
    fontSize: '16px',
    color: '#3ab2ee'
  },
  title: {
    fontWeight: '500',
    marginBottom: '15px',
    paddingBottom: '10px',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: 'dashed 1px rgba(48, 66, 98, 0.12)',
    paddingLeft: '33%',
    '@media screen and (min-width: 801px)': {
      paddingLeft: '23%'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    color: 'rgba(48, 66, 98, 0.87)'
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '8px',
    width: '310px'
  },
  label: {
    fontSize: '15px',
    width: '100px'
  },
  text: {
    fontSize: '15px',
    fontWeight: '500',
    width: '100px'
  }
});

const Fees = ({ classes }) => (
  <div className={classes.pageContainer}>
    <Grid container spacing={3} className={classes.grid}>
      <Grid xs={12} item className={classes.leftGrid}>
        <StyledPaper className={classes.commissionArea}>
          <div className={classes.container}>
            <div className={classes.mainTitle}>
              {I18n.translate('limits_page_not_verified_account')}
            </div>
            <div className={classes.xx}>
              <Grid container spacing={3} className={classes.grid}>
                <Grid sm={12} md={6} lg={5} item className={classes.leftGrid}>
                  <div className={classes.depositPanel}>
                    <div className={classes.title}>
                      {I18n.translate('transfer_transfer_types_D')}
                    </div>
                    <div className={classes.line}>
                      <div className={classes.text}>
                        {I18n.translate('landing_page_fees_currency')}
                      </div>
                      <div className={classes.text}>
                        {I18n.translate('limits_page_24h_label')}
                      </div>
                      <div className={classes.text}>
                        {I18n.translate('limits_page_30d_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>Bitcoin</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>XRP</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>XLM</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>ETH</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>EXEN</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>
                        {I18n.translate('landing_page_fees_try_title')}
                      </div>
                      <div className={classes.label}>500 TL</div>
                      <div className={classes.label}>10000 TL</div>
                    </div>
                  </div>
                </Grid>
                <Grid sm={12} md={6} lg={5} item className={classes.leftGrid}>
                  <div>
                    <div className={classes.title}>
                      {I18n.translate('transfer_transfer_types_W')}
                    </div>
                    <div className={classes.line}>
                      <div className={classes.text}>
                        {I18n.translate('landing_page_fees_currency')}
                      </div>
                      <div className={classes.text}>
                        {I18n.translate('limits_page_24h_label')}
                      </div>
                      <div className={classes.text}>
                        {I18n.translate('limits_page_30d_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>Bitcoin</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>XRP</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>XLM</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>ETH</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>EXEN</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>
                        {I18n.translate('landing_page_fees_try_title')}
                      </div>
                      <div className={classes.label}>500 TL</div>
                      <div className={classes.label}>10000 TL</div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </StyledPaper>
        <StyledPaper className={classes.commissionArea}>
          <div className={classes.container}>
            <div className={classes.mainTitle}>
              {I18n.translate('limits_page_verified_account')}
            </div>
            <div className={classes.xx}>
              <Grid container spacing={3} className={classes.grid}>
                <Grid sm={12} md={6} lg={5} item className={classes.leftGrid}>
                  <div className={classes.depositPanel}>
                    <div className={classes.title}>
                      {I18n.translate('transfer_transfer_types_D')}
                    </div>
                    <div className={classes.line}>
                      <div className={classes.text}>
                        {I18n.translate('landing_page_fees_currency')}
                      </div>
                      <div className={classes.text}>
                        {I18n.translate('limits_page_24h_label')}
                      </div>
                      <div className={classes.text}>
                        {I18n.translate('limits_page_30d_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>Bitcoin</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>XRP</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>XLM</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>ETH</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>EXEN</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>
                        {I18n.translate('landing_page_fees_try_title')}
                      </div>
                      <div className={classes.label}>500000 TL</div>
                      <div className={classes.label}>2500000 TL</div>
                    </div>
                  </div>
                </Grid>
                <Grid sm={12} md={6} lg={5} item className={classes.leftGrid}>
                  <div>
                    <div className={classes.title}>
                      {I18n.translate('transfer_transfer_types_W')}
                    </div>
                    <div className={classes.line}>
                      <div className={classes.text}>
                        {I18n.translate('landing_page_fees_currency')}
                      </div>
                      <div className={classes.text}>
                        {I18n.translate('limits_page_24h_label')}
                      </div>
                      <div className={classes.text}>
                        {I18n.translate('limits_page_30d_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>Bitcoin</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>XRP</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>XLM</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>ETH</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>EXEN</div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                      <div className={classes.label}>
                        {I18n.translate('limits_page_limitless_label')}
                      </div>
                    </div>
                    <div className={classes.line}>
                      <div className={classes.label}>
                        {I18n.translate('landing_page_fees_try_title')}
                      </div>
                      <div className={classes.label}>500000 TL</div>
                      <div className={classes.label}>2500000 TL</div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </StyledPaper>
        <StyledPaper className={classes.commissionArea}>
          <div className={classes.container}>
            <div className={classes.mainTitle}>
              {I18n.translate('limits_page_deposit_rules')}
            </div>
            <div className={classes.description}>
              <p>
                Bitexen hesabınıza banka hesabınızdan TL yatırırken aşağıdaki
                kurallara mutlaka dikkat etmeniz gerekmektedir:
              </p>
              <ul>
                <li>
                  TL yatırma işlemlerinizi yalnızca adınıza kayıtlı, Türk Lirası
                  hesaplarınız üzerinden gerçekleştirmeniz gerekmektedir.
                </li>
                <li>
                  Alıcı adı/ünvanı kısmında Bitexen Teknoloji Anonim Şirketi
                  yazmanız gerekmektedir.
                </li>
                <li>En az 100 TL gönderim yapabilirsiniz.</li>
                <li>
                  Tek seferde veya toplamda yapacağınız TL gönderimleri, günlük
                  ve aylık limitleriniz dahilinde olmalıdır. Güncel
                  limitlerinizi Hesaplarım -> Limitlerim ekranından kontrol
                  edebilirsiniz.
                </li>
                <li>
                  Bitexen hesabınızda size özel üretilmiş olan açıklama kodu,
                  banka gönderiminizde işlem açıklamasında mutlaka tam olarak
                  belirtilmelidir ve bu kod her gönderim öncesinde Bitexen
                  üzerinden tekrar kontrol edilmelidir.
                </li>
              </ul>
              <p>
                Yukarıdaki koşullara uymayan TL gönderimleri, işlem ücreti
                kesildikten sonra tarafınıza 5 iş günü içinde iade edilecektir.
              </p>
              <p>
                Ayrıca, aşağıda belirtilen şekilde yapılan gönderimler her
                koşulda geçersiz sayılmaktadır ve iade süreci için sizden ek
                bilgiler (kimlik kanıtı, IBAN, vb.) talep edilmektedir:
              </p>
              <ul>
                <li>
                  ATM’den gönderilen tutarlar, IBAN bilgisi bulunmadığı ve
                  gönderen teyit edilemediği için kabul edilmemektedir. Bu tür
                  TL yatırma işlemlerinde yatırılan tutar, adınıza ait banka
                  IBAN bilginizi ve geçerli kimliğinizi destek@bitexen.com
                  adresine gönderdiğiniz takdirde, işlem ücreti kesilerek, 5 iş
                  günü içinde banka hesabınıza iade edilecektir.
                </li>
                <li>
                  Kredi kartı, banka şube gişelerinden yapılan işlemler IBAN
                  bilgisi bulunmadığı ve gönderen teyit edilemediği için kabul
                  edilmemektedir.Bu tür TL yatırma işlemlerinde yatırılan tutar,
                  adınıza ait banka IBAN bilginizi ve geçerli kimliğinizi
                  destek@bitexen.com adresine gönderdiğiniz takdirde, işlem
                  ücreti kesilerek, 5 iş günü içinde banka hesabınıza iade
                  edilecektir.
                </li>
              </ul>
            </div>
          </div>
        </StyledPaper>
        <StyledPaper className={classes.commissionArea}>
          <div className={classes.container}>
            <div className={classes.mainTitle}>
              {I18n.translate('limits_page_withdraw_rules')}
            </div>
            <div className={classes.description}>
              <p>
                Bitexen hesabınızdan banka hesabınıza TL çekerken aşağıdaki
                kurallara mutlaka dikkat etmeniz gerekmektedir:
              </p>
              <ul>
                <li>
                  Sadece adınıza ait banka hesaplarınıza para çekme talebinde
                  bulunabilirsiniz. Adınıza olmayan banka hesaplarına
                  yapacağınız çekme işlemleri alıcı banka tarafından iade
                  edilecek, tutarın Bitexen hesabınıza iadesi için de ek
                  süreçler gerekecektir.
                </li>
                <li>Minimum 50 TL para çekme talebinde bulunabilirsiniz.</li>
                <li>
                  Tek seferde veya toplamda yapacağınız TL gönderimleri, günlük
                  ve aylık limitleriniz dahilinde olmalıdır. Güncel
                  limitlerinizi Hesaplarım -> Limitlerim ekranından kontrol
                  edebilirsiniz.
                </li>
                <li>
                  Çekim işlemlerinde transferler EFT yolu ile ve banka mesai
                  saatleri içinde yapılmaktadır.
                </li>
              </ul>
            </div>
          </div>
        </StyledPaper>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(Fees);
