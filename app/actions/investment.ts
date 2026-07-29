'use server';

import { apiFetch } from '@/lib/api';
import { MOCK_INVESTMENT_CYCLE } from '@/lib/mock-data';
import { InvestmentCycle } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getSocietyInvestmentCycle(
  societyId: string
): Promise<InvestmentCycle> {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(`/societies/${societyId}/investment-cycle`, { method: 'GET' }, true);
  if (!res.ok) throw new Error('Failed to fetch investment cycle');
  return res.json();
  */

  return {
    ...MOCK_INVESTMENT_CYCLE,
    society_id: societyId,
  };
}

export async function startInvestmentCycle(
  societyId: string,
  allocationPercentage: number
) {
  // Validate minimum percentage constraint (minimum 5%)
  if (allocationPercentage < 5) {
    return {
      success: false,
      message: 'Minimum Treasury Bill allocation percentage is 5%.',
    };
  }

  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${societyId}/start-investment-cycle`,
    {
      method: 'POST',
      body: JSON.stringify({ allocation_percentage: allocationPercentage }),
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to start investment cycle');
  }
  */

  revalidatePath(`/dashboard/societies/${societyId}`);
  revalidatePath(`/dashboard/societies/${societyId}/wealth`);

  const principal = (50000000 * allocationPercentage) / 100;
  const yieldReturns = Math.round((principal * 0.175 * 91) / 365);

  return {
    success: true,
    message: `Investment cycle successfully launched with ${allocationPercentage}% allocation (₦${principal.toLocaleString()}).`,
    data: {
      allocation_percentage: allocationPercentage,
      principal_amount: principal,
      expected_returns: yieldReturns,
    },
  };
}

export async function updateTBillAllocationPercentage(
  societyId: string,
  allocationPercentage: number
) {
  if (allocationPercentage < 5) {
    return {
      success: false,
      message: 'Minimum Treasury Bill allocation percentage is 5%.',
    };
  }

  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${societyId}/settings/tbill-allocation`,
    {
      method: 'PATCH',
      body: JSON.stringify({ percentage: allocationPercentage }),
    },
    true
  );
  */

  revalidatePath(`/dashboard/societies/${societyId}/settings`);
  revalidatePath(`/dashboard/societies/${societyId}/wealth`);

  return {
    success: true,
    message: `Treasury Bill allocation updated to ${allocationPercentage}%.`,
  };
}
