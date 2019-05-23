import React from 'react';
import { string } from 'prop-types';
import logo from 'resources/images/logo.png';
import 'styles/components/common/LogoImage.scss';

const LogoImage = ({ className = 'logoContainer' }) => (
  <div className={className}>
    <img src={logo} alt="logo" className="logoContainer__image" />
  </div>
);

LogoImage.propTypes = {
  className: string
};

export default LogoImage;
