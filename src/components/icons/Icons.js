import React from 'react';

const arrowDefaultFill = '#3AD09F';

export const Arrow = props => (
  <svg width="22" height="14" viewBox="0 0 8 14">
    <path
      fill={props && props.fillColor ? props.fillColor : arrowDefaultFill}
      fillRule="evenodd"
      stroke={props && props.fillColor ? props.fillColor : arrowDefaultFill}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={`rotate(${
        props && props.rotate ? props.rotate : 0
      }) translate(${props && props.translate ? props.translate : 0})`}
      d="M4.054 3.879h3.067L3.561.318 0 3.878h3.054v8.83a.5.5 0 1 0 1 0v-8.83z"
    />
  </svg>
);

const cancelIconDefaultFill = '#304262';
const cancelIconDefaultFillOpacity = '0.3';

export const CancelIcon = props => (
  <svg
    style={{ verticalAlign: 'middle' }}
    width="16"
    height="28"
    viewBox="0 0 16 16"
    onClick={event => props.onClick(props.itemKey, event)}
  >
    <path
      fill={props && props.fillColor ? props.fillColor : cancelIconDefaultFill}
      fillOpacity={
        props && props.fillOpacity
          ? props.fillOpacity
          : cancelIconDefaultFillOpacity
      }
      fillRule="evenodd"
      d="M9.029 8l2.057-2.057a.727.727 0 1 0-1.029-1.029L8 6.971 5.943 4.914a.727.727 0 1 0-1.029 1.029L6.971 8l-2.057 2.057a.727.727 0 1 0 1.029 1.029L8 9.029l2.057 2.057a.727.727 0 1 0 1.029-1.029L9.029 8zM8 0a8 8 0 1 1-8 8 8 8 0 0 1 8-8z"
    />
  </svg>
);

const dropdownIconDefaultFill = '#FFFFFF';

export const DropdownIcon = props => (
  <svg
    width="14"
    height="7"
    viewBox="0 0 14 7"
    className={props.className}
    onClick={props.onClick}
  >
    <path
      className={props.pathClassName}
      fill="none"
      fillRule="evenodd"
      stroke={
        props && props.fillColor ? props.fillColor : dropdownIconDefaultFill
      }
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M1 1l6 5 6-5"
    />
  </svg>
);

const menuArrowDefaultFill = '#304262';

