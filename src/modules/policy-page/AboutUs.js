import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import I18n from '../../common/i18n/I18n';

const styles = {
  foundersTitle: {
    fontSize: '24px',
    color: '#3ab2ee',
    fontWeight: '700',
    marginBottom: '50px'
  },
  linkedInButtonSpan: {
    marginLeft: '5px',
    fontSize: '16px',
    textTransform: 'none',
    color: '#0077B5'
  }
};

const AboutUs = props => {
  const { classes } = props;
  return (
    <div>
      <h1 className={classes.foundersTitle}>
        {I18n.translate('about_us_label')}
      </h1>

      {I18n.language === 'TR' && (
        <div>
          <p>
            Bitexen, Türkiye’de kurulu ve İTÜ ARI Teknokent teknoloji geliştirme
            bölgesinde faaliyet gösteren Bitexen Teknoloji A.Ş tarafından
            geliştirilmiş, bir online kripto-para alım satım platformudur.
          </p>

          <p>
            Bitexen; bankacılık, parite ve türev yatırım araçları alım satım
            platformları, ödeme sistemleri, bilgi güvenliği , finansal
            suistimallerin önlenmesi ve inovasyon konularında yıllarca çalışmış
            olan Türk mühendisler tarafından geliştirilmiştir.
          </p>

          <p>
            Bitexen; mevcut yerel ve global kripto-para alım satım platformları
            analiz edilerek , yenilikçi ve kripto-para yatırımcısının temel
            ihtiyaçlarına en iyi şekilde cevap verecek global platformu
            oluşturma hedefiyle hayata geçirilmiştir.
          </p>

          <p>
            Bitexen; halihazırda hem yurtiçi hemde yurtdışı piyasalara
            Whitelabel çözümler sunmaktadır.
          </p>

          <p>
            İstanbul Ticaret Odası'na kayıtlı Bitexen Ticaret A.Ş. , 2.210.000
            Türk Lirası ödenmiş sermaye ile hizmet vermektedir.
          </p>
        </div>
      )}

      {I18n.language === 'EN' && (
        <div>
          <p>
            Bitexen, Türkiye’de kurulu ve İTÜ ARI Teknokent teknoloji geliştirme
            bölgesinde faaliyet gösteren Bitexen Teknoloji A.Ş tarafından
            geliştirilmiş, bir online kripto-para alım satım platformudur.
          </p>

          <p>
            Bitexen; bankacılık, parite ve türev yatırım araçları alım satım
            platformları, ödeme sistemleri, bilgi güvenliği , finansal
            suistimallerin önlenmesi ve inovasyon konularında yıllarca çalışmış
            olan Türk mühendisler tarafından geliştirilmiştir.
          </p>

          <p>
            Bitexen; mevcut yerel ve global kripto-para alım satım platformları
            analiz edilerek , yenilikçi ve kripto-para yatırımcısının temel
            ihtiyaçlarına en iyi şekilde cevap verecek global platformu
            oluşturma hedefiyle hayata geçirilmiştir.
          </p>

          <p>
            Bitexen; halihazırda hem yurtiçi hemde yurtdışı piyasalara
            Whitelabel çözümler sunmaktadır.
          </p>

          <p>
            İstanbul Ticaret Odası'na kayıtlı Bitexen Ticaret A.Ş. , 2.210.000
            Türk Lirası ödenmiş sermaye ile hizmet vermektedir.
          </p>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(AboutUs);
