# 防连击

> 宋书鹏 @2020-07-15

> 本项目的防连击一般只考虑新建、修改场景下的防连击，目前有两种形式，一种是提供一个防连击的按钮（通用场景，分支dev_throttle-loading_songshupeng），另一种将防连击加在点击事件中（针对Modal中的confirm按钮，分支dev_throttle-loading-solution2_songshupeng）

## 按钮
###### 定义
解释：按钮中需传入两个值：loading，fn。ThrottleButton依赖loading属性来判断上一个请求有没有结束，只有在初次点击或者上一次的请求得到结果（得到结果的同时loading会置为true），isFirst的值才置为true，此时传入的fn才会在被点击时执行。
```
interface Iprops extends ButtonProps, InjectedIntlProps{
  loading: boolean;
  fn: any;
}

function ThrottleButton(props: Iprops) {
  const { fn, loading, intl } = props;
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    if (!loading) {
      setIsFirst(true);
    }
  }, [loading]);

  const handleThrottleConfirm = () => {
    if (isFirst && !loading) {
      fn();
      setIsFirst(false);
    }
  };
  return (
    <Button
      type="primary"
      onClick={handleThrottleConfirm}
      loading={loading}
    >
      {intl.formatMessage(utilMessages.confirm)}
    </Button>
  );
}

```
###### 使用
```
function MainModal(props: InjectedIntlProps) {
  ...omit some code

  const handleOk = () => {
    form.validateFields()
      .then((values: IRole) => {
        // 这里的setTimeout是为了模拟validateFields.then这个异步和then中的处理经历了很长时间（1s）
        setTimeout(() => {
          // eslint-disable-next-line
          console.log(values);
          const params = {
            ...values,
            bus_role_name: '',
            data_auth_list: JSON.stringify({ 1: [1] }),
          };
          if (type === 'create') {
            dispatch(postCreateEntity(params));
          } else {
            dispatch(postModifyEntity(params));
          }
        }, 1000);
      });
  };

  ...omit some code

  return (
    <Modal
      title={intl.formatMessage(messages.default.modalTitle)}
      visible={modalData.visible}
      destroyOnClose
      onCancel={handleCancel}
      // 改写footer，ThrottleButton中传入loading以及真正要执行的函数handleOk
      footer={[
        <Button key="back" onClick={handleCancel}>
          {intl.formatMessage(utilMessages.cancel)}
        </Button>,
        <ThrottleButton loading={loading} fn={handleOk} />,
      ]}
      width={800}
    >
      ...omit some code
    </Modal>
  );
}
```

## 点击事件

###### 定义、使用
解释: 点击事件中我们依旧依赖loading属性来完成防连击。validateFields本身是异步的，then中的处理到发送请求前依然可能会经历“很多”时间，我们最好不要像下面的第二段代码一样直到发送请求前才翻转loading状态，防连击应和按钮事件绑定。
```
const handleOk = () => {
    // 防连击
    dispatch(actions.setLoading(true));
    form.validateFields()
      .then((values: IRole) => {
        // eslint-disable-next-line
        console.log(values);
        const params = {
          ...values,
          bus_role_name: '',
          data_auth_list: JSON.stringify({ 1: [1] }),
        };
        setTimeout(() => {
          if (type === 'create') {
            dispatch(postCreateEntity(params));
          } else {
            dispatch(postModifyEntity(params));
          }
        }, 3000);
      })
      .catch(() => {
        dispatch(actions.setLoading(false));
      });
  };

```
saga.ts中的防连击
```
export function* fetchLoadingNoodles(action: IRedux.Action) {
  // 开始loading
  yield put(actions.setLoading(true));
  // 等待结果
  yield take([action.type.replace(FETCH_PENDING_SUFFIX, FETCH_FULFILLED_SUFFIX), action.type.replace(FETCH_PENDING_SUFFIX, FETCH_REJECTED_SUFFIX)]);
  // 结束loading
  yield put(actions.setLoading(false));
}

```