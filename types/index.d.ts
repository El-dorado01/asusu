export interface SocietyProps {
  id: number;
  name: string;
  avatar_url: string;
  description: string;
  is_public: boolean;
  verified: boolean;
  created_at: string;
  total_members: number;
  can_join?: boolean; // optional, based on user auth state
  can_manage?: boolean; // optional
  total_contributions: number;
  member_count: number;
  isFounder?: boolean;
  isCoFounder?: boolean;
  isExecutive?: boolean;
  current_user_id?: number;

  founder: {
    id: number;
    name: string;
    avatar_url?: string | null;
  };

  co_founder?: {
    id: number;
    name: string;
    avatar_url?: string | null;
  } | null;

  settings: {
    contribution_amount: number;
    frequency: 'monthly' | 'quarterly' | 'yearly';
    payout_cycle: 'rotating' | 'fixed';
    late_fee: number;
    rotation_queue?: [number];
  };

  active_members?: {
    id: number;
    name: string;
    avatar_url?: string | null;
  }[];
}

export interface Member {
  id: number;
  name: string;
  profile: {
    id: number;
    gender: string;
    avatar_url?: string | null;
  };
  pivot: {
    role: string;
    status: string;
    created_at: string;
  };
}

// Types from Ledger endpoint
export interface LedgerEntry {
  id: number;
  type: 'contribution' | 'payout' | 'late_fee';
  amount: number;
  description: string | null;
  created_at: string;
}

// Types from Penalties endpoint
export interface PenaltyEntry {
  id: number;
  amount: number;
  description: string | null;
  date: string;
  waived: boolean;
  waived_at: string | null;
  waived_by: string | null;
  is_active: boolean;
}

export interface PenaltySummary {
  active_total: number;
  waived_total: number;
  grand_total: number;
}

export interface PenaltyCount {
  total: number;
  active: number;
  waived: number;
}

export interface PenaltiesResponse {
  penalties: PenaltyEntry[];
  summary: PenaltySummary;
  count: PenaltyCount;
}

// Types from Next Due Date endpoint
export interface NextDueDateResponse {
  next_due_date: string; // ISO date string
  days_until_due: number;
  amount_expected: number;
  late_fee: number;
  has_contributed_this_period: boolean;
}

// Main page data
interface LedgerPageData {
  society: SocietyProps;
  ledger: LedgerEntry[];
  summary: {
    total_contributed: number;
    total_payouts: number;
    current_balance: number;
  };
}

export interface SocietyDocument {
  id: number;
  type: string;
  file_url: string;
  description: string;
  uploaded_by: string;
  uploaded_at: string;
  approved: boolean;
}

export interface PassportMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completed_at?: string | null;
}

export interface FinancialPassport {
  user_id: number;
  user_name: string;
  member_since: string;
  trust_level: string;
  trust_status: string;
  consistency_score: number;
  discipline_score: number;
  repayment_score: number;
  investment_score: number;
  total_savings: number;
  total_contributions: number;
  total_investment_returns: number;
  completed_cycles: number;
  verified_cooperatives_count: number;
  milestones: PassportMilestone[];
}