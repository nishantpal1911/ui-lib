import { cva } from 'class-variance-authority';

import Checkbox from 'src/components/ui/Checkbox';
import { dropdownItemDefaultStyles } from 'src/components/ui/Dropdown';

interface Props {
  text: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value?: string) => void;
  /**
   * For internal use by `Dropdown` component only
   */
  onSelectInternal?: (node: React.ReactNode) => void;
}

const styles = cva(dropdownItemDefaultStyles());

export default function DropdownItemCheckbox(props: Props) {
  const { checked, className, disabled, indeterminate, onChange, onSelectInternal, text, value } = props;
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event, value);
    onSelectInternal?.(value);
  };

  return (
    <Checkbox
      label={text}
      className={styles({ className })}
      checked={checked}
      indeterminate={indeterminate}
      disabled={disabled}
      onChange={onChangeHandler}
    />
  );
}