export const MenuArrow = props => (
  <svg width="5" height="10" viewBox="0 0 5 10">
    <path
      fill="none"
      fillRule="evenodd"
      className={props.className}
      stroke={props && props.fillColor ? props.fillColor : menuArrowDefaultFill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity=".54"
      strokeWidth="1.6"
      d="M1 9l3-4-3-4"
    />
  </svg>
);

const successIconDefaultFill = '#FFB130';

export const SuccessIcon = props => (
  <svg width="81" height="81" viewBox="0 0 81 81">
    <defs>
      <linearGradient id="c" x1="50%" x2="50%" y1="0%" y2="99.021%">
        <stop offset="0%" stopOpacity="0" />
        <stop offset="80%" stopOpacity=".02" />
        <stop offset="100%" stopOpacity=".04" />
      </linearGradient>
      <linearGradient id="d" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF" stopOpacity=".12" />
        <stop offset="20%" stopColor="#FFF" stopOpacity=".06" />
        <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
      </linearGradient>
      <circle id="b" cx="33.5" cy="33.5" r="33.5" />
      <filter
        id="a"
        width="131.3%"
        height="131.3%"
        x="-15.7%"
        y="-15.7%"
        filterUnits="objectBoundingBox"
      >
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="3.5"
        />
        <feComposite
          in="shadowBlurOuter1"
          in2="SourceAlpha"
          operator="out"
          result="shadowBlurOuter1"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
        />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(7 7)">
        <use fill="#000" filter="url(#a)" xlinkHref="#b" />
        <use
          fill={
            props && props.fillColor ? props.fillColor : successIconDefaultFill
          }
          xlinkHref="#b"
        />
        <circle
          cx="33.5"
          cy="33.5"
          r="33.2"
          stroke="url(#c)"
          strokeWidth=".6"
        />
        <circle
          cx="33.5"
          cy="33.5"
          r="33.2"
          stroke="url(#d)"
          strokeWidth=".6"
        />
      </g>
      <path
        fill="#FFF"
        stroke="#FFF"
        strokeWidth="3"
        d="M36.273 46.82l-6.205-6.268L28 42.642 36.273 51 54 33.09 51.932 31z"
      />
    </g>
  </svg>
);

const closeIconDefaultFill = '#304262';
const closeIconDefaultFillOpacity = '.87';
const closeIconDefaultSize = '14';

export const CloseIcon = props => {
  const size = props && props.size ? props.size : closeIconDefaultSize;

  return (
    <svg width={size} height={size} viewBox="0 0 14 14">
      <path
        fill={props && props.fillColor ? props.fillColor : closeIconDefaultFill}
        fillOpacity={
          props && props.fillOpacity
            ? props.fillOpacity
            : closeIconDefaultFillOpacity
        }
        fillRule="evenodd"
        className={props.className}
        d="M14 1.4L12.6 0 7 5.6 1.4 0 0 1.4 5.6 7 0 12.6 1.4 14 7 8.4l5.6 5.6 1.4-1.4L8.4 7z"
      />
    </svg>
  );
};

const warningIconDefaultFill = '#FFB130';

export const WarningIcon = props => (
  <svg width="34" height="30" style={{ minWidth: '34px' }} viewBox="0 0 17 15">
    <path
      fill={props && props.fillColor ? props.fillColor : warningIconDefaultFill}
      fillRule="evenodd"
      d="M0 15h17L8.5 0 0 15zm9.5-2h-2v-2h2v2zm0-3h-2V6h2v4z"
    />
  </svg>
);

const mailIconDefaultFill = '#4B5A76';
const mailIconDefaultFillOpacity = '.5';

export const MailIcon = props => (
  <svg width="20" height="17" viewBox="0 0 20 17">
    <g
      fill="none"
      fillRule="evenodd"
      opacity={
        props && props.fillOpacity
          ? props.fillOpacity
          : mailIconDefaultFillOpacity
      }
    >
      <path d="M22 20.942H-2v-24.49h24z" />
      <path
        fill={props && props.fillColor ? props.fillColor : mailIconDefaultFill}
        className={props.className}
        d="M18 .534H2c-1.1 0-2 .919-2 2.041V14.82c0 1.122.9 2.04 2 2.04h16c1.1 0 2-.918 2-2.04V2.575c0-1.122-.9-2.04-2-2.04zm0 4.082l-8 5.102-8-5.102v-2.04l8 5.101 8-5.102v2.041z"
      />
    </g>
  </svg>
);

const personIconDefaultFill = '#4B5A76';
const personIconDefaultFillOpacity = '.5';

export const PersonIcon = props => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <g
      fill="none"
      fillRule="evenodd"
      opacity={
        props && props.fillOpacity
          ? props.fillOpacity
          : personIconDefaultFillOpacity
      }
    >
      <path d="M-4-4h24v24H-4z" />
      <path
        fill={
          props && props.fillColor ? props.fillColor : personIconDefaultFill
        }
        className={props.className}
        d="M8 9.144c-2.666 0-8 1.334-8 4V16h16v-2.856c0-2.666-5.332-4-8-4M8 0a3.43 3.43 0 0 0 0 6.858A3.42 3.42 0 0 0 11.42 3.43 3.421 3.421 0 0 0 8 0"
      />
    </g>
  </svg>
);

const phoneIconDefaultFill = '#4B5A76';

export const PhoneIcon = props => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <g fill="none" fillRule="evenodd">
      <path d="M-3-3h24v24H-3z" />
      <path
        fill={props && props.fillColor ? props.fillColor : phoneIconDefaultFill}
        className={props.className}
        d="M1 0a1 1 0 0 0-1 1c0 9.388 7.612 17 17 17a1 1 0 0 0 1-1v-3.5a.999.999 0 0 0-1-.999c-1.248 0-2.448-.201-3.572-.569a.997.997 0 0 0-1.015.245l-2.201 2.203a15.08 15.08 0 0 1-6.589-6.586l2.2-2.207a1 1 0 0 0 .245-1.015A11.468 11.468 0 0 1 5.499 1c0-.553-.447-1-.999-1H1z"
      />
    </g>
  </svg>
);

