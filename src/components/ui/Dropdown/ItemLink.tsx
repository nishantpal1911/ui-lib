import { cva } from 'class-variance-authority';
import { Link, LinkProps } from 'react-router-dom';

import { dropdownItemDefaultStyles } from 'src/components/ui/Dropdown';
import { TextOrChildren } from 'src/components/ui/Dropdown/Item';

interface Props extends LinkProps {
  to: string;
  value?: string;
  /**
   * For internal use by `Dropdown` component only
   */
  onSelectInternal?: (value?: string) => void;
}

const styles = cva(`${dropdownItemDefaultStyles()} text-black no-underline`);

export default function DropdownItemLink(props: Props & TextOrChildren) {
  const { children, className, onSelectInternal, text, to, value } = props;

  return (
    <Link to={to} className={styles({ className })} onClick={() => onSelectInternal?.(value)}>
      {text || children}
    </Link>
  );
}
