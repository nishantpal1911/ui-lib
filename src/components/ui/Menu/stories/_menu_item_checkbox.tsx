import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useEffect, useState } from 'react';

import { Menu } from 'src/components/ui/Menu';

const getCheckboxOptions = (optionsLength = 5): { value: string; isSelected: boolean }[] => {
  return new Array(optionsLength || 5)
    .fill(0)
    .map((_val, index) => ({ value: `Item ${index + 1}`, isSelected: false }));
};

export const MenuCheckboxExample = ({ collapseOnSelect, optionsLength, transition, ...args }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(() => getCheckboxOptions(optionsLength));

  useEffect(() => {
    setOptions(getCheckboxOptions(optionsLength));
  }, [optionsLength]);

  const onToggle = (toggledValue?: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.value !== toggledValue ? option : { ...option, isSelected: !option.isSelected }
      )
    );
  };

  return (
    <Menu isOpen={isOpen} openMenu={() => setIsOpen(true)} closeMenu={() => setIsOpen(false)}>
      <Menu.Trigger {...args} outlined icon={{ svg: isOpen ? ArrowDropUpIcon : ArrowDropDownIcon, placement: 'right' }}>
        Select Items
      </Menu.Trigger>
      <Menu.Container transition={transition}>
        {options.map(({ isSelected, value }, index) => (
          <Menu.ItemCheckbox
            key={index}
            label={value}
            value={value}
            checked={isSelected}
            onChange={() => onToggle(value)}
            size={args.size}
          />
        ))}
      </Menu.Container>
    </Menu>
  );
};
