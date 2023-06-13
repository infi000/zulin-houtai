/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-02 23:19:57
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-06 22:19:55
 * @FilePath: /houtai/src/pages/Layout/components/Logo.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import logoS from 'static/images/logo_s@2x.png';
import { LogoWrapper } from './Wrappers';

// const logoSmallPng = 'https://festatic-1254389369.cos.ap-guangzhou.myqcloud.com/资源管理平台黑底应用备份@2x.png';
const logoPng = '';
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
