import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateCalendar, DateCalendarProps } from '@mui/x-date-pickers';
import { PickerSelectionState } from '@mui/x-date-pickers/internals';
import { formatDate } from 'date-fns';

import { Button, Dropdown, Select } from 'src/components/ui';

interface Props extends Omit<DateCalendarProps<Date>, 'minDate' | 'maxDate'> {
  className?: string;
  containerClass?: string;
  label?: string;
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
  label,
  maxDate,
  minDate,
  onChange,
  placeholder,
  showClearButton = true,
  value,
  ...restProps
}: Props) {
  return (
    <Select
      icon={{ svg: CalendarMonthIcon, styles: { className: 'text-gray-600' } }}
      selectedOption={value ? formatDate(value, "dd MMM ''yy") : undefined}
      placeholder={placeholder}
      label={label}
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
          {...restProps}
        />
        {showClearButton && <Button text='Clear' intent='tertiary' className='w-full' onClick={() => onChange(null)} />}
      </Dropdown>
    </Select>
  );
}
