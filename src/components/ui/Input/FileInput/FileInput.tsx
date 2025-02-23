import { cx } from 'class-variance-authority';
import { ChangeEvent, ComponentProps, useRef, useState } from 'react';

import { Button, InlineFeedback } from 'src/components/ui';

interface Props extends Omit<ComponentProps<typeof Button>, 'onError' | 'onClick'> {
  onFileChange: (file: File) => void;
  hideSelectedFile?: boolean;
  hideError?: boolean;
  onError?: (error: string, file: File) => void;
  fileType?: 'text/csv' | 'application/pdf';
  containerClass?: string;
}

export default function FileInput({
  containerClass,
  fileType,
  hideError,
  hideSelectedFile,
  onError,
  onFileChange,
  outlined = true,
  size,
  ...restProps
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    const file = files.item(0);
    if (!file) return;

    if (fileType && file.type !== fileType) {
      const fileNameParts = file.name.split('.');
      const extension = fileNameParts[fileNameParts.length - 1];
      const errorMessage = `Invalid file extension: .${extension}`;
      setError(errorMessage);
      onError?.(errorMessage, file);
    } else {
      setError(null);
      onFileChange?.(file);
    }

    setSelectedFile(file);
  };

  const textClasses = cx('text-sm', size && ['xs', 'sm'].includes(size) && 'text-xs');

  return (
    <div className={containerClass}>
      <Button outlined={outlined} size={size} onClick={() => fileInputRef.current?.click()} {...restProps} />

      <input type='file' value='' ref={fileInputRef} className='hidden' onChange={handleFileInput} />

      {!hideSelectedFile && selectedFile && (
        <p className={`${textClasses} mt-2`}>
          Chosen File: <span className='font-semibold'>{selectedFile.name}</span>
        </p>
      )}

      <InlineFeedback className={`${textClasses} mt-1`} showFeedback={!hideError && !!error} text={error || ''} />
    </div>
  );
}