const verificationIconDefaultFill = '#4B5A76';

export const VerificationIcon = props => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <g fill="none" fillRule="evenodd">
      <path d="M-2-2h24v24H-2z" />
      <path
        fill={
          props && props.fillColor
            ? props.fillColor
            : verificationIconDefaultFill
        }
        className={props.className}
        d="M19.001 4.001H17v9H3.999v2c0 .552.45 1 1.001 1h10.999l4.001 4v-15a1 1 0 0 0-.999-1m-5-4.001H1a1 1 0 0 0-1 1.001v14l3.999-4h10.002A1 1 0 0 0 15 10V1.001A1 1 0 0 0 14.001 0"
      />
    </g>
  </svg>
);

const languageIconDefaultFill = '#4B5A76';

export const LanguageIcon = props => (
  <svg width="15" height="17" viewBox="0 0 15 17">
    <g fill="none" fillRule="evenodd">
      <path d="M-5-3h24v24H-5z" />
      <path
        fill={
          props && props.fillColor ? props.fillColor : languageIconDefaultFill
        }
        className={props.className}
        d="M9.4 2L9 0H0v17h2v-7h5.6l.4 2h7V2z"
      />
    </g>
  </svg>
);

const verifiedIconDefaultFill = '#4B5A76';

export const VerifiedIcon = props => (
  <svg width="13" height="10" viewBox="0 0 13 10">
    <path
      fill={
        props && props.fillColor ? props.fillColor : verifiedIconDefaultFill
      }
      fillRule="evenodd"
      stroke="#00B9F4"
      strokeWidth="1.2"
      d="M4.31 7.328L1.826 4.821 1 5.657 4.31 9l7.09-7.164L10.573 1z"
    />
  </svg>
);

const idVerificationIconDefaultFill = '#4B5A76';

export const IdVerificationIcon = props => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <g fill="none" fillRule="evenodd">
      <path d="M21 20.942H-3v-24.49h24z" />
      <path
        fill={
          props && props.fillColor
            ? props.fillColor
            : idVerificationIconDefaultFill
        }
        className={props.className}
        d="M10 14h4v-4h-4v4zm0-6h4V4h-4v4zM8 18h2v-2H8v2zm4 0h2v-2h-2v2zm4-8h2V8h-2v2zm-4-8h2V0h-2v2zm4 4h2V4h-2v2zM4 18h2v-2H4v2zm12-4h2v-2h-2v2zm0 4a2 2 0 0 0 2-2h-2v2zM6 0H4v2h2V0zm4 0H8v2h2V0zm6 0v2h2a2 2 0 0 0-2-2zM8 4H4v4h4V4zm-8 6h2V8H0v2zm0-8h2V0a2 2 0 0 0-2 2zm0 4h2V4H0v2zm8 4H4v4h4v-4zm-6 8v-2H0a2 2 0 0 0 2 2zm-2-4h2v-2H0v2z"
      />
    </g>
  </svg>
);

const addressVerificationIconDefaultFill = '#4B5A76';

export const AddressVerificationIcon = props => (
  <svg width="14" height="20" viewBox="0 0 14 20">
    <g fill="none" fillRule="evenodd">
      <path d="M19 21.942H-5v-24.49h24z" />
      <path
        fill={
          props && props.fillColor
            ? props.fillColor
            : addressVerificationIconDefaultFill
        }
        className={props.className}
        d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </g>
  </svg>
);

const avatarIconDefaultFill = '#FFF';
const avatarIconDefaultSize = '24';
export const AvatarIcon = props => {
  const size = props && props.size ? props.size : avatarIconDefaultSize;
  const fillColor =
    props && props.fillColor ? props.fillColor : avatarIconDefaultFill;
  return (
    <svg width={size} height={size} viewBox={`0 0 24 24`}>
      <path
        fill={fillColor}
        className={props.className}
        fillRule="nonzero"
        d="M12 0C5.36 0 0 5.36 0 12s5.36 12 12 12 12-5.36 12-12S18.64 0 12 0zm0 5.2c1.84 0 3.36 1.493 3.36 3.307 0 1.84-1.493 3.306-3.36 3.306-1.867 0-3.36-1.493-3.36-3.306C8.64 6.693 10.16 5.2 12 5.2zm6.107 12.933c-.214.32-.587.534-.987.534H6.907c-.4 0-.774-.187-.987-.534a1.19 1.19 0 0 1-.107-1.12c1.014-2.533 3.467-4.16 6.214-4.16 2.746 0 5.2 1.627 6.213 4.16.133.374.08.8-.133 1.12z"
      />
    </svg>
  );
};

