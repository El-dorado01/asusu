import {
  SocietyProps,
  Member,
  LedgerEntry,
  PenaltiesResponse,
  NextDueDateResponse,
  SocietyDocument,
  FinancialPassport,
} from '@/types';

export const MOCK_CURRENT_USER = {
  id: 1,
  name: 'Adaora Nwosu',
  email: 'adaora@asusu.app',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
};

export const MOCK_SOCIETIES: SocietyProps[] = [
  {
    id: 1,
    name: 'Victoria Island Savers Guild',
    avatar_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150',
    description: 'A dedicated high-yield rotating savings club for professionals based in VI & Lekki.',
    is_public: true,
    verified: true,
    created_at: '2025-01-10T10:00:00Z',
    total_members: 12,
    member_count: 12,
    total_contributions: 3600000,
    can_join: false,
    can_manage: true,
    isFounder: true,
    isCoFounder: false,
    isExecutive: false,
    current_user_id: 1,
    founder: {
      id: 1,
      name: 'Adaora Nwosu',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    co_founder: {
      id: 2,
      name: 'Emeka Okonkwo',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    settings: {
      contribution_amount: 300000,
      frequency: 'monthly',
      payout_cycle: 'rotating',
      late_fee: 5000,
      rotation_queue: [1],
    },
    active_members: [
      { id: 1, name: 'Adaora Nwosu', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
      { id: 2, name: 'Emeka Okonkwo', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { id: 3, name: 'Zainab Bello', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { id: 4, name: 'Tunde Bakare', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    ],
  },
  {
    id: 2,
    name: 'Tech Founders Investment Circle',
    avatar_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=150',
    description: 'Quarterly pooling for seed tech investments and emergency liquidity funds.',
    is_public: true,
    verified: true,
    created_at: '2025-02-01T14:30:00Z',
    total_members: 8,
    member_count: 8,
    total_contributions: 5000000,
    can_join: true,
    can_manage: false,
    isFounder: false,
    isCoFounder: false,
    isExecutive: false,
    current_user_id: 1,
    founder: {
      id: 5,
      name: 'Chidi Anene',
      avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    },
    co_founder: null,
    settings: {
      contribution_amount: 500000,
      frequency: 'quarterly',
      payout_cycle: 'fixed',
      late_fee: 10000,
    },
  },
  {
    id: 3,
    name: 'Yaba Market Women Co-op',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    description: 'Community micro-thrift cooperative supporting trade expansions and emergency relief.',
    is_public: false,
    verified: false,
    created_at: '2025-03-15T09:00:00Z',
    total_members: 20,
    member_count: 20,
    total_contributions: 1200000,
    can_join: true,
    can_manage: false,
    founder: {
      id: 6,
      name: 'Folake Adeleke',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    },
    co_founder: null,
    settings: {
      contribution_amount: 50000,
      frequency: 'monthly',
      payout_cycle: 'rotating',
      late_fee: 2000,
    },
  },
];

export const MOCK_ACTIVE_SOCIETIES = [
  {
    id: '1',
    name: 'Victoria Island Savers Guild',
    description: 'A dedicated high-yield rotating savings club for professionals based in VI & Lekki.',
    avatar_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150',
    is_public: true,
    verified: true,
    role: 'founder' as const,
    total_members: 12,
    settings: {
      contribution_amount: 300000,
      frequency: 'monthly' as const,
      payout_cycle: 'rotating' as const,
      late_fee: 5000,
    },
    next_due: { date: '2026-08-15', days_until: 17 },
  },
  {
    id: '2',
    name: 'Tech Founders Investment Circle',
    description: 'Quarterly pooling for seed tech investments and emergency liquidity funds.',
    avatar_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=150',
    is_public: true,
    verified: true,
    role: 'member' as const,
    total_members: 8,
    settings: {
      contribution_amount: 500000,
      frequency: 'quarterly' as const,
      payout_cycle: 'fixed' as const,
      late_fee: 10000,
    },
    next_due: { date: '2026-09-01', days_until: 34 },
  },
];

export const MOCK_MEMBERS: Member[] = [
  {
    id: 1,
    name: 'Adaora Nwosu',
    profile: {
      id: 101,
      gender: 'female',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    pivot: {
      role: 'founder',
      status: 'active',
      created_at: '2025-01-10T10:00:00Z',
    },
  },
  {
    id: 2,
    name: 'Emeka Okonkwo',
    profile: {
      id: 102,
      gender: 'male',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    pivot: {
      role: 'co-founder',
      status: 'active',
      created_at: '2025-01-11T12:00:00Z',
    },
  },
  {
    id: 3,
    name: 'Zainab Bello',
    profile: {
      id: 103,
      gender: 'female',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    pivot: {
      role: 'executive',
      status: 'active',
      created_at: '2025-01-15T09:30:00Z',
    },
  },
  {
    id: 4,
    name: 'Tunde Bakare',
    profile: {
      id: 104,
      gender: 'male',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    pivot: {
      role: 'member',
      status: 'active',
      created_at: '2025-01-20T16:45:00Z',
    },
  },
];

export const MOCK_LEDGER: LedgerEntry[] = [
  {
    id: 1,
    type: 'contribution',
    amount: 300000,
    description: 'Monthly contribution for July 2026',
    created_at: '2026-07-01T10:00:00Z',
  },
  {
    id: 2,
    type: 'contribution',
    amount: 300000,
    description: 'Monthly contribution for June 2026',
    created_at: '2026-06-01T10:00:00Z',
  },
  {
    id: 3,
    type: 'payout',
    amount: 3600000,
    description: 'Rotating pool payout awarded to Adaora Nwosu',
    created_at: '2026-05-15T14:20:00Z',
  },
  {
    id: 4,
    type: 'contribution',
    amount: 300000,
    description: 'Monthly contribution for May 2026',
    created_at: '2026-05-01T09:15:00Z',
  },
  {
    id: 5,
    type: 'late_fee',
    amount: 5000,
    description: 'Late payment fee for April cycle',
    created_at: '2026-04-06T11:00:00Z',
  },
];

export const MOCK_PENALTIES: PenaltiesResponse = {
  penalties: [
    {
      id: 1,
      amount: 5000,
      description: 'Late contribution for April 2026 cycle',
      date: '2026-04-06',
      waived: false,
      waived_at: null,
      waived_by: null,
      is_active: true,
    },
  ],
  summary: {
    active_total: 5000,
    waived_total: 0,
    grand_total: 5000,
  },
  count: {
    total: 1,
    active: 1,
    waived: 0,
  },
};

export const MOCK_NEXT_DUE: NextDueDateResponse = {
  next_due_date: '2026-08-15',
  days_until_due: 17,
  amount_expected: 300000,
  late_fee: 5000,
  has_contributed_this_period: false,
};

export const MOCK_INVITES = [
  {
    id: '101',
    name: 'Lekki Business Syndicate',
    description: 'Commercial thrift group focused on import/export credit lines.',
    avatar_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150',
    is_public: true,
    invited_by: 'Bisi Akande',
    invited_at: '2026-07-25T11:20:00Z',
    invite_type: 'co-founder' as const,
    role: 'Co-Founder' as const,
  },
  {
    id: '102',
    name: 'Apex Wealth Builders',
    description: 'High-volume savings circle for wealth preservation and asset purchases.',
    avatar_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150',
    is_public: false,
    invited_by: 'Kemi Adebayo',
    invited_at: '2026-07-27T16:05:00Z',
    invite_type: 'member' as const,
    role: 'Member' as const,
  },
];

export const MOCK_DOCUMENTS: SocietyDocument[] = [
  {
    id: 1,
    type: 'Constitution',
    file_url: '/documents/asusu_bylaws.pdf',
    description: 'Official Group Constitution & Bye-laws (2026 Edition)',
    uploaded_by: 'Adaora Nwosu',
    uploaded_at: '2025-01-10T12:00:00Z',
    approved: true,
  },
  {
    id: 2,
    type: 'Registration Document',
    file_url: '/documents/cac_cert.pdf',
    description: 'Cooperative Society CAC Certificate',
    uploaded_by: 'Emeka Okonkwo',
    uploaded_at: '2025-01-12T15:30:00Z',
    approved: true,
  },
];

export const MOCK_FINANCIAL_PASSPORT: FinancialPassport = {
  user_id: 1,
  user_name: 'Adaora Nwosu',
  member_since: 'March 2024',
  trust_level: 'Level 3 — Trusted Saver',
  trust_status: 'Verified Community Member',
  consistency_score: 92,
  discipline_score: 85,
  repayment_score: 100,
  investment_score: 80,
  total_savings: 750000,
  total_contributions: 920000,
  total_investment_returns: 14500,
  completed_cycles: 8,
  verified_cooperatives_count: 2,
  milestones: [
    {
      id: 'm1',
      title: 'Joined Cooperative Society',
      description: 'Became a verified member of Victoria Island Savers Guild.',
      completed: true,
      completed_at: 'March 2024',
    },
    {
      id: 'm2',
      title: '6 Months Consistent Contributions',
      description: 'Maintained over 90% savings consistency with zero missed cycles.',
      completed: true,
      completed_at: 'September 2024',
    },
    {
      id: 'm3',
      title: 'Completed 2 Investment Cycles',
      description: 'Participated in collective 5% Treasury Bill allocations.',
      completed: true,
      completed_at: 'January 2025',
    },
    {
      id: 'm4',
      title: 'Perfect Loan Repayment History',
      description: '100% on-time repayment across all internal cooperative credits.',
      completed: true,
      completed_at: 'June 2025',
    },
    {
      id: 'm5',
      title: 'Eligible for Cooperative Business Credit',
      description: 'Unlocked access to low-interest working capital loans up to ₦1.5M.',
      completed: false,
    },
    {
      id: 'm6',
      title: 'Unlock Business Protection & Micro-Insurance',
      description: 'Qualify for institutional group insurance and health coverage.',
      completed: false,
    },
  ],
};
