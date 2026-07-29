'use server';

import { apiFetch } from '@/lib/api';
import { MOCK_FINANCIAL_OPPORTUNITIES } from '@/lib/mock-data';
import { FinancialOpportunity } from '@/types';

export async function getFinancialOpportunities(): Promise<FinancialOpportunity[]> {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch('/opportunities', { method: 'GET' }, true);
  if (!res.ok) throw new Error('Failed to fetch financial opportunities');
  return res.json();
  */

  return MOCK_FINANCIAL_OPPORTUNITIES;
}
