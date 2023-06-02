/*
 * @Author: 董方旭
 * @Date: 2021-02-01 11:14:48
 * @LastEditors: 董方旭
 * @LastEditTime: 2021-02-19 16:03:56
 * @Description: loadLongan
 */
import longan from 'longan-sdk';
import longanConf from 'configs/longan.conf';

function loadLongan() {
  if (longanConf.open === true) {
    delete longanConf.open;
    longan.start(longanConf);
    console.log('longan已开启。。。');
  }
}

export default loadLongan;
