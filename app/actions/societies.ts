//actions/societies.ts
'use server';

import { apiFetch } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './getCurrentUser';
import { SocietyDocument, SocietyProps } from '@/types';
import {
  MOCK_SOCIETIES,
  MOCK_ACTIVE_SOCIETIES,
  MOCK_MEMBERS,
  MOCK_LEDGER,
  MOCK_PENALTIES,
  MOCK_NEXT_DUE,
  MOCK_INVITES,
  MOCK_DOCUMENTS,
  MOCK_FINANCIAL_PASSPORT,
} from '@/lib/mock-data';

export async function getRecommendedSocieties({
  page = 1,
}: { page?: number } = {}) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/recommended?page=${page}`,
    {
      method: 'GET',
      next: { revalidate: 300 },
    },
    true
  );

  if (!res.ok) {
    throw new Error('Failed to fetch recommended societies');
  }

  return res.json();
  */

  return {
    data: MOCK_SOCIETIES,
    current_page: page,
    last_page: 1,
    total: MOCK_SOCIETIES.length,
  };
}

export async function getPublicSocieties({
  search = '',
  page = 1,
}: { search?: string; page?: number } = {}) {
  /* ORIGINAL BACKEND CALL:
  let endpoint = `/societies/public?page=${page}`;

  if (search.trim()) {
    endpoint += `&search=${encodeURIComponent(search.trim())}`;
  }

  const res = await apiFetch(
    endpoint,
    {
      method: 'GET',
    },
    true
  );

  if (!res.ok) {
    throw new Error('Failed to fetch public societies');
  }

  return res.json();
  */

  const filtered = search.trim()
    ? MOCK_SOCIETIES.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase())
      )
    : MOCK_SOCIETIES;

  return {
    data: filtered,
    current_page: page,
    last_page: 1,
    total: filtered.length,
  };
}

export async function getSociety(id: string) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${id}`,
    {
      method: 'GET',
      next: { revalidate: 60 },
    },
    true
  );

  if (!res.ok) {
    throw new Error('Failed to fetch society');
  }
  const data = await res.json();

  return data.society;
  */

  const found = MOCK_SOCIETIES.find((s) => s.id === Number(id));
  return (
    found || {
      ...MOCK_SOCIETIES[0],
      id: Number(id),
    }
  );
}

export async function getSocietyMembers(id: string) {
  const user = await getCurrentUser();

  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${id}/members`,
    {
      method: 'GET',
      cache: 'no-store',
    },
    true
  );

  if (!res.ok) throw new Error('Failed to fetch members');
  const data = await res.json();

  const currentMember = data.members.find((m: any) => m.id === user?.id);

  const isFounder = data.society.founder?.id === user?.id;
  const isCoFounder = data.society.co_founder?.id === user?.id;
  const isExecutive = currentMember?.pivot?.role === 'executive';

  const canManage = isFounder || isCoFounder || isExecutive;

  return {
    society: {
      ...data.society,
      current_user_id: user?.id,
      isFounder,
      isCoFounder,
      isExecutive,
      can_manage: canManage,
    },
    members: data.members,
  };
  */

  const society = (await getSociety(id)) || MOCK_SOCIETIES[0];
  const userId = user?.id ? Number(user.id) : undefined;
  const isFounder = society.founder?.id === userId;
  const isCoFounder = society.co_founder?.id === userId;
  const isExecutive = false;

  return {
    society: {
      ...society,
      current_user_id: userId,
      isFounder,
      isCoFounder,
      isExecutive,
      can_manage: isFounder || isCoFounder || isExecutive,
    },
    members: MOCK_MEMBERS,
  };
}

export async function getSocietyLedger(id: string) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${id}/ledger`,
    {
      method: 'GET',
      next: { revalidate: 60 },
    },
    true
  );

  if (!res.ok) throw new Error('Failed to fetch ledger');
  const data = await res.json();
  return data;
  */

  const society = await getSociety(id);
  return {
    society,
    ledger: MOCK_LEDGER,
    summary: {
      total_contributed: 900000,
      total_payouts: 3600000,
      current_balance: 1200000,
    },
  };
}

