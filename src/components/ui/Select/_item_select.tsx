/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState } from 'react';

import { Dropdown, DropdownItem, Select } from 'src/components/ui';

export const _ItemSelect = ({ collapseOnSelect, optionsLength, ...args }: any) => {
  const [selectedOption, setSelectedOption] = useState<string>();
  const options = useMemo(
    () => new Array(optionsLength || 5).fill(0).map((_val, index) => `Item ${index + 1}`),
    [optionsLength]
  );

  return (
    <Select selectedOption={selectedOption} {...args}>
      <Dropdown showBgOnSelected collapseOnSelect={collapseOnSelect} onSelect={setSelectedOption}>
        {options.map((value, index) => (
          <DropdownItem key={index} text={value} value={value} isSelected={value === selectedOption} />
        ))}
      </Dropdown>
    </Select>
  );
};
