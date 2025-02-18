import { PropsWithChildren } from 'react';

import { ContainerLoader } from 'src/components/ui/Loader';

interface Props {
  loading?: boolean;
  className?: string;
}

export function Form(props: PropsWithChildren<Props>) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={`relative min-w-80 rounded-2xl border-4 border-gray-400 bg-white py-6 ${props.className || ''}`}
    >
      {props.loading && <ContainerLoader />}
      {props.children}
    </form>
  );
}

export function FormSection(props: PropsWithChildren<Props>) {
  return <div className={`flex flex-col gap-5 px-5 py-3 ${props.className || ''}`}>{props.children}</div>;
}

export function FormHeader(props: PropsWithChildren<Props>) {
  return <div className={`flex gap-2 ${props.className || ''}`}>{props.children}</div>;
}
