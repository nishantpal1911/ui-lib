import { useMemo } from 'react';
import { NavLink } from 'react-router';

import { Dropdown, DropdownItemLink, Select } from 'src/components/ui';

export const LinkSelectExample = ({ collapseOnSelect, optionsLength, ...args }: any) => {
  const options = useMemo(
    () => new Array(optionsLength || 5).fill(0).map((_val, index) => `Link ${index + 1}`),
    [optionsLength]
  );

  return (
    <Select {...args}>
      <Dropdown collapseOnSelect={collapseOnSelect}>
        {options.map((value, index) => (
          <DropdownItemLink
            key={index}
            value={value}
            render={({ classNameFn, onClick }) => (
              <NavLink to='#' className={({ isActive }) => classNameFn(isActive)} onClick={onClick}>
                {value}
              </NavLink>
            )}
          />
        ))}
      </Dropdown>
    </Select>
  );
};
