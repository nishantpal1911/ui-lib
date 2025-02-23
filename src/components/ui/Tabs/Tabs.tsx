import { cva } from 'class-variance-authority';

import { Button, ButtonSize } from 'src/components/ui';
import { tailwindCVA } from 'src/utils/cva';

export interface ButtonTabProps {
  isActive?: boolean;
  text: string;
  disabled?: boolean;
}

interface Props {
  tabs: Record<string, ButtonTabProps>;
  className?: string;
  size?: ButtonSize;
  rounded?: boolean;
  onChangeTab: (activatedTabKey: string) => void;
}

const containerStyles = tailwindCVA('flex w-fit rounded-md border border-gray-300', {
  variants: {
    rounded: {
      true: 'rounded-full',
    },
  },
});

const buttonStyles = cva(
  'rounded-none border-l border-gray-400 bg-slate-200 px-4 text-black hover:bg-slate-200 hover:shadow-md',
  {
    variants: {
      isActive: {
        true: 'bg-slate-50 font-medium shadow-md hover:bg-slate-50',
      },
      isFirst: {
        true: 'rounded-l-md border-l-0',
      },
      isLast: {
        true: 'rounded-r-md',
      },
      rounded: {
        true: '',
      },
      size: {
        xs: 'min-w-24',
        sm: 'min-w-28',
        md: 'min-w-32',
        lg: 'min-w-36',
        xl: 'min-w-40',
      },
    },
    defaultVariants: {
      size: 'md',
    },
    compoundVariants: [
      { isFirst: true, rounded: true, className: 'rounded-l-full' },
      { isLast: true, rounded: true, className: 'rounded-r-full' },
    ],
  }
);

export default function Tabs(props: Props) {
  const tabsByKey = Object.entries(props.tabs);

  return (
    <div className={containerStyles({ rounded: props.rounded, className: props.className })}>
      {tabsByKey.map(([key, tab], index) => (
        <Button
          size={props.size}
          key={key}
          className={buttonStyles({
            isActive: tab.isActive,
            isFirst: index === 0,
            isLast: index === tabsByKey.length - 1,
            size: props.size,
            rounded: props.rounded,
          })}
          text={tab.text}
          disabled={tab.disabled}
          onClick={() => props.onChangeTab(key)}
        />
      ))}
    </div>
  );
}
