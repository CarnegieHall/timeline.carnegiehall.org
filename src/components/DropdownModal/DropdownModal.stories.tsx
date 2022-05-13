import { useState } from 'react';
import { DropdownModal, DropdownModalProps } from '.';
import { Button } from '../Button';

export default {
  title: 'Components/DropdownModal',
  component: DropdownModal
};

export const Default = ({ open = false }: DropdownModalProps) => {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</Button>
      <DropdownModal open={isOpen} onClose={() => setIsOpen(false)}>
        Pretium felis adipiscing rhoncus nisi vulputate inceptos eu taciti
        praesent commodo ullamcorper in aenean molestie sapien cras class dis
        dui
      </DropdownModal>
    </>
  );
};
