<!--
 * @Author: 赵骐
 * @Date: 2020-06-30 14:36:05
 * @LastEditTime: 2020-07-16 17:24:30
 * @LastEditors: 李淳
 * @Description: In User Settings Edit
 * @FilePath: /cosmos/docs/cosmos/ts.md
-->

# TypeScript

> 赵骐 @2020-07-16

## Typescript 配置

### tsconfig
Typescript的配置主要包括以下内容

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5" /* target用于指定编译之后的版本目标: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "module": "commonjs" /* 用来指定要使用的模块标准: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    "lib": ["es6", "dom"] /* lib用于指定要包含在编译中的库文件 */,
    "allowJs": true,                       /* allowJs设置的值为true或false，用来指定是否允许编译js文件，默认是false，即不编译js文件 */
    "checkJs": true,                       /* checkJs的值为true或false，用来指定是否检查和报告js文件中的错误，默认是false */
    "jsx": "preserve",                     /* 指定jsx代码用于的开发环境: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                   /* declaration的值为true或false，用来指定是否在编译的时候生成相应的".d.ts"声明文件。如果设为true，编译每个ts文件之后会生成一个js文件和一个声明文件。但是declaration和allowJs不能同时设为true */
    "declarationMap": true,                /* 值为true或false，指定是否为声明文件.d.ts生成map文件 */
    "sourceMap": true,                     /* sourceMap的值为true或false，用来指定编译时是否生成.map文件 */
    "outFile": "./",                       /* outFile用于指定将输出文件合并为一个文件，它的值为一个文件路径名。比如设置为"./dist/main.js"，则输出的文件为一个main.js文件。但是要注意，只有设置module的值为amd和system模块时才支持这个配置 */
    "outDir": "./",                        /* outDir用来指定输出文件夹，值为一个文件夹路径字符串，输出的文件都将放置在这个文件夹 */
    "rootDir": "./",                       /* 用来指定编译文件的根目录，编译器会在根目录查找入口文件，如果编译器发现以rootDir的值作为根目录查找入口文件并不会把所有文件加载进去的话会报错，但是不会停止编译 */
    "composite": true,                     /* 是否编译构建引用项目  */
    "incremental": true,                   /* 是否启用增量编译*/
    "tsBuildInfoFile": "./",               /* 指定文件用来存储增量编译信息 */
    "removeComments": true,                /* removeComments的值为true或false，用于指定是否将编译后的文件中的注释删掉，设为true的话即删掉注释，默认为false */
    "noEmit": true,                        /* 不生成编译文件，这个一般比较少用 */
    "importHelpers": true,                 /* importHelpers的值为true或false，指定是否引入tslib里的辅助工具函数，默认为false */
    "downlevelIteration": true,            /* 当target为'ES5' or 'ES3'时，为'for-of', spread, and destructuring'中的迭代器提供完全支持 */
    "isolatedModules": true,               /* isolatedModules的值为true或false，指定是否将每个文件作为单独的模块，默认为true，它不可以和declaration同时设定 */

    /* Strict Type-Checking Options */
    "strict": true /* strict的值为true或false，用于指定是否启动所有类型检查，如果设为true则会同时开启下面这几个严格类型检查，默认为false */,
    "noImplicitAny": true,                 /* noImplicitAny的值为true或false，如果我们没有为一些值设置明确的类型，编译器会默认认为这个值为any，如果noImplicitAny的值为true的话。则没有明确的类型会报错。默认值为false */
    "strictNullChecks": true,              /* strictNullChecks为true时，null和undefined值不能赋给非这两种类型的值，别的类型也不能赋给他们，除了any类型。还有个例外就是undefined可以赋值给void类型 */
    "strictFunctionTypes": true,           /* strictFunctionTypes的值为true或false，用于指定是否使用函数参数双向协变检查 */
    "strictBindCallApply": true,           /* 设为true后会对bind、call和apply绑定的方法的参数的检测是严格检测的 */
    "strictPropertyInitialization": true,  /* 设为true后会检查类的非undefined属性是否已经在构造函数里初始化，如果要开启这项，需要同时开启strictNullChecks，默认为false */
   "noImplicitThis": true,                /* 当this表达式的值为any类型的时候，生成一个错误 */
    "alwaysStrict": true,                  /* alwaysStrict的值为true或false，指定始终以严格模式检查每个模块，并且在编译之后的js文件中加入"use strict"字符串，用来告诉浏览器该js为严格模式 */

    /* Additional Checks */
    "noUnusedLocals": true,                /* 用于检查是否有定义了但是没有使用的变量，对于这一点的检测，使用eslint可以在你书写代码的时候做提示，你可以配合使用。它的默认值为false */
    "noUnusedParameters": true,            /* 用于检查是否有在函数体中没有使用的参数，这个也可以配合eslint来做检查，默认为false */
    "noImplicitReturns": true,             /* 用于检查函数是否有返回值，设为true后，如果函数没有返回值则会提示，默认为false */
    "noFallthroughCasesInSwitch": true,    /* 用于检查switch中是否有case没有使用break跳出switch，默认为false */

    /* Module Resolution Options */
    "moduleResolution": "node",            /* 用于选择模块解析策略，有'node'和'classic'两种类型' */
    "baseUrl": "./",                       /* baseUrl用于设置解析非相对模块名称的基本目录，相对模块不会受baseUrl的影响 */
    "paths": {},                           /* 用于设置模块名称到基于baseUrl的路径映射 */
    "rootDirs": [],                        /* rootDirs可以指定一个路径列表，在构建时编译器会将这个路径列表中的路径的内容都放到一个文件夹中 */
    "typeRoots": [],                       /* typeRoots用来指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载 */
    "types": [],                           /* types用来指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来 */
    "allowSyntheticDefaultImports": true,  /* 用来指定允许从没有默认导出的模块中默认导入 */
    "esModuleInterop": true /* 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性 */,
    "preserveSymlinks": true,              /* 不把符号链接解析为其真实路径，具体可以了解下webpack和nodejs的symlink相关知识 */

    /* Source Map Options */
    "sourceRoot": "",                      /* sourceRoot用于指定调试器应该找到TypeScript文件而不是源文件位置，这个值会被写进.map文件里 */
    "mapRoot": "",                         /* mapRoot用于指定调试器找到映射文件而非生成文件的位置，指定map文件的根路径，该选项会影响.map文件中的sources属性 */
    "inlineSourceMap": true,               /* 指定是否将map文件的内容和js文件编译在同一个js文件中，如果设为true，则map的内容会以//# sourceMappingURL=然后拼接base64字符串的形式插入在js文件底部 */
    "inlineSources": true,                 /* 用于指定是否进一步将.ts文件的内容也包含到输入文件中 */

    /* Experimental Options */
    "experimentalDecorators": true /* 用于指定是否启用实验性的装饰器特性 */
    "emitDecoratorMetadata": true,         /* 用于指定是否为装饰器提供元数据支持，关于元数据，也是ES6的新标准，可以通过Reflect提供的静态方法获取元数据，如果需要使用Reflect的一些方法，需要引入ES2015.Reflect这个库 */
  }
  "files": [], // files可以配置一个数组列表，里面包含指定文件的相对或绝对路径，编译器在编译的时候只会编译包含在files中列出的文件，如果不指定，则取决于有没有设置include选项，如果没有include选项，则默认会编译根目录以及所有子目录中的文件。这里列出的路径必须是指定文件，而不是某个文件夹，而且不能使用* ? **/ 等通配符
  "include": [],  // include也可以指定要编译的路径列表，但是和files的区别在于，这里的路径可以是文件夹，也可以是文件，可以使用相对和绝对路径，而且可以使用通配符，比如"./src"即表示要编译src文件夹下的所有文件以及子文件夹的文件
  "exclude": [],  // exclude表示要排除的、不编译的文件，它也可以指定一个列表，规则和include一样，可以是文件或文件夹，可以是相对路径或绝对路径，可以使用通配符
  "extends": "",   // extends可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置，继承来的文件的配置会覆盖当前文件定义的配置。TS在3.2版本开始，支持继承一个来自Node.js包的tsconfig.json配置文件
  "compileOnSave": true,  // compileOnSave的值是true或false，如果设为true，在我们编辑了项目中的文件保存的时候，编辑器会根据tsconfig.json中的配置重新生成文件，不过这个要编辑器支持
  "references": [],  // 一个对象数组，指定要引用的项目
}
```

### 是否要开启更严格的 tsconfig 配置
TypeScript strict模式通过一系列配置,能限制一些不良的编码习惯、低级错误以及可能由于逻辑漏洞而导致的 bug,把问题在编码阶段就暴露出来。
因此在外部条件允许的情况下,强烈建议开启部分或者全部的严格模式,这对团队协作、问题排查、后期维护上都有很大的好处。
编译相关的都是靠 compilerOptions 设置的,其中详细配置及strict具体如下:

关于是否要开启更严格的 tsconfig 配置，其中 ts 严格模式的各项配置以及适用的场景：

noImplicitAny 
>ts 对于没有类型标注的变量隐含推断出变量类型为: any。noImplicitAny 针对此类变量的定义报错。
```ts
// Parameter 'a' implicitly has an 'any' type
function hello(a) {
  console.log(a)
}
```
noImplicitThis
> 不允许this上下文隐式定义。
```ts
//同 noImplicitAny，不过针对的是 this。如果 this 被推断成 any 类型则报错。
class Base {
  width = 3
  height = 4

