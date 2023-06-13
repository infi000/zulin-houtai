/*
 * @Author: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @Date: 2023-06-02 23:19:57
 * @LastEditors: 张驰阳 zhangchiyang@sfmail.sf-express.com
 * @LastEditTime: 2023-06-13 23:16:06
 * @FilePath: /houtai/src/pages/Login/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { Alert, Button, Col, Form, Input, Row } from 'antd';

import { conf as passConfig } from 'configs/pass.conf';
import { getQueryString, setCookie } from 'utils/utils';
import { selectError } from 'store/selectors';
import { actions as globalActions } from 'store/globalSlice';
import loginPic from 'static/images/login_pic.svg';

// import { loadPassScript } from './sdkMethods';
import { postLogin, reducer } from './slice';
import { NAMESPACE } from './constants';
import './index.less';
import { falsyParamsFilter } from 'utils/filters';

/* eslint-disable */
const HomeLogin = () => {
  const [form] = Form.useForm();
  useInjectReducer({ key: NAMESPACE, reducer });
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

  const handleGo = async () => {
    // 重置结束
    let values = await form.validateFields();
    dispatch(postLogin(values));

  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  return (
    <div className='login-page'>
      <div className='login-page-left'>
        <div>Welcome</div>
        <div>Find more surpises here!</div>
        <div></div>
      </div>
      <div className='login-page-right'>
        {/* <i className='login-logo'/> */}
        {/* <img className='login-logo' src={loginPic} alt='logo' /> */}
        <div className='card'>
        <Form {...formItemLayout} form={form} size='middle'>
          <Row>
            <Col span={24}>
              <Form.Item 
              name='username'
               label='用户名'
               rules={[{ required: true, message: '必填项' }]}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
               name='password' 
               label='密码'
               rules={[{ required: true, message: '必填项' }]}>
                <Input allowClear placeholder='请输入' />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'center'}}>
              <Button onClick={handleGo}>登录</Button>
            </Col>
          </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default HomeLogin;

