/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from 'react';

import { Dropdown, DropdownItemLink, Select } from 'src/components/ui';

export const _LinkSelect = ({ collapseOnSelect, optionsLength, ...args }: any) => {
  const options = useMemo(
    () => new Array(optionsLength || 5).fill(0).map((_val, index) => `Link ${index + 1}`),
    [optionsLength]
  );

  return (
    <Select {...args}>
      <Dropdown collapseOnSelect={collapseOnSelect}>
        {options.map((value, index) => (
          <DropdownItemLink to='#' key={index} value={value} text={value} />
        ))}
      </Dropdown>
    </Select>
  );
};