  getArea() {
    return function () {
      // 'this' implicitly has type 'any' because it does not have a type annotation
      return this.width * this.height
    }
  }
}
//正确
class Base {
  width = 3
  height = 4

  getArea() {
    return () => {
      // ok
      return this.width * this.height
    }
  }
}
//把普通函数转换成箭头函数的写法，ts 能正确推断出 this 的类型。
```
strictNullChecks 
>不允许出现null或undefined的可能性。有的时候，我们的代码没有区分 null 和 undefined。但是这样可能在运行时导致一些非预期的行为。毕竟在 javascript 的环境下，null 和 undefined 是两种类型。开启 strictNullChecks, ts 对于 null 和 undefined 作为两个类型来看待。
```ts
strictNullChecks 等于 false
let i = 123
// ok
i = undefined
// ok
i = null
strictNullChecks 等于 true
let i = 123
// Type 'undefined' is not assignable to type 'number'
i = undefined
// Type 'null' is not assignable to type 'number'
i = null
```
strictFunctionTypes 
>对函数参数进行严格逆变比较。当开启的时候，ts 会严格比较函数的类型，指的是参数类型，不包含返回值类型。
```ts
//strictFunctionTypes 等于 false
type callFunc = (arg: number | string) => boolean | object

function testFunc1(arg: number): boolean {
  return arg > 3
}
// ok
let test1: callFunc = testFunc1
//strictFunctionTypes 等于 true
type callFunc = (arg: number | string) => boolean | object

