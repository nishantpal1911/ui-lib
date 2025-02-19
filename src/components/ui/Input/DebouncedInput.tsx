import { ComponentProps, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { inputContainerStyles, inputStyles } from 'src/components/ui/Input';

interface DebouncedInputOptions {
  label?: string;
  value?: string;
  debounceMS?: number;
  containerClass?: string;
  rounded?: boolean;
  onChangeValue?: (value: string) => void;
}

interface Props extends Omit<ComponentProps<'input'>, 'type' | 'value'>, DebouncedInputOptions {}

export type { Props as DebouncedInputProps };

const generateId = () => `DebouncedInput__${uuidv4()}`;

export default function DebouncedInput(props: PropsWithChildren<Props>) {
  const {
    children,
    className,
    containerClass = '',
    debounceMS = 500,
    disabled,
    id: propsId,
    label,
    onChangeValue,
    rounded,
    value: initialValue = '',
    ...restProps
  } = props;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!onChangeValue) return;

    const timeout = setTimeout(() => {
      onChangeValue(value);
    }, debounceMS);

    return () => clearTimeout(timeout);
  }, [debounceMS, onChangeValue, value]);

  const idRef = useRef(propsId || (label ? generateId() : undefined));

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
          type='text'
          onChange={({ target }) => setValue(target.value)}
          value={value}
          {...restProps}
        />
        {children}
      </div>
    </div>
  );
}
