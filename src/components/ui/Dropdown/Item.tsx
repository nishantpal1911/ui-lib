import { cva } from 'class-variance-authority';

import { dropdownItemDefaultStyles } from 'src/components/ui/Dropdown';

interface TextWithoutChildren {
  text: string;
  children?: never;
}

interface ChildrenWithoutText {
  text?: never;
  children: React.ReactNode;
}

export type TextOrChildren = TextWithoutChildren | ChildrenWithoutText;

type Props = TextOrChildren & {
  className?: string;
  isSelected?: boolean;
  value?: string;
  showBgOnSelected?: boolean;
  onSelect?: (value?: string) => void;
  /**
   * For internal use by `Dropdown` component only
   */
  onSelectInternal?: (value?: string) => void;
};

const styles = cva(dropdownItemDefaultStyles(), {
  variants: {
    showBgOnSelected: { true: '' },
    isSelected: { true: '' },
  },
  compoundVariants: [
    {
      showBgOnSelected: true,
      isSelected: true,
      className: 'border-l-2 border-blue-200 bg-blue-50 pl-3.5 hover:bg-blue-50',
    },
  ],
});

export default function DropdownItem(props: Props) {
  const { children, isSelected, onSelect, onSelectInternal, showBgOnSelected, text, value } = props;

  const selectHandler = () => {
    onSelect?.(value);
    onSelectInternal?.(value);
  };

  return (
    <button className={styles({ isSelected, showBgOnSelected, className: props.className })} onClick={selectHandler}>
      {text || children}
    </button>
  );
}
