import { cva } from 'class-variance-authority';

import { Checkbox, CheckboxPropsExt } from 'src/components/ui';
import { dropdownItemDefaultClasses } from 'src/components/ui/Dropdown/Item';

const styles = cva(`${dropdownItemDefaultClasses} hover:bg-gray-200`, {
  variants: {
    size: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-2 py-1.5 text-sm',
      md: 'px-2.5 py-2',
      lg: 'px-3 py-2',
      xl: 'px-3 py-2.5 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default function MenuItemCheckbox({ className, ...restProps }: CheckboxPropsExt) {
  return <Checkbox {...restProps} className={styles({ size: restProps.size, className })} />;
}
