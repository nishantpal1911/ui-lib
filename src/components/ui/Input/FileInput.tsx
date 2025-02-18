import { ChangeEvent, ComponentProps, useRef, useState } from 'react';

import Button from 'src/components/ui/Button';
import InlineFeedback from 'src/components/ui/InlineFeedback';

interface Props extends Omit<ComponentProps<typeof Button>, 'onError' | 'onClick'> {
  onFileChange: (file: File) => void;
  hideSelectedFile?: boolean;
  hideError?: boolean;
  onError?: (error: string, file: File) => void;
  fileType?: 'text/csv' | 'application/pdf';
}

export default function FileInput({
  fileType,
  hideError,
  hideSelectedFile,
  onError,
  onFileChange,
  outlined = true,
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

  return (
    <div className='w-fit'>
      <div className='flex flex-wrap items-center gap-2'>
        <Button outlined={outlined} onClick={() => fileInputRef.current?.click()} {...restProps} />
        {!hideSelectedFile && selectedFile && (
          <p>
            Chosen File: <span className='font-medium'>{selectedFile.name}</span>
          </p>
        )}
        <input type='file' value='' ref={fileInputRef} className='hidden' onChange={handleFileInput} />
      </div>
      <InlineFeedback className='mt-2' showFeedback={!hideError && !!error} text={error || ''} />
    </div>
  );
}
