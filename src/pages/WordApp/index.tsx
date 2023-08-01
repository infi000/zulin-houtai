/* eslint-disable react-hooks/exhaustive-deps */
/*
《烯铊俱乐部安全责任协议书》
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-07-30 00:36:13
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-08-01 19:41:48
 * @FilePath: /houtai/src/pages/WordApp1/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import { getQueryString } from 'utils/utils';
import moment from 'moment';
import { Button, Modal } from 'antd';
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
const downloadFile = (base64: string, fileName: string) => {
  const base64ToBlob = function (base64: string) { // base64编码格式：'data:image/jpeg;base64,/9j/4AAQSkZJRgAB...'
    const MIMEAndCode = base64.split(';base64,'); // 分割完整的base64编码分别得到各个部分（MIME文件类型相关、纯编码）
    const contentType = MIMEAndCode[0].split(':')[1]; // image/jpeg，用于构造Blob对象时指定文件类型type

    // Blob对象的第一个构造参数是BufferArray对象或者BufferArrayView对象或者Blob
    // BufferArray对象或者BufferArrayView对象的区别就是BufferArray就是纯二进制内容，不方便我们直接操作，BufferArrayView对象比如Uint8Array数组，就是把二进制内容变成方便我们操作的数据

    // 把纯base64编码转为解码后的字符串
    const rawCode = window.atob(MIMEAndCode[1]);

    // 创建一个Uint8Array数组，长度为解码后字符的长度
    const rawCodeLength = rawCode.length;
    const uInt8Array = new Uint8Array(rawCodeLength);
    // 遍历，把每个解码后的字符通过charCodeAt方法转为对应字符的Unicode编码（一种编码而已，值为0 - 65535 之间的整数）
    for (let i = 0; i < rawCodeLength; i++) {
      uInt8Array[i] = rawCode.charCodeAt(i);
    }
    // new Blob第一个参数为数组，数组里面是BufferArray或者BufferArrayView对象，第二个配置对象的type属性指定文件类型
    return new Blob([uInt8Array], {
      type: contentType
    });
  };
  const blob = base64ToBlob(base64); // 拿到base64编码对应的blob对象传给URL.createObjectURL方法，构建一个href值
  let a: HTMLAnchorElement | null = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '';
  a.click();
  a = null;
};

const WordApp = () => {
  const type = getQueryString('type');
  const wordNum: any = getQueryString('wordNum');
  const params: any = getQueryString('params') || '{}';
  const agreement: any = getQueryString('agreement') || '{}';
  const openid: any = getQueryString('openid');
  const formatParams = JSON.parse(params);
  const formatAgreement = JSON.parse(agreement);
  const registernum = moment(new Date()).format('YYYYMMDDHHmmss') + Math.floor(Math.random() * 10000);
  const [modalInfo, setModalInfo] = useState({ visible: false, content: '' });
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
      return '';
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (type === 'create') {
      setModalInfo({
        visible: true,
        content: '数据整理中，请勿关闭',
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
          postAgreement(data).then(() => {
            setModalInfo({
              visible: true,
              content: '协议信息生成成功',
            });
            setTimeout(() => {
              wx.miniProgram.reLaunch({
                url: '/pages/Main/index',
              });
            }, 1000);
          });
        }, 3000);
      };
      if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
        document.addEventListener('WeixinJSBridgeReady', ready, false);
      } else {
        ready();
      }
      // ready();
    }
  }, [type]);

  return (
    <Wrap>
      {/* <Button onClick={handleCancel}>关闭</Button> */}
      {/* {
        modalInfo.visible && (
          <Modal
            title='生成协议信息'
            closable={false}
            maskClosable={false}
            visible
            footer={null}
          >
            <p>{modalInfo.content}</p>
          </Modal>
        )
      } */}

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
