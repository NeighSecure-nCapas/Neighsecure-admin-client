import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { MdEdit } from 'react-icons/md';

type PopoverDemoProps = {
  membersNumber: number;
  setMembersNumber: (value: number) => void;
};

const PopoverDemo = ({ membersNumber, setMembersNumber }: PopoverDemoProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <MdEdit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {'Numero de miembros del hogar'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {
                'El número de miembros del hogar es la cantidad maxima de personas a registrar.'
              }
            </p>
          </div>
          <Input
            id="membersNumber"
            type="number"
            value={membersNumber}
            min={0}
            className="py-5"
            onChange={(e) => setMembersNumber(Number(e.target.value))}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverDemo;