const mobileDeviceDefaultFill = '#4B5A76';
export const MobileDeviceIcon = props => {
  const fillColor =
    props && props.fillColor ? props.fillColor : mobileDeviceDefaultFill;
  return (
    <svg width="14" height="22" viewBox="0 0 14 22">
      <g fill="none" fillRule="evenodd" transform="translate(-5 -1)">
        <path d="M0 0h24v24H0z" />
        <path
          fill={fillColor}
          className={props.className}
          fillRule="nonzero"
          d="M15.409 1.773H8.591A2.845 2.845 0 0 0 5.75 4.614v14.773a2.845 2.845 0 0 0 2.841 2.841h6.818a2.845 2.845 0 0 0 2.841-2.841V4.614a2.844 2.844 0 0 0-2.841-2.841zm1.705 17.613c0 .94-.765 1.705-1.705 1.705H8.591c-.94 0-1.705-.765-1.705-1.705V4.614c0-.94.765-1.705 1.705-1.705h6.818c.94 0 1.705.765 1.705 1.705v14.772z"
        />
        <circle
          cx="12"
          cy="19.386"
          r="1.136"
          fill={fillColor}
          className={props.className}
          fillRule="nonzero"
        />
        <path
          fill={fillColor}
          className={props.className}
          fillRule="nonzero"
          d="M13.136 3.477h-2.273a.568.568 0 1 0 0 1.136h2.273a.568.568 0 1 0 0-1.136z"
        />
      </g>
    </svg>
  );
};

const removeIconDefaultFill = '#F87979';
export const RemoveDeviceIcon = props => {
  return (
    <svg width="14" height="17" viewBox="0 0 14 17">
      <g fill="none" fillRule="evenodd">
        <path d="M-5-4h24v24H-5z" />
        <path
          fill={
            props && props.fillColor ? props.fillColor : removeIconDefaultFill
          }
          className={props.className}
          fillRule="nonzero"
          d="M13.83 2.768h-3.217v-.783A1.8 1.8 0 0 0 8.806.195H5.194a1.8 1.8 0 0 0-1.807 1.79v.783H.17V4.11h1.299v10.905a1.8 1.8 0 0 0 1.806 1.79h7.452a1.8 1.8 0 0 0 1.806-1.79V4.11h1.299V2.768zm-9.088-.783a.45.45 0 0 1 .452-.447h3.612c.25 0 .452.2.452.447v.783H4.742v-.783zm6.181 12.712c0 .232-.19.42-.424.42H3.501a.423.423 0 0 1-.424-.42V4.455h7.846v10.242z"
        />
      </g>
    </svg>
  );
};

const apiKeyDefaultFill = '#495874';
export const ApiKeyIcon = props => {
  const fillColor =
    props && props.fillColor ? props.fillColor : apiKeyDefaultFill;
  return (
    <svg width="19" height="23" viewBox="0 0 19 23">
      <g fill="none" fillRule="evenodd">
        <path d="M-3 0h24v24H-3z" />
        <g fillRule="nonzero">
          <path fill="#000" d="M8.562 12.292h1.375v5.536H8.562z" />
          <path
            fill={fillColor}
            className={props.className}
            d="M8.562 12.292h1.375v5.536H8.562z"
          />
          <path
            fill={fillColor}
            className={props.className}
            d="M15.991 12.999H2.509V5.674h1.375v5.95h10.732v-5.95h1.375z"
          />
          <path
            fill="#000"
            d="M9.25 22.948a2.816 2.816 0 0 1 0-5.632 2.816 2.816 0 0 1 0 5.632zm0-4.257a1.44 1.44 0 0 0-1.435 1.441 1.44 1.44 0 0 0 1.435 1.441 1.44 1.44 0 0 0 1.435-1.441c0-.795-.643-1.441-1.435-1.441z"
          />
          <path
            fill={fillColor}
            className={props.className}
            d="M9.25 22.948a2.816 2.816 0 0 1 0-5.632 2.816 2.816 0 0 1 0 5.632zm0-4.257a1.44 1.44 0 0 0-1.435 1.441 1.44 1.44 0 0 0 1.435 1.441 1.44 1.44 0 0 0 1.435-1.441c0-.795-.643-1.441-1.435-1.441zM3.216 6.58a2.816 2.816 0 0 1 0-5.632 2.817 2.817 0 0 1 0 5.632zm0-4.257a1.44 1.44 0 0 0-1.435 1.441 1.44 1.44 0 0 0 1.435 1.441 1.44 1.44 0 0 0 1.435-1.441 1.438 1.438 0 0 0-1.435-1.441zM15.284 6.58a2.816 2.816 0 0 1 0-5.632 2.817 2.817 0 0 1 0 5.632zm0-4.257a1.44 1.44 0 0 0-1.435 1.441 1.44 1.44 0 0 0 1.435 1.441 1.44 1.44 0 0 0 1.435-1.441 1.44 1.44 0 0 0-1.435-1.441z"
          />
        </g>
      </g>
    </svg>
  );
};

