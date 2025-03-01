import MUISwitch, { SwitchProps } from '@mui/material/Switch';
import { cva } from 'class-variance-authority';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import 'src/styles/ui/Switch.css';

interface ToggleProps extends Pick<SwitchProps, 'color'> {
  text: string;
}

interface LabelWithoutToggleProps {
  label?: {
    text: string;
    placement?: 'left' | 'right';
  };
  toggledProps?: never;
  untoggledProps?: never;
}

interface TogglePropsWithoutLabel {
  label?: never;
  toggledProps: ToggleProps;
  untoggledProps: ToggleProps;
}

type TogglePropsOrLabel = LabelWithoutToggleProps | TogglePropsWithoutLabel;

type Props = TogglePropsOrLabel &
  Pick<SwitchProps, 'color' | 'id' | 'className' | 'disabled'> & {
    isToggled?: boolean;
    onToggle?: (checked: boolean) => void;
  };

const containerStyles = cva('toggle-switch cursor-pointer *:cursor-pointer', {
  variants: {
    disabled: {
      true: 'text-gray-400 *:has-[*]:cursor-default',
    },
  },
});

const labelStyles = cva('flex w-fit items-center gap-1 font-medium select-none', {
  variants: {
    labelPlacement: {
      left: '',
      right: 'flex-row-reverse',
    },
  },
});

const toggleTextStyles = cva('', {
  variants: {
    active: {
      false: 'opacity-75 hover:opacity-100',
    },
    disabled: {
      true: 'opacity-100',
    },
  },
});

const generateId = () => `ToggleSwitch__${uuidv4()}`;

export default function Switch(props: Props) {
  const idRef = useRef(props.id || (props.label?.text ? generateId() : undefined));

  const toggleHandler = (checked: boolean) => {
    if (props.disabled) return;

    props.onToggle?.(checked);
  };

  const switchClasses = props.isToggled ? props.toggledProps?.color || props.color : props.untoggledProps?.color;

  const Input = (
    <MUISwitch
      id={idRef.current}
      checked={props.isToggled}
      onChange={(_ev, checked) => toggleHandler(checked)}
      color={props.disabled ? 'default' : props.color}
      className={!props.disabled ? switchClasses : ''}
      disabled={props.disabled}
    />
  );

  return (
    <div className={containerStyles({ disabled: props.disabled })}>
      {props.label?.text ?
        <label htmlFor={idRef.current} className={labelStyles({ labelPlacement: props.label.placement })}>
          <span>{props.label.text}</span>
          {Input}
        </label>
      : <div className={labelStyles()}>
          {props.untoggledProps?.text && (
            <span
              onClick={() => toggleHandler(false)}
              className={toggleTextStyles({
                active: !props.isToggled,
                disabled: props.disabled,
                className: !props.disabled && props.untoggledProps.color,
              })}
            >
              {props.untoggledProps.text}
            </span>
          )}
          {Input}
          {props.toggledProps?.text && (
            <span
              onClick={() => toggleHandler(true)}
              className={toggleTextStyles({
                active: props.isToggled,
                disabled: props.disabled,
                className: !props.disabled && props.toggledProps.color,
              })}
            >
              {props.toggledProps.text}
            </span>
          )}
        </div>
      }
    </div>
  );
}

export type { Props as SwitchProps };
