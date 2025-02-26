import MaterialSlider, { SliderProps } from '@mui/material/Slider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Checkbox } from 'src/components/ui';

interface Props extends Omit<SliderProps, 'onChange' | 'onChangeCommitted' | 'value'> {
  value?: number[];
  label?: string;
  showMarksLabel?: boolean;
  marksLabelGranularity?: number;
  showUpperLimitToggle?: boolean;
  addSuffixToMaxMark?: boolean;
  minimumDistance?: number;
  onChange?: (value: number[]) => void;
}

const styles = (className?: string) => twMerge('min-w-40', className);

const getCorrectedGranularity = (labelGranularity: number) => {
  if (labelGranularity > 1) return 1;
  if (labelGranularity < 0.25) return 0.25;
  if (labelGranularity % 0.25 !== 0) return 1;

  return labelGranularity;
};

export default function Slider({
  addSuffixToMaxMark = true,
  className,
  label,
  marks,
  marksLabelGranularity = 1,
  max = 100,
  min = 0,
  minimumDistance = 0,
  onChange,
  showMarksLabel = true,
  showUpperLimitToggle = false,
  step,
  value,
  ...restProps
}: Props) {
  const [internalValue, setInternalValue] = useState(() => (value?.length ? value : [0]));
  const [hasUpperLimit, setHasUpperLimit] = useState(value?.length === 2);
  const labelGranularity = useMemo(() => getCorrectedGranularity(marksLabelGranularity), [marksLabelGranularity]);

  useEffect(() => {
    if (!value?.length) return;

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
    const maxMark = { value: max, label: `${max}${!hasUpperLimit && addSuffixToMaxMark ? '+' : ''}` };
    if (!step || (max - min) / step > 10) return [minMark, maxMark];

    const marks = [minMark];
    const stepSize = Number((step / labelGranularity).toFixed(1));

    for (let i = 1; ; i++) {
      const markToAdd = min + stepSize * i;

      if (markToAdd >= max || markToAdd + stepSize > max) break;

      marks.push({ value: markToAdd, label: `${markToAdd}` });
    }

    return [...marks, maxMark];
  }, [addSuffixToMaxMark, hasUpperLimit, labelGranularity, max, min, step]);

  return (
    <div className={styles(className)}>
      <div className='mb-3 grid grid-flow-col gap-2'>
        {label && <span className='text-sm font-bold'>{label}</span>}
        {showUpperLimitToggle && (
          <Checkbox
            className='justify-self-end font-medium'
            size='xs'
            label='Upper limit'
            labelPlacement='left'
            checked={hasUpperLimit}
            onChange={handleUpperLimitToggle}
          />
        )}
      </div>
      <MaterialSlider
        size='small'
        className='align-middle'
        valueLabelDisplay='auto'
        value={hasUpperLimit ? internalValue : internalValue[0]}
        track={hasUpperLimit ? 'normal' : 'inverted'}
        onChange={(_event, updatedValue) => handleValueChange(updatedValue)}
        onChangeCommitted={() => commitChange(internalValue)}
        min={min}
        max={max}
        step={step}
        marks={marks || (showMarksLabel && getFullMarks())}
        disableSwap
        {...restProps}
      />
    </div>
  );
}

export type { Props as SliderProps };