function testFunc1(arg: number): boolean {
  return arg > 3
}

// Type 'string | number' is not assignable to type 'number'
let test1: callFunc = testFunc1
```
strictBindCallApply 
>这个配置项主要针对的就是 javascript 内置的三个方法：call、apply、bind。
```ts
//strictBindCallApply 等于 false
function test(a: number) {
  //...
}

// ok
test.apply(null, [false])
//strictBindCallApply 等于 true
function test(a: number) {
  //...
}

// Type 'false' is not assignable to type 'number'
test.apply(null, [false])
```
strictPropertyInitialization 
>验证构造函数内部初始化前后已定义的属性。
```ts
class A {
  // Property 'prop' has no initializer and is not definitely assigned in the constructor
  prop: string
}

class B {
  // ok
  prop: string
  constructor() {
    this.prop = "hello"
  }
}

class C {
  // ok, 等于 prop: string | undefined
  prop!: string
}
```
alwaysStrict 
>开启该模式之后，编译输出的 js 文件开启 strict mode 模式。
```js
总结:

ts 严格模式的各项配置以及适用的场景：
`noImplicitAny` 适用于推断 any 类型的变量错误
`noImplicitThis` 推断 any 类型的 this 错误
`strictNullChecks` 用于区分 undefined 和 null 以及其它变量类型
`strictFunctionTypes`针对的是函数类型变量参数问题
`strictBindCallApply` 关注 bind、call、apply 三个方法调用的参数问题
`strictPropertyInitialization` 关注类成员变量的初始化问题
`alwaysStrict` 控制编译输出的 js 文件是否要开启严格模式

如果不能启用全部的配置项（通过 strict），那么也应该尽可能多的开启配置项。

```


## 在项目中应用

### 全局类型声明

对于那些贯穿整个项目的类型，我们通常会创建全局类型声明文件进行统一管理。体现在项目中的就是`src/types/global.d.ts`文件。

全局类型主要包括
- 业务通用的声明：变量的基本类型、接口返回的通用数据格式。
- 全局对象的声明：Redux状态控制相关、国际化相关、pageSize等常量数据。

例如：
```ts
// 基本类型
declare type Dictionary<T> = {
  [key: string]: T;
}

// 可见性
declare type Visibility = 'hidden' | 'show';

// 功能权限控制相关
declare namespace Auth {
  export type Code = number;
}

// Redux 状态控制相关
declare namespace IRedux {
  interface Store {
    [key: string]: any;
  }