export async function getSocietyRotationQueue(id: string) {
  const user = await getCurrentUser();

  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${id}/rotation`,
    {
      method: 'GET',
      next: { revalidate: 60 },
    },
    true
  );

  if (!res.ok) throw new Error('Failed to fetch rotation queue');
  const data = await res.json();

  const isFounder = data.society.founder?.id === user?.id;
  const isCoFounder = data.society.co_founder?.id === user?.id;

  const canManage = isFounder || isCoFounder;

  return {
    society: {
      ...data.society,
      current_user_id: user?.id,
      isFounder,
      isCoFounder,
      can_manage: canManage,
    },
    members: data.members,
    rotation: data.rotation,
  };
  */

  const society = await getSociety(id);
  const userId = user?.id ? Number(user.id) : undefined;
  const isFounder = society.founder?.id === userId;
  const isCoFounder = society.co_founder?.id === userId;

  const queue = MOCK_MEMBERS.map((m) => ({
    user_id: m.id,
    name: m.name,
    avatar_url: m.profile?.avatar_url || null,
  }));

  return {
    society: {
      ...society,
      current_user_id: userId,
      isFounder,
      isCoFounder,
      can_manage: isFounder || isCoFounder,
    },
    members: MOCK_MEMBERS,
    rotation: {
      queue,
      my_position: 1,
      next_up: queue[0] || null,
      cycle: society.settings?.frequency || 'monthly',
    },
  };
}

export async function getMyPenalties(id: string) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${id}/penalties`,
    {
      method: 'GET',
      cache: 'no-store',
    },
    true
  );
  if (!res.ok) throw new Error('Failed to fetch penalties');
  const data = await res.json();
  return data;
  */

  return MOCK_PENALTIES;
}

export async function getNextDueDate(id: string) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${id}/next-due`,
    {
      method: 'GET',
      cache: 'no-store',
    },
    true
  );
  if (!res.ok) throw new Error('Failed to fetch next due date');
  const data = await res.json();
  return data;
  */

  return MOCK_NEXT_DUE;
}

export async function createSociety(formData: FormData) {
  for (const [key, value] of formData.entries()) {
    if (value === '' || (value instanceof File && value.size === 0)) {
      formData.delete(key);
    }
  }

  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    '/societies',
    {
      method: 'POST',
      body: formData,
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    if (error.errors) {
      const messages = Object.values(error.errors).flat() as string[];
      throw new Error(messages[0]);
    }

    throw new Error(error.message || 'Failed to create society');
  }

  const data = await res.json();
  return data.society;
  */

  const name = (formData.get('name') as string) || 'New Society';
  const description = (formData.get('description') as string) || 'Custom society created locally.';

  const newSociety: SocietyProps = {
    id: Date.now(),
    name,
    description,
    avatar_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150',
    is_public: true,
    verified: false,
    created_at: new Date().toISOString(),
    total_members: 1,
    member_count: 1,
    total_contributions: 0,
    can_join: false,
    can_manage: true,
    isFounder: true,
    founder: {
      id: 1,
      name: 'Adaora Nwosu',
    },
    settings: {
      contribution_amount: 100000,
      frequency: 'monthly',
      payout_cycle: 'rotating',
      late_fee: 2500,
    },
  };

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/societies');

  return newSociety;
}

export async function inviteMember(societyId: string, email: string) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${societyId}/members`,
    {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to invite member');
  }

  const data = await res.json();
  revalidatePath(`/dashboard/societies/${societyId}/members`);
  return data;
  */

  revalidatePath(`/dashboard/societies/${societyId}/members`);
  return { message: `Invitation sent to ${email}` };
}

export async function getSocietySettings(societyId: string) {
  return await getSocietyMembers(societyId);
}

export async function inviteCoFounder(societyId: string, email: string) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${societyId}/invite-co-founder`,
    {
      method: 'POST',
      body: JSON.stringify({ email }),
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to invite co-founder');
  }

  const data = await res.json();
  revalidatePath(`/dashboard/societies/${societyId}/settings`);
  revalidatePath(`/dashboard/societies/${societyId}`);
  return data;
  */

  revalidatePath(`/dashboard/societies/${societyId}/settings`);
  revalidatePath(`/dashboard/societies/${societyId}`);
  return { message: `Co-founder invitation sent to ${email}` };
}

export async function toggleSocietyVisibility(
  societyId: string,
  isPublic: boolean
) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/admin/societies/${societyId}/visibility`,
    {
      method: 'PATCH',
      body: JSON.stringify({ is_public: isPublic }),
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update visibility');
  }

  revalidatePath(`/dashboard/societies/${societyId}/settings`);
  revalidatePath(`/dashboard/societies/${societyId}`);
  return await res.json();
  */

  revalidatePath(`/dashboard/societies/${societyId}/settings`);
  revalidatePath(`/dashboard/societies/${societyId}`);
  return { success: true, is_public: isPublic };
}

