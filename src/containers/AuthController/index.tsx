import { useSelector } from 'react-redux';
import { selectLoginUserFunctionAuth } from 'store/selectors';

import checkAuth from './checkAuth';

interface IProps {
  authCode: Auth.Code;
  children: any;
}

function Auth(props: IProps) {
  const fuctionAuth: Auth.Code[] = useSelector(selectLoginUserFunctionAuth);

  return checkAuth(props.authCode, fuctionAuth)(props.children);
}

export default Auth;
