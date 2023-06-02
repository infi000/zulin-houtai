import React from 'react';
import logoS from 'static/images/logo_s@2x.png';
import { LogoWrapper } from './Wrappers';

// const logoSmallPng = 'https://festatic-1254389369.cos.ap-guangzhou.myqcloud.com/资源管理平台黑底应用备份@2x.png';
const logoPng = 'https://festatic-1254389369.cos.ap-guangzhou.myqcloud.com/science/otms/LOGO_RMP.png';
interface IProps {
  collapsed: boolean;
}

const Logo = (props: IProps) => (
  <LogoWrapper>
    <div className={`header-left ${props.collapsed ? 'collapsed' : ''}`}>
      {props.collapsed ? <img className='logoS' src={logoS} alt='logoS' /> : <img className='logo' src={logoPng} alt='logo' />}
    </div>
  </LogoWrapper>
);
export default Logo;
