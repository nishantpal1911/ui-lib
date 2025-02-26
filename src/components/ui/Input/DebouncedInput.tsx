import { PropsWithChildren, useEffect, useState } from 'react';

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

  useEffect(() => {
    setValue(initialValue as string);
  }, [initialValue]);

  useEffect(() => {
    if (!onChange) return;

    const timeout = setTimeout(() => onChange(value), debounceMS);

    return () => clearTimeout(timeout);
  }, [debounceMS, onChange, value]);

  return <TextInput value={value} onChange={setValue} {...restProps} />;
}

export type { DebouncedInputOptions, DebouncedInputProps };
