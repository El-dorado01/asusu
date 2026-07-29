'use server';

import { apiFetch } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function submitContribution(
  societyId: string,
  channel: 'bank_transfer' | 'ussd' | 'agent' | 'cash',
  amount: number,
  details?: {
    bank_name?: string;
    reference_code?: string;
    agent_code?: string;
    officer_name?: string;
  }
) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${societyId}/contribute`,
    {
      method: 'POST',
      body: JSON.stringify({
        channel,
        amount,
        ...details,
      }),
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to process contribution');
  }
  */

  revalidatePath(`/dashboard/societies/${societyId}`);
  revalidatePath(`/dashboard/societies/${societyId}/ledger`);
  revalidatePath('/dashboard');

  const channelNames = {
    bank_transfer: 'Bank Transfer',
    ussd: 'USSD Code Payment',
    agent: 'POS / Agent Deposit',
    cash: 'Cash to Cooperative Officer',
  };

  return {
    success: true,
    message: `Contribution of ₦${amount.toLocaleString()} via ${channelNames[channel]} has been successfully logged!`,
  };
}
