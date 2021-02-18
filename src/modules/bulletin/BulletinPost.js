import { withStyles } from '@material-ui/core/styles';
import { Card } from 'antd';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { withRouter, Link } from 'react-router-dom';
import I18n from '../../common/i18n/I18n';
import Footer from './../landing-page/footer/Footer';
import Header from './../landing-page/header/Header';
import HeaderMenu from './../landing-page/header/HeaderMenu';
import style from './BulletinPost.module.scss';
import classNames from 'classnames';
import StyledPaper from '../../components/common/StyledPaper';
import { MenuArrow } from '../../components/icons/Icons';
import { Divider } from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: '#304262',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media screen and (max-width: 600px)': {
      paddingLeft: '16px'
    },
    '@media screen and (min-width: 801px)': {
      paddingLeft: '60px'
    },
    '@media screen and (min-width: 1280px)': {
      paddingLeft: '118px'
    },
    padding: '10px 0 10px 16px'
  },
  grid: {
    display: 'flex',
    width: '100%',
    minHeight: '630px',
    flexDirection: 'row',
    '@media screen and (min-width: 1280px)': {
      margin: '0 118px'
    },
    '@media screen and (min-width: 801px) and (max-width: 1279px)': {
      margin: '0 60px'
    },
    '@media screen and (min-width: 601px) and (max-width: 800px)': {
      margin: '0 12px'
    },
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  leftGrid: {
    '@media screen and (min-width: 1280px)': {
      width: '300px'
    },
    '@media screen and (min-width: 801px) and (max-width: 1279px)': {
      width: '250px'
    },
    '@media screen and (min-width: 601px) and (max-width: 800px)': {
      width: '200px'
    },
    '@media screen and (max-width: 600px)': {
      width: '100%'
    }
  },
  rightGrid: {
    marginLeft: '24px',
    '@media screen and (min-width: 1280px)': {
      width: 'calc(100% - 300px)'
    },
    '@media screen and (min-width: 801px) and (max-width: 1279px)': {
      width: 'calc(100% - 250px)'
    },
    '@media screen and (min-width: 601px) and (max-width: 800px)': {
      width: 'calc(100% - 200px)'
    },
    '@media screen and (max-width: 600px)': {
      display: 'block',
      width: '100%',
      margin: '0 0 24px'
    }
  },
  menuItems: {
    padding: '10px 0'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    boxSizing: 'border-box'
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    padding: '16px',
    color: 'rgba(48, 66, 98, 0.87)'
  },
  divider: {
    height: '2px',
    margin: '9px 0',
    backgroundColor: '#f0f0f0'
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'rgba(48, 66, 98, 0.87)',
    cursor: 'pointer',
    padding: '9px 10.5px 9px 16px',
    boxSizing: 'border-box',
    fontSize: '16px',
    textDecoration: 'none'
  },
  linkSelected: {
    color: '#3ab2ee',
    fontWeight: '500'
  },
  subLink: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15px',
    color: theme.colors.textColor.menuItem,
    cursor: 'pointer',
    paddingRight: '10.5px',
    boxSizing: 'border-box',
    fontSize: '13px',
    textDecoration: 'none'
  },
  icon: {
    stroke: '#4b5a76'
  },
  iconSelected: {
    stroke: '#3ab2ee'
  },
  content: {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 0',
    '@media screen and (max-width: 600px)': {
      paddingLeft: '16px',
      paddingRight: '16px'
    }
  }
});

class BulletinPostPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);

    this.state = {
      showMenu: false,
      activeTab: 'content_mains'
    };
  }

  componentDidMount() {
    const { id, contentType } = this.props.match.params;
    if (id && contentType) {
      this.getBulletinPost(id, contentType);
    }
  }

  async getBulletinPost(id, contentType) {
    try {
      await this.props.getBulletinPost(id, contentType);
    } catch (error) {
      console.error(error);
    }
  }

  toggleView(open) {
    this.setState({ showMenu: open });
  }

  render() {
    const { showMenu } = this.state;
    const { classes, tickers, posts, location, match } = this.props;

    return (
      <DocumentTitle
        title={
          tickers && tickers.length > 0 && tickers[0]
            ? `(${tickers[0].last_price} ${
                tickers[0].market.counter_currency_code
              }) ${I18n.translate('site_title')}`
            : I18n.translate('site_title')
        }
      >
        <div>
          <div className={classes.root}>
            <Header onClick={this.toggleView} />
            {showMenu && <HeaderMenu />}
          </div>
          <div className={classes.content}>
            <div className={classes.grid}>
              <div className={classes.leftGrid}>
                <StyledPaper className={classes.container}>
                  <div className={classes.menuItems}>
                    <div>
                      <Link
                        to="/bulletin/market_notes/all"
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            match.params.contentType === 'market_notes'
                        })}
                      >
                        {I18n.translate('bulletin_analysis_title')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              match.params.contentType === 'market_notes'
                          })}
                        />
                      </Link>

                      <div>
                        <div className="pl-4">
                          <Link
                            className={classNames(classes.subLink, {
                              [classes.linkSelected]:
                                location.pathname ===
                                '/bulletin/market_notes/daily'
                            })}
                            to="/bulletin/market_notes/daily"
                          >
                            Günlük
                            <MenuArrow
                              className={classNames(classes.icon, {
                                [classes.iconSelected]:
                                  location.pathname ===
                                  '/bulletin/market_notes/daily'
                              })}
                            />
                          </Link>
                        </div>

                        <div className="pl-4 mt-2">
                          <Link
                            className={classNames(classes.subLink, {
                              [classes.linkSelected]:
                                location.pathname ===
                                '/bulletin/market_notes/weekly'
                            })}
                            to="/bulletin/market_notes/weekly"
                          >
                            Haftalık
                            <MenuArrow
                              className={classNames(classes.icon, {
                                [classes.iconSelected]:
                                  location.pathname ===
                                  '/bulletin/market_notes/weekly'
                              })}
                            />
                          </Link>
                        </div>
                      </div>

                      <Divider className={classes.divider} />

                      <Link
                        to="/bulletin/market_news/all"
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            match.params.contentType === 'market_news'
                        })}
                      >
                        {I18n.translate('bulletin_news_title')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              match.params.contentType === 'market_news'
                          })}
                        />
                      </Link>

                      <div>
                        <div className="pl-4">
                          <Link
                            className={classNames(classes.subLink, {
                              [classes.linkSelected]:
                                location.pathname ===
                                '/bulletin/market_news/blockchain'
                            })}
                            to="/bulletin/market_news/blockchain"
                          >
                            Blockchain
                            <MenuArrow
                              className={classNames(classes.icon, {
                                [classes.iconSelected]:
                                  location.pathname ===
                                  '/bulletin/contemarket_newsnt_mains/blockchain'
                              })}
                            />
                          </Link>
                        </div>

                        <div className="pl-4 mt-2">
                          <Link
                            className={classNames(classes.subLink, {
                              [classes.linkSelected]:
                                location.pathname ===
                                '/bulletin/market_news/trend'
                            })}
                            to="/bulletin/market_news/trend"
                          >
                            Trend
                            <MenuArrow
                              className={classNames(classes.icon, {
                                [classes.iconSelected]:
                                  location.pathname ===
                                  '/bulletin/market_news/trend'
                              })}
                            />
                          </Link>
                        </div>

                        <div className="pl-4 mt-2">
                          <Link
                            className={classNames(classes.subLink, {
                              [classes.linkSelected]:
                                location.pathname ===
                                '/bulletin/market_news/article'
                            })}
                            to="/bulletin/market_news/article"
                          >
                            Makale
                            <MenuArrow
                              className={classNames(classes.icon, {
                                [classes.iconSelected]:
                                  location.pathname ===
                                  '/bulletin/market_news/article'
                              })}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </StyledPaper>
              </div>
              <div className={classes.rightGrid}>
                {posts &&
                  posts.length > 0 &&
                  posts.map(b => (
                    <Card
                      key={b.post_id}
                      title={b.title}
                      bordered={false}
                      className="mt-2"
                    >
                      {b.image_url && (
                        <img width="100%" alt={b.title} src={b.image_url} />
                      )}

                      <div className={`${style.postContent} mt-2`}>
                        <div
                          dangerouslySetInnerHTML={{ __html: b['content'] }}
                        />
                      </div>

                      <div className="d-flex justify-content-between">
                        <strong>
                          {new Date(b['created_at'] * 1000)
                            .toISOString()
                            .slice(0, 10)}
                        </strong>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

export default withRouter(withStyles(styles)(BulletinPostPage));
