import Slider, { SliderProps } from '@mui/material/Slider';
import { cva } from 'class-variance-authority';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Checkbox from 'src/components/ui/Checkbox';
import { dropdownItemDefaultStyles } from 'src/components/ui/Dropdown';

interface Props extends Omit<SliderProps, 'onChange' | 'onChangeCommitted' | 'value'> {
  value?: number[];
  label?: string;
  showMarksLabel?: boolean;
  marksLabelGranularity?: number;
  // addSuffixToMaxMark?: boolean;
  minimumDistance?: number;
  onChange?: (value: number[]) => void;
}

const styles = cva(dropdownItemDefaultStyles({ showBgOnHover: false, className: 'px-6' }));

const getCorrectedGranularity = (labelGranularity: number) => {
  if (labelGranularity > 1) return 1;
  if (labelGranularity < 0.25) return 0.25;
  if (labelGranularity % 0.25 !== 0) return 1;

  return labelGranularity;
};

export default function DropdownItemRange({
  // addSuffixToMaxMark = true,
  className,
  label,
  marks,
  marksLabelGranularity = 1,
  max = 100,
  min = 0,
  minimumDistance,
  onChange,
  showMarksLabel = true,
  step,
  value = [0],
  ...restProps
}: Props) {
  const [internalValue, setInternalValue] = useState(() => (value.length ? value : [0]));
  const [hasUpperLimit, setHasUpperLimit] = useState(value.length === 2);
  const labelGranularity = useMemo(() => getCorrectedGranularity(marksLabelGranularity), [marksLabelGranularity]);

  useEffect(() => {
    setInternalValue(value);
    setHasUpperLimit(value.length === 2);
  }, [value]);

  const handleValueChange = (updatedValue: number | number[]) => {
    if (Array.isArray(updatedValue)) {
      const [start, end] = updatedValue;
      if (minimumDistance && Math.abs(start - end) < minimumDistance) return;

      setInternalValue(updatedValue);
    } else {
      setInternalValue([updatedValue]);
    }
  };

  const handleUpperLimitToggle = () => {
    const toggledValue = !hasUpperLimit;
    commitChange([internalValue[0], ...(toggledValue ? [max] : [])]);
  };

  const commitChange = (finalValue: number[]) => {
    onChange?.(finalValue);
  };

  const getFullMarks = useCallback(() => {
    const minMark = { value: min, label: `${min}` };
    const maxMark = { value: max, label: `${max}${hasUpperLimit ? '' : '+'}` };
    if (!step) return [minMark, maxMark];

    const marks = [minMark];
    for (let i = 1; ; i++) {
      const stepSize = step / labelGranularity;
      const markToAdd = min + stepSize * i;

      if (markToAdd >= max || markToAdd + stepSize > max) break;

      marks.push({ value: markToAdd, label: `${markToAdd}` });
    }

    return [...marks, maxMark];
  }, [hasUpperLimit, labelGranularity, max, min, step]);

  return (
    <div className={styles({ className })}>
      <div className='mb-3 grid grid-flow-col'>
        {label && <span className='text-sm'>{label}</span>}
        <Checkbox
          className='justify-self-end'
          size='sm'
          label='Upper limit'
          labelPlacement='left'
          checked={hasUpperLimit}
          onChange={() => handleUpperLimitToggle()}
        />
      </div>
      <Slider
        size='small'
        className='align-middle'
        valueLabelDisplay='auto'
        value={hasUpperLimit ? internalValue : internalValue[0]}
        track={hasUpperLimit ? 'normal' : 'inverted'}
        onChange={(_event, updatedValue, thumb) => handleValueChange(updatedValue, thumb)}
        onChangeCommitted={() => commitChange(internalValue)}
        max={max}
        step={step}
        marks={marks || (showMarksLabel && getFullMarks())}
        disableSwap
        {...restProps}
      />
    </div>
  );
}