  // redux action
  type Action = {
    type: string;
    payload?: any;
    // loading 状态触发的Action
    loadingAction?: (loading: boolean) => Action;
    // 重复触发节流控制
    throttle?: number;
    // 异步Action调用的服务端服务
    service?: any;
    // 异步Action调用参数
    params?: any;
    // 异步Action调用成功后的Action
    success?: (Action | ActionCreator | any);
  }
  // redux action creator
  type ActionCreator = (params?: any, callback?: any) => Action;
}

// 后端返回数据
declare interface IResponseData<T> {
  errno: number;
  errmsg: string;
  data: T;
  st?: number;
  logid?: string;
}

// 列表类数据
declare interface IListResponse<T> {
  list: T[];
  total?: number;
}

declare interface IPagination {
  page: number;
  total: number;
  perpage?: number; // 由于后端传参问题，将pageSize改为perpage
  showTotal?: boolean;
  onChange?: (page: number) => void;
}

// 用户操作类型
declare type OperateType = 'create' | 'edit' | 'view';

declare interface IModalData<T> {
  visible: boolean;
  type?: OperateType;
  // 将弹窗渲染数据放置于data中，一般讲是提交到后端的数据
  data?: T;
  [key: string]: any;
}
```

###  模块间类型维护

对于那些在某几个模块间维护的类型，例如店铺、商圈等，我们统一放到`src/types/entity.ts`文件中进行管理

例如

```ts
declare interface IStoreItem {
  skuList: [ISkuItem];
  contractCode: string;
  createTime: string;
  kpiRule: string;
  orderGuaranteed: string;
  orderSubsidy: string;
  storeCode: string;
}

declare interface ISkuItem {
  skuId: string;
  skuName: string;
  range: string;
  price: string;
}

```

### 模块内类型维护

对于模块间相同的类型，可在模块下建立公共的.d.ts 文件
```
├── Demand
│   ├── demand.d.ts
│   ├── store.ts
│   ├── market.ts
```
例如:
```ts
export namespace ISearchInput {
  export interface DefaultProps {
    label: string,
    value: string
  }

  export interface QueryParams {
    keyword: string,
    select?: boolean | string | number
  }
}
```

## Typescript 使用

### Typescript内置类型

#### Partial
将类型 T 的所有属性标记为可选属性
```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```
使用场景：
```ts
// 账号属性
interface AccountInfo {
    name: string 
    email: string 
    age: number 
    vip: 0|1 // 1 是vip ，0 是非vip
}

// 当我们需要渲染一个账号表格时，我们需要定义
const accountList: AccountInfo[] = []

// 但当我们需要查询过滤账号信息，需要通过表单，
// 但明显我们可能并不一定需要用到所有属性进行搜索，此时可以定义
const model: Partial<AccountInfo> = {
  name: '',
  vip: undefind
}
```

#### Required
与 Partial 相反，Required 将类型 T 的所有属性标记为必选属性。
```ts
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

#### Readonly

将所有属性标记为 readonly, 即不能修改。
```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

#### Pick<T, K>
从 T 中过滤出属性 K
```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
使用场景:
```ts
interface AccountInfo {
  name: string 
  email: string 
  age: number 
  vip?: 0|1 // 1 是vip ，0 是非vip
}

type CoreInfo = Pick<AccountInfo, 'name' | 'email'>
/* 
{ 
  name: string
  email: stirng
}
*/
```

#### Record<K, T>
标记对象的 key value类型
```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

使用场景:

```ts
// 定义 学号(key)-账号信息(value) 的对象
const accountMap: Record<number, AccountInfo> = {
  10001: {
    name: 'xx',
    email: 'xxxxx',
    // ...
  }    
}
const user: Record<'name'|'email', string> = {
    name: '', 
    email: ''
}
// 复杂点的类型推断
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>

const names = { foo: "hello", bar: "world", baz: "bye" };
// 此处推断 K, T 值为 string , U 为 number
const lengths = mapObject(names, s => s.length);  // { foo: number, bar: number, baz: number }

```
#### Exclude<T, U>，Omit<T, K>
移除 T 中的 U 属性
```ts
type Exclude<T, U> = T extends U ? never : T;
```
使用场景：
```ts
// 'a' | 'd'
type A = Exclude<'a'|'b'|'c'|'d' ,'b'|'c'|'e' >  
乍一看好像这个没啥卵用，但是，我们通过一番操作，之后就可以得到 Pick 的反操作：
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type NonCoreInfo = Omit<AccountInfo, 'name' | 'email'>
/*
{
  age: number 
  vip: 0|1,
}
*/

