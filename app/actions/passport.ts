'use server';

import { apiFetch } from '@/lib/api';
import { MOCK_FINANCIAL_PASSPORT } from '@/lib/mock-data';
import { FinancialPassport } from '@/types';

export async function getFinancialPassport(): Promise<FinancialPassport> {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch('/user/financial-passport', { method: 'GET' }, true);
  if (!res.ok) throw new Error('Failed to fetch financial passport');
  return res.json();
  */

  return MOCK_FINANCIAL_PASSPORT;
}
