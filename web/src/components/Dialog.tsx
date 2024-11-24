import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

type Props = {
  open: boolean;
  title: string;
  description?: string;
  content: React.ReactNode;
  handleCloseModal: () => void;
  handleSubmitModal: () => void;
};

export default function Modal({
  open,
  title,
  content,
  description,
  handleCloseModal,
  handleSubmitModal,
}: Props) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow' />
        <Dialog.Content className='fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
          <Dialog.Title className='m-0 text-[17px] font-medium text-mauve12'>
            {title}
          </Dialog.Title>
          <Dialog.Description className='mb-5 mt-2.5 text-[15px] leading-normal text-mauve11'>
            {description}
          </Dialog.Description>
          <React.Fragment>{content}</React.Fragment>
          <div className='mt-[25px] flex justify-end'>
            <Dialog.Close asChild>
              <Button
                onClick={handleSubmitModal}
                className='inline-flex h-[35px] items-center justify-center'
              >
                Salvar
              </Button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              aria-label='Close'
              onClick={handleCloseModal}
              className='absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none'
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
