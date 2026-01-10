import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useMemo, useState } from 'react';

import { Menu } from 'src/components/ui/Menu';

export const MenuItemExample = ({
  closeOnContainerScroll,
  closeOnSelect,
  eagerLoad,
  optionsLength,
  placement,
  transition,
  ...args
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();
  const options = useMemo(
    () => new Array(optionsLength || 5).fill(0).map((_val, index) => `Item ${index + 1}`),
    [optionsLength]
  );

  return (
    <Menu
      isOpen={isOpen}
      openMenu={() => setIsOpen(true)}
      closeMenu={() => setIsOpen(false)}
      closeOnSelect={closeOnSelect}
      closeOnContainerScroll={closeOnContainerScroll}
      placement={placement}
    >
      <Menu.Trigger {...args} outlined icon={{ svg: isOpen ? ArrowDropUpIcon : ArrowDropDownIcon, placement: 'right' }}>
        Open Menu
      </Menu.Trigger>
      <Menu.Container eagerLoad={eagerLoad} transition={transition}>
        {options.map((value, index) => (
          <Menu.Item
            key={index}
            text={value}
            isSelected={value === selectedOption}
            onClick={() => setSelectedOption(value)}
            size={args.size}
          />
        ))}
      </Menu.Container>
    </Menu>
  );
};
