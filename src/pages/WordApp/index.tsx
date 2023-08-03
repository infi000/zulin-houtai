/* eslint-disable react-hooks/exhaustive-deps */
/*
《烯铊俱乐部安全责任协议书》
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-30 00:36:13
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-03 19:33:43
 * @FilePath: /houtai/src/pages/WordApp1/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import { getQueryString } from 'utils/utils';
import moment from 'moment';
import { Button, Modal, Result } from 'antd';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import Word1 from './Word1';
import Word2 from './Word2';
import Word3 from './Word3';
import { postAgreement, postUploadbase64 } from './services';

const Wrap = styled.div`
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
  .word-con {
    padding: 20px
    table {
      width: 100%;
      border: 1px solid #000000;
      border-collapse: collapse;
  }
  
  th,
  td {
      border: 1px solid #000000;
      text-align: center;
  }
  }
`;
const ModalWrap = styled.div`
  padding: 20px;
  text-align: center;
  h3{
    padding:20px;
  }
`;

const WordApp = () => {
  const type = getQueryString('type');
  const wordNum: any = getQueryString('wordNum');
  const params: any = getQueryString('params') || '{}';
  const agreement: any = getQueryString('agreement') || '{}';
  const openid: any = getQueryString('openid');
  const formatParams = JSON.parse(params);
  const formatAgreement = JSON.parse(agreement);
  const registernum = moment(new Date()).format('YYYYMMDDHHmmss') + Math.floor(Math.random() * 10000);
  const [modalInfo, setModalInfo] = useState<{ visible: boolean, type: 'pending' | 'success' | 'error' }>({ visible: false, type: 'pending' });
  console.log('formatParams', formatParams);
  console.log('formatAgreement', formatAgreement);

  // 生成图片
  const creatImg = async (word: string) => {
    const setup = {
      useCORS: true, // 使用跨域
    };
    const dom = document.getElementById(word);
    try {
      const res = await html2canvas(dom, setup).then(async canvas => {
        const link = canvas.toDataURL('image/jpg');
        // console.log(link);
        //  const { data } = await postUploadbase64(link);
        //  return data;
        return link;
      });
      // downloadFile(res, '1231');
      const res2 = await postUploadbase64({ data: res, openid });
      if (res2.res === 'succ') {
        return res2.data;
      }
      throw new Error('生成图片失败');
    } catch (error) {
      console.log('error', error);
      setModalInfo({
        visible: true,
        type: 'error',
      });
    }
  };

  const handleGoBack = () => {
    wx.miniProgram.reLaunch({
      url: '/pages/Main/index',
    });
  }

  useEffect(() => {
    if (type === 'create') {
      setModalInfo({
        visible: true,
        type: 'pending',
      });

      const ready = async () => {
        setTimeout(async () => {
          console.log('ready');
          const res1 = await creatImg('word1');
          const res2 = await creatImg('word2');
          console.log('res1', res1);
          // console.log('res2', res2);
          const data = {
            safesign: res1,
            registersign: res2,
            regusersign: formatAgreement.regusersign,
            reguserguardiansign: formatAgreement.reguserguardiansign,
            safeuserguardiansig: formatAgreement.safeuserguardiansig,
            safeusersign: formatAgreement.safeusersign,
            registernum,
            openid,
          };
          console.log('data', data);
          postAgreement(data).then((d) => {
            if (d.res === 'succ') {
              setModalInfo({
                visible: true,
                type: 'success',
              });
              return;
            }
            throw new Error(d);
          }).catch((err) => {
            console.log('err', err);
            setModalInfo({
              visible: true,
              type: 'error',
            });
          });
        }, 3000);
      };
      if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
        document.addEventListener('WeixinJSBridgeReady', ready, false);
      } else {
        ready();
      }
      ready();
    }
  }, [type]);

  return (
    <Wrap>
      {/* <Button onClick={handleCancel}>关闭</Button> */}
      {
        modalInfo.visible && (
          <Modal
            // title='生成协议信息'
            closable={false}
            maskClosable={false}
            visible
            footer={null}
          >
            <ModalWrap>
              {
                modalInfo.type === 'pending' && (
                  <Result
                    icon={<LoadingOutlined />}
                    title='数据整理中，请勿关闭或刷新页面!'
                  />
                )
              }
              {
                modalInfo.type === 'success' && (
                  <Result
                    status='success'
                    title='注册成功，点击确认返回'
                    extra={<Button type='primary' size='large' onClick={handleGoBack}>确认</Button>}
                  />
                )
              }
              {
                modalInfo.type === 'error' && (
                  <Result
                    status='warning'
                    title='数据生成失败，点击确认返回'
                    extra={<Button type='primary' size='large' onClick={handleGoBack}>确认</Button>}
                  />
                )
              }
            </ModalWrap>
          </Modal>
        )
      }

      {/* {type == 'create' && <p className=''>生成合同中。。。。。。</p>} */}
      <div style={{ display: wordNum == 1 || type == 'create' ? 'block' : 'none' }}>
        <Word1 {...formatParams} {...formatAgreement} />
      </div>
      <div style={{ display: wordNum == 2 || type == 'create' ? 'block' : 'none' }}>
        <Word2 {...formatParams} {...formatAgreement} registernum={registernum} />
      </div>
      <div style={{ display: wordNum == 3 || type == 'create' ? 'block' : 'none' }}>
        <Word3 />
      </div>
    </Wrap>
  );
};

export default WordApp;
