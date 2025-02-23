import { ComponentProps, PropsWithChildren, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { inputContainerStyles, inputStyles } from 'src/components/ui/Input';
import { isAlphaNumeric, isInteger } from 'src/utils/validation';

type InputType = 'text' | 'integer' | 'alphanum' | 'password';

interface InputProps {
  label?: string;
  type?: InputType;
  containerClass?: string;
  rounded?: boolean;
  onChangeValue?: (value: string) => void;
}

interface Props extends Omit<ComponentProps<'input'>, 'type'>, InputProps {}

const generateId = () => `TextInput__${uuidv4()}`;

export default function TextInput(props: PropsWithChildren<Props>) {
  const {
    children,
    className,
    containerClass = '',
    disabled,
    id: propsId,
    label,
    onChangeValue,
    rounded,
    type = 'text',
    ...restProps
  } = props;

  const idRef = useRef(propsId || (label ? generateId() : undefined));

  const isValueTypeValid = (value: string): boolean => {
    if (!value.length || type === 'text' || type === 'password') return true;

    if (type === 'integer') {
      if (!isInteger(value)) return false;
    } else if (!isAlphaNumeric(value)) return false;

    return true;
  };

  const handleValueChange = (updatedValue: string) => {
    if (!onChangeValue || !isValueTypeValid(updatedValue)) return;

    onChangeValue(updatedValue);
  };

  return (
    <div className={`flex flex-col ${containerClass}`}>
      {label && (
        <label className='mb-2' htmlFor={idRef.current}>
          {label}
        </label>
      )}
      <div className={inputContainerStyles({ className, rounded })}>
        <input
          className={inputStyles({ disabled })}
          id={idRef.current}
          disabled={disabled}
          type={type === 'password' ? type : 'text'}
          onChange={({ target }) => handleValueChange(target.value)}
          {...restProps}
        />
        {children}
      </div>
    </div>
  );
}
