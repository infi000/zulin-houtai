import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCachingKeys } from 'react-router-cache-route';
import { actions } from 'store/globalSlice';
import { selectCachingKeys } from 'store/selectors';

interface IPageJump {
  pathname: string;
  state: any;
}

const usePageJump = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cachingKeys = useSelector(selectCachingKeys);
  return (params: string | IPageJump) => {
    const pathname = typeof params === 'string' ? params : params.pathname;
    const state = typeof params === 'string' ? undefined : params.state;
    history.push({
      pathname,
      state,
    });
    if (!cachingKeys.includes(pathname)) {
      dispatch(actions.updateCachingKeys([...cachingKeys, pathname]));
    }
    dispatch(actions.updateActiveCacheKey(pathname));
  };
};

export default usePageJump;
