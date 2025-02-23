/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useState } from 'react';

import { Dropdown, DropdownItemCheckbox, Select } from 'src/components/ui';

const getCheckboxOptions = (optionsLength = 5): { value: string; isSelected: boolean }[] => {
  return new Array(optionsLength || 5)
    .fill(0)
    .map((_val, index) => ({ value: `Item ${index + 1}`, isSelected: false }));
};

export const _CheckboxSelect = ({ optionsLength, ...args }: any) => {
  const [options, setOptions] = useState(() => getCheckboxOptions(optionsLength));

  useEffect(() => {
    setOptions(getCheckboxOptions(optionsLength));
  }, [optionsLength]);

  const selectedOptions = useMemo(() => options.filter(({ isSelected }) => isSelected), [options]);
  const buttonText =
    selectedOptions.length === 0 ? ''
    : selectedOptions.length === options.length ? 'All'
    : `${selectedOptions.length} selected`;

  const onToggle = (toggledValue?: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.value !== toggledValue ? option : { ...option, isSelected: !option.isSelected }
      )
    );
  };

  return (
    <Select selectedOption={buttonText} {...args}>
      <Dropdown showBgOnSelected collapseOnSelect={false} onSelect={onToggle}>
        {options.map(({ isSelected, value }, index) => (
          <DropdownItemCheckbox key={index} text={value} value={value} checked={isSelected} />
        ))}
      </Dropdown>
    </Select>
  );
};
