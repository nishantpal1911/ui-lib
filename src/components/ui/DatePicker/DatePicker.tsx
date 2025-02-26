import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateCalendar, DateCalendarProps } from '@mui/x-date-pickers';
import { PickerSelectionState } from '@mui/x-date-pickers/internals';
import { formatDate } from 'date-fns';

import { Button, Dropdown, Select } from 'src/components/ui';
import { ButtonSize } from 'src/components/ui/Button';

interface Props extends Omit<DateCalendarProps<Date>, 'minDate' | 'maxDate'> {
  className?: string;
  containerClass?: string;
  label?: string;
  size?: ButtonSize;
  placeholder?: string;
  value: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  showClearButton?: boolean;
  onChange: (value: Date | null, selectionState?: PickerSelectionState) => void;
}

export default function DatePicker({
  className,
  containerClass,
  disabled,
  label,
  maxDate,
  minDate,
  onChange,
  placeholder,
  showClearButton = true,
  size,
  value,
  ...restProps
}: Props) {
  return (
    <Select
      icon={{ svg: CalendarMonthIcon, styles: { className: 'enabled:text-gray-600' } }}
      selectedOption={value ? formatDate(value, "dd MMM ''yy") : undefined}
      placeholder={placeholder}
      label={label}
      size={size}
      disabled={disabled}
      className={className}
      containerClass={containerClass}
    >
      <Dropdown passInternalProp={false} className='pb-0' eagerLoad>
        <DateCalendar
          views={['year', 'day']}
          value={value}
          minDate={minDate || undefined}
          maxDate={maxDate || undefined}
          onChange={(value, selectionState) => onChange?.(value, selectionState)}
          disabled={disabled}
          {...restProps}
        />
        {showClearButton && <Button text='Clear' intent='tertiary' className='w-full' onClick={() => onChange(null)} />}
      </Dropdown>
    </Select>
  );
}

export type { Props as DatePickerProps };