const deactivateIconDefaultFill = '#495874';
export const DeactivateIcon = props => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <g fill="none" fillRule="evenodd" transform="translate(-5 -5)">
        <path d="M0 0h24v24H0z" />
        <circle
          cx="12"
          cy="12"
          r="6.25"
          stroke="#495874"
          className={props.strokeClassName}
          strokeWidth="1.5"
        />
        <path
          fill={
            props && props.fillColor
              ? props.fillColor
              : deactivateIconDefaultFill
          }
          className={props.className}
          d="M15.85 7.05l1.1 1.1-8.8 8.8-1.1-1.1z"
        />
      </g>
    </svg>
  );
};

const activateIconDefaultFill = '#495874';
export const ActivateIcon = props => {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16">
      <g fill="none" fillRule="evenodd">
        <path d="M-5-3h24v24H-5z" />
        <path
          fill={
            props && props.fillColor ? props.fillColor : activateIconDefaultFill
          }
          className={props.className}
          d="M4 2.674v1.912a5.337 5.337 0 1 0 6 0V2.674a7 7 0 1 1-6 0z"
        />
        <path
          fill={
            props && props.fillColor ? props.fillColor : activateIconDefaultFill
          }
          className={props.className}
          d="M7 .5a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1z"
        />
      </g>
    </svg>
  );
};

const addIconDefaultFill = '#3AB2EE';
export const AddIcon = props => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <g fill="none" fillRule="evenodd">
        <circle
          cx="8"
          cy="8"
          r="7.5"
          className={props.strokeClassName}
          stroke="#3AB2EE"
        />
        <path
          fill={props && props.fillColor ? props.fillColor : addIconDefaultFill}
          className={props.className}
          d="M8.8 7.2H12v1.6H8.8V12H7.2V8.8H4V7.2h3.2V4h1.6z"
        />
      </g>
    </svg>
  );
};

const infoIconDefaultFill = '#3AB2EE';
export const InfoIcon = props => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill={props && props.fillColor ? props.fillColor : infoIconDefaultFill}
        fillRule="nonzero"
        d="M9 0c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9zm0 7.116a.617.617 0 0 0-.628.628v4.814c0 .356.272.628.628.628a.617.617 0 0 0 .628-.628V7.744A.617.617 0 0 0 9 7.116zm0-2.302a.84.84 0 0 0-.837.837c0 .46.377.837.837.837a.84.84 0 0 0 .837-.837A.84.84 0 0 0 9 4.814z"
      />
    </svg>
  );
};

const facebookIconDefaultFill = '#26344E';
const facebookIconDefaultSize = '32';
export const FacebookIcon = props => {
  return (
    <svg
      width={props.size || facebookIconDefaultSize}
      height={props.size || facebookIconDefaultSize}
      viewBox="0 0 32 32"
    >
      <g fill="none" fillRule="nonzero">
        <path
          fill={
            props && props.fillColor ? props.fillColor : facebookIconDefaultFill
          }
          className={props.className}
          d="M16 0C7.163 0 0 7.163 0 16c0 8.836 7.163 16 16 16s16-7.164 16-16c0-8.837-7.163-16-16-16z"
        />
        <path
          fill="#FFF"
          d="M13.69 24.903h3.679v-8.904h2.454l.325-3.068h-2.779l.004-1.536c0-.8.076-1.229 1.224-1.229h1.534V7.097h-2.455c-2.949 0-3.986 1.489-3.986 3.992v1.842h-1.838V16h1.838v8.903z"
        />
      </g>
    </svg>
  );
};

