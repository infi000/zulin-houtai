/*
 * @Author: 董方旭
 * @Date: 2021-02-01 11:14:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-27 18:08:21
 * @Description: tab标签
 */
import * as React from 'react';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import { dropByCacheKey } from 'react-router-cache-route';
import { injectIntl, InjectedIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

import { menuMessages } from 'utils/messages';
import { selectCachingKeys, selectActiveCacheKey } from 'store/selectors';
import { actions } from 'store/globalSlice';

import { MultipleTabsWrapper } from './Wrappers';

const { TabPane } = Tabs;
interface IProps {
  intl: InjectedIntl;
}

function MultipleTabs(props: IProps) {
  const { intl } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const cachingKeys = useSelector(selectCachingKeys);
  const activeCacheKey = useSelector(selectActiveCacheKey);

  const handleTabChange = (activeKey: string) => {
    const newPath = activeKey;
    history.push(newPath);
    dispatch(actions.updateActiveCacheKey(newPath));
    // 触发resize事件
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  };

  const handleTabEdit = (targetKey: string, action: string) => {
    if (action === 'remove') {
      if (cachingKeys.length === 1) {
        // 最后一个不允许删除
        return;
      }
      dropByCacheKey(targetKey);
      dispatch(actions.updateCachingKeys(cachingKeys.filter((key: string) => key !== targetKey)));
      if (activeCacheKey === targetKey) {
        const index = cachingKeys.indexOf(targetKey);
        const nextKey = index === 0 ? cachingKeys[1] : cachingKeys[index - 1];
        history.push(nextKey);
        dispatch(actions.updateActiveCacheKey(nextKey));
      }
    }
  };

  const formatPanelText = (pane: string) => {
    const paramsArray = pane.split('/:');
    let detailId = '';
    if (paramsArray.length === 2) {
      const tempArr = paramsArray[1].split('?');
      detailId = tempArr.length ? tempArr[0] : '';
    }
    const paths = paramsArray[0].split('/');
    if (paths.length) {
      const pathKey = paths[paths.length - 1];
      // eslint-disable-next-line
      const text = intl.formatMessage((menuMessages as any)[pathKey]);
      if (detailId) {
        return `${text} - ${detailId}`;
      }
      return text;
    }
    return '';
  };

  return (
    <MultipleTabsWrapper>
      <div className='tabs'>
        <Tabs
          hideAdd
          activeKey={activeCacheKey}
          type="editable-card"
          onEdit={(targetKey: string) => handleTabEdit(targetKey, 'remove')}
          onChange={handleTabChange}
        >
          {cachingKeys.map((pane: string) => (
            <TabPane tab={formatPanelText(pane) || '-'} key={pane} />
          ))}
        </Tabs>
      </div>
    </MultipleTabsWrapper>
  );
}

export default injectIntl(MultipleTabs);
