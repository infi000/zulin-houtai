import * as React from 'react';

// import enMessagePng from 'static/images/ic_en_message@2x.png';
interface IProps {
  value: string;
  onChange: (value: string) => any;
}

function ToggleLanguage(props: IProps) {
  const { value, onChange } = props;

  return (
    <div onChange={() => onChange(value === 'zh-CN' ? 'en-US' : value)}>
      {/* <img
        src={enMessagePng}
        width={20}
        height={20}
        alt={value}
      /> */}
    </div>
  );
}

export default ToggleLanguage;
