<!--
 * @Author: 李淳
 * @Date: 2020-07-15 13:48:09
 * @LastEditors: 李淳
 * @LastEditTime: 2020-07-15 15:32:42
 * @Description: file content
-->

# 路由

> 李淳 @2020-07-15

cosmos采用的是路由、菜单、面包屑一体化配置，通过一份配置，完成三项的同步。且通过路由配置，自动寻找对应文件，动态加载。

## 文件分层

需要关注的是，cosmos推荐采用全平铺式文件分层模式，也就是页面间的父子、兄弟关系仅靠路由配置维护，而在文件层级上均为兄弟关系。

```javascript
// 路由层级结构
|-- system
|      |-- authManage
|      |-- userManage
|             |-- userDetail
|-- order
|      |-- exportOrder


// 文件层级结构
|-- pages
|      |-- authManage
|      |-- userManage
|      |-- userDetail
|      |-- exportOrder
```

这样处理文件结构主要基于以下几方面的考量：

- 页面间的关系存在一定的不稳定性，一旦A的子页面调整到B的子页面，嵌套式文件结构需要挪动文件夹来完成；
- 页面间的嵌套结构会影响页面的独立性，父子页面会存在过多的相互引用关系，对后续的复用有很大的成本；
- 代码结构更标准、清晰，减少个性化抉择；
- 平铺结构更有利于代码快速生成工具的施展；

当然，有优势就也一定是存在劣势的：

- 末端路由成为唯一区分页面的key值，因此末端路由不允许冲突；
- 父子间的共用难以维系，比如说合同模块下的续租合同、扩租合同，之间存在一些枚举类型定义、实体类型定义、常量定义、service定义、组件、模块等的复用，此时要怎样做？

> - 对于页面间类型的定义共用，我们建议提至 **types/entitys.ts** 中进行定义；
> - 对于常量的共用，我们建议提至**utils/constants.ts** 中进行定义；
> - 对于service定义，我们不建议跨模块进行共用，可重复定义；
> - 对于组件、模块的复用，我们建议提至**src/components**、**src/containers**。

## 路由配置

```ts
interface RouteConfig extends RouteProps {
  /** 菜单的名称 */
  name?: string;
  /** 菜单的icon */
  icon?: string | ReactNode;
  /** 是否在菜单中隐藏 */
  hidden?: boolean;
  /** 路由的path */
  path?: string;
  /** 重定向地址 */
  redirectTo?: string;
  /** 组件所在的目录，默认为路由的path */
  catalog?: string;
  /** 进入路由的权限 */
  auth?: number;
  /** 是否使用布局，默认 true */
  useLayout?: boolean;
  /** 子路由配置 */
  children?: RouteConfig[];
  /** 加载失败时的内容 */
  fallback?: ReactNode;
  /** 有子路由时，自身是否为路由，默认 false */
  exist?: boolean;
}
```

### tips

1. 自动加载路由的文件目录: pages + 路由末端的path文件夹，但是当有catalog属性的时候取的是catalog文件夹
2. hidden 为 true，会使该路由不在菜单中生成菜单项
3. icon 为 string 的时候，代表的是 Icon 组件的type属性
4. auth 为路由的权限标识
5. 有非动态的子路由时，自身将不是路由，如果需要自身也是路由，需添加 exist: true
5. 动态路由的配置有两种方式
    - 示例1，此时 userId 从 useParams 里取
    ```ts
    {
      path: 'user',
      name: '用户列表',
      children: [
        {
          path: ':userId',
          catalog: 'UserDetail',
          name: '用户信息‘
        }
      ]
    }
    ```
    - 示例2，此时 userId 从 location.search 上取
    ```ts
    {
      path: 'user',
      name: '用户列表',
      exist: true,
      children: [
        {
          path: 'userDetail',
          hidden: true,
          name: '用户信息‘
        }
      ]
    }
    ```