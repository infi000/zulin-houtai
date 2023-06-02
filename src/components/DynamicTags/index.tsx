import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  value?: any[];
  onChange?: (params: any[]) => void;
  disabled?: boolean;
}

function App(props: IProps) {
  const { value, onChange, disabled } = props;
  console.log(disabled);
  const [tags, setTags] = useState<string[]>(value);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (value?.length) {
      setTags(value);
    }
  }, [value]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleChange = (val: any[]) => {
    if (onChange) {
      onChange(val);
    }
  };

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
    handleChange(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      handleChange(newTags);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    handleChange(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  return (
    <>
      {(tags || []).map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              style={{ width: '100px' }}
              ref={editInputRef}
              key={tag}
              size='small'
              className='tag-input'
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className='edit-tag'
            key={tag}
            closable={!disabled}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={e => {
                if (!disabled) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          style={{ width: '100px' }}
          ref={inputRef}
          type='text'
          size='small'
          className='tag-input'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && !disabled && (
        <Tag className='site-tag-plus' onClick={showInput}>
          <PlusOutlined /> 新标签
        </Tag>
      )}
    </>
  );
};

export default App;