export async function updateSocietySettings(
  societyId: string,
  data: {
    contribution_amount?: number;
    frequency?: 'weekly' | 'monthly' | 'quarterly';
    payout_cycle?: 'rotating' | 'fixed';
    late_fee?: number;
  }
) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/admin/societies/${societyId}/settings`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update settings');
  }

  const result = await res.json();

  revalidatePath(`/dashboard/societies/${societyId}/settings`);
  revalidatePath(`/dashboard/societies/${societyId}`);

  return result;
  */

  revalidatePath(`/dashboard/societies/${societyId}/settings`);
  revalidatePath(`/dashboard/societies/${societyId}`);

  return { success: true, settings: data };
}

export async function getSocietyDocuments(
  societyId: string
): Promise<SocietyDocument[]> {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/admin/societies/${societyId}/documents`,
    {},
    true
  );

  if (!res.ok) {
    throw new Error('Failed to load society documents');
  }

  const data = await res.json();
  return data.documents || [];
  */

  return MOCK_DOCUMENTS;
}

export async function updateSocietyAvatar(
  societyId: string,
  formData: FormData
) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/admin/societies/${societyId}/avatar`,
    {
      method: 'POST',
      body: formData,
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update avatar');
  }

  const data = await res.json();

  revalidatePath(`/dashboard/societies/${societyId}/settings`);
  revalidatePath(`/dashboard/societies/${societyId}`);

  return data.avatar_url;
  */

  const newAvatarUrl = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150';

  revalidatePath(`/dashboard/societies/${societyId}/settings`);
  revalidatePath(`/dashboard/societies/${societyId}`);

  return newAvatarUrl;
}

export async function getMyActiveSocieties() {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    '/societies',
    { method: 'GET', next: { revalidate: 300 } },
    true
  );

  if (!res.ok) {
    throw new Error('Failed to fetch my active societies');
  }

  const data = await res.json();
  return {
    active_societies: data.active_societies,
    total: data.total,
  };
  */

  return {
    active_societies: MOCK_ACTIVE_SOCIETIES,
    total: MOCK_ACTIVE_SOCIETIES.length,
  };
}

export async function getPendingInvites() {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    '/societies/invites/pending',
    {
      method: 'GET',
      next: { revalidate: 300 },
    },
    true
  );

  if (!res.ok) {
    throw new Error('Failed to fetch pending invites');
  }

  const data = await res.json();
  return {
    pending_invites: data.pending_invites,
    total: data.total,
  };
  */

  return {
    pending_invites: MOCK_INVITES,
    total: MOCK_INVITES.length,
  };
}

export async function acceptInvite(
  societyId: string,
  inviteType: 'member' | 'co-founder'
) {
  /* ORIGINAL BACKEND CALL:
  const endpoint =
    inviteType === 'co-founder'
      ? `/societies/${societyId}/accept-co-founder`
      : `/societies/${societyId}/accept-invite`;

  const res = await apiFetch(
    endpoint,
    {
      method: 'POST',
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to accept invite');
  }

  revalidatePath('/dashboard/invites');
  revalidatePath('/dashboard/societies');
  revalidatePath(`/dashboard/societies/${societyId}`);

  return await res.json();
  */

  revalidatePath('/dashboard/invites');
  revalidatePath('/dashboard/societies');
  revalidatePath(`/dashboard/societies/${societyId}`);

  return { success: true, message: 'Invite accepted' };
}

export async function declineInvite(societyId: string) {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch(
    `/societies/${societyId}/decline-invite`,
    {
      method: 'DELETE',
    },
    true
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to decline invite');
  }

  revalidatePath('/dashboard/invites');
  return { success: true, message: 'Invite declined' };
}

export async function getFinancialPassport() {
  /* ORIGINAL BACKEND CALL:
  const res = await apiFetch('/user/financial-passport', { method: 'GET' }, true);
  if (!res.ok) throw new Error('Failed to fetch financial passport');
  return res.json();
  */

  return MOCK_FINANCIAL_PASSPORT;
}