const twitterIconDefaultFill = '#26344E';
const twitterIconDefaultSize = '32';
export const TwitterIcon = props => {
  return (
    <svg
      width={props.size || twitterIconDefaultSize}
      height={props.size || twitterIconDefaultSize}
      viewBox="0 0 32 32"
    >
      <g fill="none" fillRule="nonzero">
        <path
          fill={
            props && props.fillColor ? props.fillColor : twitterIconDefaultFill
          }
          className={props.className}
          d="M16 0C7.163 0 0 7.163 0 16c0 8.836 7.163 16 16 16s16-7.164 16-16c0-8.837-7.163-16-16-16z"
        />
        <path
          fill="#FFF"
          d="M18.226 8.886c-1.59.579-2.595 2.071-2.481 3.704l.038.63-.636-.077c-2.315-.296-4.338-1.299-6.056-2.984l-.84-.836-.215.617c-.458 1.376-.165 2.83.789 3.808.509.54.394.617-.483.296-.305-.103-.573-.18-.598-.141-.089.09.216 1.26.458 1.724.331.644 1.005 1.273 1.743 1.647l.624.296-.739.011c-.712 0-.738.013-.661.284.254.836 1.259 1.724 2.379 2.11l.789.27-.687.412a7.122 7.122 0 0 1-3.41.951c-.573.013-1.044.064-1.044.103 0 .128 1.553.848 2.455 1.132 2.71.836 5.929.475 8.346-.952 1.718-1.016 3.435-3.036 4.237-4.992.433-1.041.865-2.945.865-3.858 0-.592.038-.669.75-1.376.42-.412.814-.862.891-.99.128-.245.114-.245-.534-.026-1.081.386-1.234.335-.699-.244.394-.412.865-1.158.865-1.376 0-.038-.191.026-.407.141-.229.129-.738.322-1.12.437l-.687.219-.623-.426c-.344-.231-.826-.489-1.081-.566-.65-.18-1.642-.154-2.228.052z"
        />
      </g>
    </svg>
  );
};

const linkedInIconDefaultFill = '#0077B5';
const linkedInIconDefaultSize = '16';
export const LinkedInIcon = props => (
  <svg
    width={props.size || linkedInIconDefaultSize}
    height={props.size || linkedInIconDefaultSize}
    viewBox="0 0 24 24"
  >
    <path
      fill={
        props && props.fillColor ? props.fillColor : linkedInIconDefaultFill
      }
      className={props.className}
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    />
  </svg>
);

const linkedInShareIconDefaultFill = '#0077B5';
const linkedInShareIconDefaultSize = '16';
export const LinkedInShareIcon = props => (
  <svg
    width={props.size || linkedInShareIconDefaultSize}
    height={props.size || linkedInShareIconDefaultSize}
    viewBox="0 0 36 36"
  >
    <path
      d="M33.34,0H2.66A2.63,2.63,0,0,0,0,2.6V33.4A2.63,2.63,0,0,0,2.66,36H33.34A2.63,2.63,0,0,0,36,33.4V2.6A2.63,2.63,0,0,0,33.34,0Z"
      className={props.className}
      fill={
        props && props.fillColor
          ? props.fillColor
          : linkedInShareIconDefaultFill
      }
    />
    <path
      d="M5.33,13.5h5.34V30.68H5.33V13.5ZM8,5a3.1,3.1,0,1,1-3.1,3.1A3.1,3.1,0,0,1,8,5"
      fill="#ffffff"
    />
    <path
      d="M14,13.5h5.12v2.35h0.07a5.61,5.61,0,0,1,5.05-2.77c5.41,0,6.41,3.56,6.41,8.18v9.42H25.34V22.32c0-2,0-4.56-2.77-4.56s-3.2,2.17-3.2,4.41v8.5H14V13.5Z"
      fill="#ffffff"
    />
  </svg>
);
