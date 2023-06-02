import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import { actions } from "store/globalSlice";

const { addCrumbNameMap } = actions;

export default () => {
  const dispatch = useDispatch();

  const { path } = useRouteMatch();

  return (name: string) => {
    dispatch(addCrumbNameMap({ [path]: name }));
  };
};
