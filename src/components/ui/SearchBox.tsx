import SearchIcon from '@mui/icons-material/Search';
import { ComponentProps, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { DebouncedInput, DebouncedInputProps } from 'src/components/ui';

interface Props extends Omit<ComponentProps<'input'>, 'value'>, DebouncedInputProps {}

const generateId = () => `SearchBox__${uuidv4()}`;

export default function SearchBox(props: Props) {
  const { type, ...restProps } = props;
  const idRef = useRef(props.id || (props.label ? generateId() : undefined));

  return (
    <DebouncedInput id={idRef.current} placeholder='Search' {...restProps}>
      <SearchIcon className='text-gray-400' />
    </DebouncedInput>
  );
}
