import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { InputOptions, TextInput, TextInputPropsExt } from 'src/components/ui';

interface DebouncedInputOptions extends InputOptions {
  debounceMS?: number;
  onChange?: (value: string) => void;
}

interface DebouncedInputProps extends Omit<TextInputPropsExt, 'onChange'>, DebouncedInputOptions {}

export default function DebouncedInput({
  debounceMS = 500,
  onChange,
  value: initialValue = '',
  ...restProps
}: PropsWithChildren<DebouncedInputProps>) {
  const [value, setValue] = useState(initialValue as string);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    setValue(initialValue as string);
  }, [initialValue]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!onChangeRef.current) return;

    const timeout = setTimeout(() => onChangeRef.current?.(value), debounceMS);

    return () => clearTimeout(timeout);
  }, [debounceMS, value]);

  return <TextInput value={value} onChange={setValue} {...restProps} />;
}

export type { DebouncedInputOptions, DebouncedInputProps };
