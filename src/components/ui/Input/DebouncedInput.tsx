import { PropsWithChildren, useEffect, useState } from 'react';

import { TextInput, TextInputProps } from 'src/components/ui';

interface DebouncedInputOptions extends Omit<TextInputProps, 'onChange'> {
  debounceMS?: number;
  onChange?: (value: string) => void;
}

export default function DebouncedInput({
  debounceMS = 500,
  onChange,
  value: initialValue = '',
  ...restProps
}: PropsWithChildren<DebouncedInputOptions>) {
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
