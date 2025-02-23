import { ComponentProps, PropsWithChildren, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { inputContainerStyles, inputStyles } from 'src/components/ui/Input';
import { isAlphaNumeric, isInteger } from 'src/utils/validation';

type InputType = 'text' | 'integer' | 'alphanum' | 'password';

interface InputOptions {
  label?: string;
  type?: InputType;
  containerClass?: string;
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Props extends Omit<ComponentProps<'input'>, 'type' | 'onChange' | 'size'>, InputOptions {}

export type { Props as TextInputProps };

const generateId = () => `TextInput__${uuidv4()}`;

export default function TextInput(props: PropsWithChildren<Props>) {
  const {
    children,
    className,
    containerClass = '',
    disabled,
    id: propsId,
    label,
    onChange,
    rounded,
    size = 'md',
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

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange || !isValueTypeValid(event.target.value)) return;

    onChange(event.target.value, event);
  };

  return (
    <div className='flex flex-col'>
      {label && (
        <label className='mb-2' htmlFor={idRef.current}>
          {label}
        </label>
      )}
      <div className={inputContainerStyles({ className: containerClass, rounded, size })}>
        <input
          className={inputStyles({ disabled, className })}
          id={idRef.current}
          disabled={disabled}
          type={type === 'password' ? type : 'text'}
          onChange={handleValueChange}
          {...restProps}
        />
        {children}
      </div>
    </div>
  );
}
