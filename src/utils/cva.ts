import { cva } from 'class-variance-authority';
import { ClassProp, ClassValue, StringToBoolean } from 'class-variance-authority/types';
import { twMerge } from 'tailwind-merge';

/**
 * Types copied as-is from class-variance-authority
 */
type ConfigSchema = Record<string, Record<string, ClassValue>>;
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | StringToBoolean<keyof T[Variant]>[] | undefined;
};
type Config<T> =
  T extends ConfigSchema ?
    {
      variants?: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
      : ClassProp)[];
    }
  : never;
type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassProp : ClassProp;
/* End of cva types */

type PropsWithClass<T> = Omit<Props<T>, 'className'> & { className?: string | false };

export const tailwindCVA =
  <T>(base?: ClassValue, config?: Config<T>) =>
  (props?: PropsWithClass<T>) => {
    const stylesFn = cva(base, config);
    const { className, ...restProps } = props || {};

    return twMerge(stylesFn(restProps as Props<T>), className);
  };