```

#### Extract<T, U>
Exclude 的反操作，取 T，U两者的交集属性。

```ts
type Extract<T, U> = T extends U ? T : never;
```

使用 demo：

```ts
// 'b'|'c'
type A = Extract<'a'|'b'|'c'|'d' ,'b'|'c'|'e' >  

```

#### NonNullable
排除类型 T 的 null | undefined 属性
```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```
使用 demo
```ts
type A = string | number | undefined 
type B = NonNullable<A> // string | number

function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
    let s1: string = x;  // Error, x 可能为 undefined
    let s2: string = y;  // Ok
}
```
#### Parameters
获取一个函数的所有参数类型
```ts
// 此处使用 infer P 将参数定为待推断类型
// T 符合函数特征时，返回参数类型，否则返回 never
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```
使用demo:
```ts
interface IFunc {
  (person: IPerson, count: number): boolean
}

type P = Parameters<IFunc> // [IPerson, number]

const person01: P[0] = {
  // ...
}
另一种使用场景是，快速获取未知函数的参数类型
import {somefun} from 'somelib'
// 从其他库导入的一个函数，获取其参数类型
type SomeFuncParams = Parameters<typeof somefun>

// 内置函数
// [any, number?, number?]
type FillParams = Parameters<typeof Array.prototype.fill>
ConstructorParameters
类似于 Parameters<T>, ConstructorParameters 获取一个类的构造函数参数
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
使用 demo:
// string | number | Date 
type DateConstrParams = ConstructorParameters<typeof Date>
```

#### ReturnType
获取函数类型 T 的返回类型
```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```
使用方式和 Parameters<T> 类似，不再赘述

#### InstanceType
获取一个类的返回类型
```ts
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
```
使用方式和 ConstructorParameters<T> 类似，不再赘述


### Type or Interface

大家使用 typescript 总会使用到 interface 和 type，官方规范 稍微说了下两者的区别
`
An interface can be named in an extends or implements clause, but a type alias for an object type literal cannot.
An interface can have multiple merged declarations, but a type alias for an object type literal cannot.
`

#### 相同点
- 都可以描述一个对象或者函数
```ts

interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}

type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number): void;
```

- 拓展（extends）与 交叉类型（Intersection Types）

interface 可以 extends， 但 type 是不允许 extends 和 implement 的，但是 type 缺可以通过交叉类型 实现 interface 的 extend 行为，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 与 interface 类型 交叉 。

虽然效果差不多，但是两者语法不同。
```ts
// interface extends interface
interface Name { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}
// type 与 type 交叉
type Name = { 
  name: string; 
}
type User = Name & { age: number  };
// interface extends type
type Name = { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}
// type 与 interface 交叉
interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

#### 不同点

type 可以而 interface 不行

- type 可以声明基本类型别名，联合类型，元组等类型
```ts
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
type 语句中还可以使用 typeof 获取实例的 类型进行赋值
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div
```

- 一些其他情况
```ts
type StringOrNumber = string | number;  
type Text = string | { text: string };  
type NameLookup = Dictionary<string, Person>;  
type Callback<T> = (data: T) => void;  
type Pair<T> = [T, T];  
type Coordinates = Pair<number>;  
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

interface 可以而 type 不行

- interface 能够声明合并

```ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/

```

#### 总结

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。其他更多详情参看 官方规范文档。


### Namespace or Module

其中在TS1.5 以后，推荐全面使用namespace关键字代替module。因为JS里本身就有module的概念，而且已经是ES6标准里的关键字，各种加载框架比如CommonJS，AMD等也都有module的概念，但是TS里之前的module关键字与他们都不太相同。所以换了一个关键字加以区分，避免造成概念上的混淆。因此使用namespace实际上等价于TS以前使用的module。

```ts
declare namespace Auth {
  export type Code = number;
}

// Redux 状态控制相关
declare namespace IRedux {
  interface Store {
    [key: string]: any;
  }

  // redux action
  type Action = {
    type: string;
    payload?: any;
    // loading 状态触发的Action
    loadingAction?: (loading: boolean) => Action;
    // 重复触发节流控制
    throttle?: number;
    // 异步Action调用的服务端服务
    service?: any;
    // 异步Action调用参数
    params?: any;
    // 异步Action调用成功后的Action
    success?: (Action | ActionCreator | any);
  }
  // redux action creator
  type ActionCreator = (params?: any, callback?: any) => Action;
}
```