import { cva } from 'class-variance-authority';

import Button from 'src/components/ui/Button';

export interface ButtonTabProps {
  isActive?: boolean;
  text: string;
  disabled?: boolean;
}

interface Props {
  tabList: Record<string, ButtonTabProps>;
  className?: string;
  onChangeTab: (activeTab: string) => void;
}

const styles = cva(
  'min-w-32 rounded-none border-l border-gray-400 bg-slate-200 px-4 hover:shadow-lg has-[span]:text-black',
  {
    variants: {
      isActive: {
        true: 'font-medium shadow-lg has-[span]:bg-slate-50',
      },
      isFirst: {
        true: 'rounded-l-md border-l-0',
      },
      isLast: {
        true: 'rounded-r-md',
      },
    },
  }
);

export default function ButtonTabs(props: Props) {
  const tabsByKey = Object.entries(props.tabList);

  return (
    <div className={`flex w-fit rounded-md border border-gray-300 ${props.className || ''}`}>
      {tabsByKey.map(([key, tab], index) => (
        <Button
          key={key}
          className={styles({
            isActive: tab.isActive,
            isFirst: index === 0,
            isLast: index === tabsByKey.length - 1,
          })}
          text={tab.text}
          disabled={tab.disabled}
          onClick={() => props.onChangeTab(key)}
        />
      ))}
    </div>
  );
}
