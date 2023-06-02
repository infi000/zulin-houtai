declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.less'

declare module '@assets/styles/antd.global' {
  const theme: { readonly [key: string]: string };
  export default theme;
}

declare module '*.xls';

declare module '*.xlsx';

declare module '*.csv' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

declare module '*.pdf';
declare module 'react-slick';
