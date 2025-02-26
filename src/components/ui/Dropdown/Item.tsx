import { cva, cx } from 'class-variance-authority';

import { Button, ButtonSize } from 'src/components/ui';

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
  disabled?: boolean;
  value?: string;
  size?: ButtonSize;
  onSelect?: (value?: string) => void;
  /**
   * For internal use by `Dropdown` component only
   */
  showBgOnSelected?: boolean;
  onSelectInternal?: (value?: string) => void;
};

export const dropdownItemDefaultClasses = 'w-full text-left font-medium text-black';

const highlighterStyles = cva('absolute top-0 bottom-0 left-0 bg-blue-200', {
  variants: {
    size: {
      xs: 'w-0.5',
      sm: 'w-[3px]',
      md: 'w-[3px]',
      lg: 'w-1',
      xl: 'w-1',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default function DropdownItem(props: Props) {
  const shouldHighlightItem = props.showBgOnSelected && props.isSelected && !props.disabled;

  const selectHandler = () => {
    props.onSelect?.(props.value);
    props.onSelectInternal?.(props.value);
  };

  return (
    <Button
      intent='tertiary'
      size={props.size}
      text={props.text}
      disabled={props.disabled}
      onClick={selectHandler}
      className={cx(
        dropdownItemDefaultClasses,
        'rounded-none transition-none',
        shouldHighlightItem && 'bg-blue-50 hover:bg-blue-50',
        props.className
      )}
    >
      {shouldHighlightItem && <div className={highlighterStyles({ size: props.size })} />}
      {props.children}
    </Button>
  );
}
