/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-08-01 11:15:10
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-09-09 18:25:02
 * @FilePath: /houtai/src/pages/Signature/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getQueryString } from 'utils/utils';
import { postUploadbase64, getRegisterInfo } from './services';

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  .salary-sign-content {
    height: 100%;
    width: 100%;
    border: 1px solid #000;
  }
  .salary-title{
     position: fixed;
    top: 0;
    width: 100%;
        background: #000;
    font-size: 20px;
    color: #fff;
    text-align: center;
  }
  .salary-sign-bar {
    position: fixed;
    bottom: 0;
    height: 50px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .salary-sign-btn {
      width: 50%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #f2f2f2;
      align-items: center;
      border: 1px solid #000;
    }
  }
`;

// 必需参数：
// registersign:会员入会协议图片相对路径
// safesign：安全责任协议图片相对路径
// registernum：入会协议编号
// 非必需参数：
// 	regusersign：入会协议会员签字图片相对路径
// 	reguserguardiansign：入会协议会员监护人签字图片相对路径
// 	safeuserguardiansign：安全责任协议乙方签字图片相对路径
// 	safeusersign：安全责任协议未成年人签字图片相对路径

const Signature = () => {
  const signCanvas: any = useRef();
  const [userInfo, setUserInfo] = useState<any>({})
  const confirmSign = () => {
    const base = signCanvas.current.toDataURL('image/png');
    postUploadbase64({ data: base }).then((res:any) => {
      console.log(res);
      if (res.res === 'succ') {
       const { openid, ...rest } = userInfo;
        window.location.href = `/uiResources/blank/wordAppParent?params=${JSON.stringify({ ...rest })}&agreement=${JSON.stringify({ regusersign: res.data, reguserguardiansign: res.data, safeuserguardiansign: res.data, safeusersign: res.data })}&type=create&openid=${openid}`;
      } else {
        alert(res?.errdata?.errormsg || '签名失败');
      }
    });
  };

  const handleCancel = () => {
    // wx.miniProgram.navigateBack({
    //   delta: 1, // 表示回到上一页面
    // });
  };

  useEffect(() => {
    const parentElement = document.getElementById('sign-content');
    const pw = parentElement.clientWidth;
    const ph = parentElement.clientHeight;
    const canvasElement = signCanvas.current.getCanvas();
    canvasElement.height = ph;
    canvasElement.width = pw;
    const u: any = getQueryString('u');
    getRegisterInfo({u}).then((res:any) => {
      if(res.res === 'succ') {
        setUserInfo(res.data)
      }
    })
  }, []);
  return (
    <Wrap>
      <div className="salary-title">
        监护人签名
      </div>
      <div id='sign-content' className='salary-sign-content'>
        <SignatureCanvas
          ref={signCanvas}
          penColor='black'
          backgroundColor='#f2f2f2'
          canvasProps={{ width: '100%', height: '100%', className: 'sigCanvas' }}
        />
      </div>
      <div className='salary-sign-bar'>
        <div className='salary-sign-btn' onClick={handleCancel}>取消</div>
        <div className='salary-sign-bar-divide' />
        <div className='salary-sign-btn' onClick={confirmSign}>确认</div>
      </div>
    </Wrap>
  );
}

export default Signature;
