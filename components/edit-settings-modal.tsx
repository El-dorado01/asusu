'use client';

import { useState, useTransition } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  IconLoader,
} from '@tabler/icons-react';
import { updateSocietySettings } from '@/app/actions/societies';
import { SocietyProps } from '@/types';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

function EditSettingsModal({
  society,
  open,
  onOpenChange,
  onSuccess,
}: {
  society: SocietyProps;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (settings: SocietyProps['settings']) => void;
}) {
  const [pending, startTransition] = useTransition();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [amount, setAmount] = useState(
    society.settings.contribution_amount.toString()
  );
  const [frequency, setFrequency] = useState(society.settings.frequency);
  const [payoutCycle, setPayoutCycle] = useState(society.settings.payout_cycle);
  const [lateFee, setLateFee] = useState(
    society.settings.late_fee?.toString() || '0'
  );

  const handleSave = () => {
    const data: any = {};

    if (parseFloat(amount) !== society.settings.contribution_amount) {
      data.contribution_amount = parseFloat(amount);
    }
    if (frequency !== society.settings.frequency) data.frequency = frequency;
    if (payoutCycle !== society.settings.payout_cycle)
      data.payout_cycle = payoutCycle;
    if (parseFloat(lateFee) !== (society.settings.late_fee || 0)) {
      data.late_fee = parseFloat(lateFee);
    }

    if (Object.keys(data).length === 0) {
      onOpenChange(false);
      return;
    }

    startTransition(async () => {
      try {
        await updateSocietySettings(society.id.toString(), data);
        toast.success('Contribution settings updated!');
        onSuccess({
          ...society.settings,
          ...data,
        });
        onOpenChange(false);
      } catch (err: any) {
        toast.error(err.message || 'Failed to update settings');
      }
    });
  };

  const Content = (
    <div className='grid gap-6 py-4'>
      <div className='grid gap-2'>
        <Label htmlFor='amount'>Contribution Amount (₦)</Label>
        <Input
          id='amount'
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min='100'
          disabled={pending}
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='frequency'>Frequency</Label>
        <Select
          value={frequency}
          onValueChange={(value) => {
            // Assert the value matches the union type
            setFrequency(value as 'monthly' | 'quarterly' | 'yearly');
          }}
          disabled={pending}
        >
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='weekly'>Weekly</SelectItem>
            <SelectItem value='monthly'>Monthly</SelectItem>
            <SelectItem value='quarterly'>Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='payout'>Payout Cycle</Label>
        <Select
          value={payoutCycle}
          onValueChange={(value) => {
            // Assert the value matches the union type
            setPayoutCycle(value as 'rotating' | 'fixed');
          }}
          disabled={pending}
        >
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='rotating'>Rotating</SelectItem>
            <SelectItem value='fixed'>Fixed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='late-fee'>Late Fee (₦)</Label>
        <Input
          id='late-fee'
          type='number'
          value={lateFee}
          onChange={(e) => setLateFee(e.target.value)}
          min='0'
          disabled={pending}
        />
      </div>

      <div className='flex justify-end gap-3 mt-4'>
        <Button
          variant='outline'
          onClick={() => onOpenChange(false)}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={pending}
        >
          {pending ? (
            <>
              <IconLoader className='mr-2 h-4 w-4 animate-spin' />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Edit Contribution Settings</DialogTitle>
            <DialogDescription>
              Update how members contribute to the society.
            </DialogDescription>
          </DialogHeader>
          {Content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit Contribution Settings</DrawerTitle>
          <DrawerDescription>Update contribution rules</DrawerDescription>
        </DrawerHeader>
        <div className='px-4 pb-6'>{Content}</div>
      </DrawerContent>
    </Drawer>
  );
}

export default EditSettingsModal;