'use client';

import { FinancialPassport } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  IconShieldCheck,
  IconAward,
  IconCheck,
  IconLock,
  IconDownload,
  IconShare,
  IconTrendingUp,
  IconBuildingBank,
  IconHistory,
} from '@tabler/icons-react';
import { toast } from 'sonner';

interface FinancialPassportCardProps {
  passport: FinancialPassport;
}

export function FinancialPassportCard({ passport }: FinancialPassportCardProps) {
  const handleExport = () => {
    toast.success('Passport Certificate Generated', {
      description: 'Your verified financial reputation passport is ready for download.',
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://asusu.app/verify/passport/${passport.user_id}`);
      toast.success('Verification Link Copied', {
        description: 'You can share your verified passport link with financial partners.',
      });
    }
  };

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      {/* Header Banner - Clean Minimalist Style */}
      <div className='rounded-xl border bg-card p-6 sm:p-8 shadow-sm space-y-6'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
          <div className='space-y-2'>
            <div className='inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary'>
              <IconShieldCheck className='h-3.5 w-3.5' />
              Asusu Verified Financial Passport
            </div>
            <h1 className='text-3xl font-bold tracking-tight text-foreground'>
              {passport.user_name}
            </h1>
            <p className='text-sm text-muted-foreground max-w-xl'>
              Portable financial participation record verified across{' '}
              <strong className='text-foreground font-semibold'>
                {passport.verified_cooperatives_count} cooperative societies
              </strong>.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
            <Button
              onClick={handleExport}
              className='font-medium shadow-xs cursor-pointer'
            >
              <IconDownload className='mr-2 h-4 w-4' />
              Export Passport
            </Button>
            <Button
              onClick={handleShare}
              variant='outline'
              className='cursor-pointer'
            >
              <IconShare className='mr-2 h-4 w-4' />
              Share Link
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Status & Scores */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Trust Level Card */}
        <Card className='md:col-span-1 flex flex-col justify-between border bg-card shadow-sm'>
          <CardHeader className='pb-2'>
            <CardDescription>Current Trust Tier</CardDescription>
            <CardTitle className='text-2xl font-bold flex items-center gap-2 text-foreground'>
              <IconAward className='h-6 w-6 text-primary' />
              {passport.trust_level}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4 pt-2'>
            <Badge variant='secondary' className='px-3 py-1 font-medium'>
              ✓ {passport.trust_status}
            </Badge>

            <div className='space-y-2 pt-2 border-t text-sm'>
              <div className='flex justify-between text-muted-foreground'>
                <span>Member Since:</span>
                <span className='font-semibold text-foreground'>{passport.member_since}</span>
              </div>
              <div className='flex justify-between text-muted-foreground'>
                <span>Completed Cycles:</span>
                <span className='font-semibold text-foreground'>{passport.completed_cycles} cycles</span>
              </div>
              <div className='flex justify-between text-muted-foreground'>
                <span>Total Savings:</span>
                <span className='font-semibold text-foreground'>
                  ₦{passport.total_savings.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Trust Profile Ratings */}
        <Card className='md:col-span-2 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-lg font-bold flex items-center gap-2'>
              <IconTrendingUp className='h-5 w-5 text-primary' />
              Financial Trust Profile
            </CardTitle>
            <CardDescription>
              Quantitative behavior metrics compiled from verified savings and repayment activity.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            {/* Savings Consistency */}
            <div className='space-y-1.5'>
              <div className='flex justify-between text-sm font-medium'>
                <span>Savings Consistency</span>
                <span className='font-semibold text-primary'>{passport.consistency_score}%</span>
              </div>
              <Progress value={passport.consistency_score} className='h-2 bg-muted' />
              <p className='text-xs text-muted-foreground'>
                Regular monthly deposits made without missing scheduled cycles.
              </p>
            </div>

            {/* Loan Repayment History */}
            <div className='space-y-1.5'>
              <div className='flex justify-between text-sm font-medium'>
                <span>Repayment Discipline</span>
                <span className='font-semibold text-primary'>
                  {passport.repayment_score}%
                </span>
              </div>
              <Progress value={passport.repayment_score} className='h-2 bg-muted' />
              <p className='text-xs text-muted-foreground'>
                100% on-time repayment record across internal cooperative credits.
              </p>
            </div>

            {/* Savings Discipline */}
            <div className='space-y-1.5'>
              <div className='flex justify-between text-sm font-medium'>
                <span>Savings Discipline</span>
                <span className='font-semibold text-primary'>
                  {passport.discipline_score}%
                </span>
              </div>
              <Progress value={passport.discipline_score} className='h-2 bg-muted' />
              <p className='text-xs text-muted-foreground'>
                Adherence to agreed target contribution benchmarks over time.
              </p>
            </div>

            {/* Investment Participation */}
            <div className='space-y-1.5'>
              <div className='flex justify-between text-sm font-medium'>
                <span>Investment Participation</span>
                <span className='font-semibold text-primary'>
                  {passport.investment_score}%
                </span>
              </div>
              <Progress value={passport.investment_score} className='h-2 bg-muted' />
              <p className='text-xs text-muted-foreground'>
                Active participation in collective 5% Treasury Bill investment pools.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Philosophical Callout Banner */}
      <div className='rounded-xl border bg-muted/50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4'>
        <div className='p-2.5 rounded-lg bg-background border text-primary shrink-0'>
          <IconBuildingBank className='h-5 w-5' />
        </div>
        <div>
          <h4 className='font-semibold text-foreground text-base'>
            Your financial history shouldn&apos;t disappear because it happened outside traditional banking.
          </h4>
          <p className='text-sm text-muted-foreground mt-1'>
            Asusu bridges traditional cooperative trust with formal financial opportunities, giving you a portable reputation that banks, insurers, and credit partners recognize.
          </p>
        </div>
      </div>

      {/* Financial Journey Stepper */}
      <Card className='shadow-sm'>
        <CardHeader>
          <CardTitle className='text-lg font-bold flex items-center gap-2'>
            <IconHistory className='h-5 w-5 text-primary' />
            Your Financial Journey & Milestones
          </CardTitle>
          <CardDescription>
            Progress milestones achieved through consistent financial participation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-border'>
            {passport.milestones.map((milestone) => (
              <div key={milestone.id} className='relative flex items-start gap-4 group'>
                {/* Milestone Node Badge */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold transition-all ${
                    milestone.completed
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-muted-foreground/40'
                  }`}
                >
                  {milestone.completed ? (
                    <IconCheck className='h-3.5 w-3.5' />
                  ) : (
                    <IconLock className='h-3 w-3' />
                  )}
                </div>

                {/* Content */}
                <div className='flex-1 space-y-1 bg-card p-4 rounded-lg border shadow-2xs'>
                  <div className='flex items-center justify-between gap-2 flex-wrap'>
                    <h5 className='font-semibold text-sm text-foreground'>
                      {milestone.title}
                    </h5>
                    {milestone.completed && milestone.completed_at && (
                      <Badge variant='outline' className='text-xs text-muted-foreground'>
                        {milestone.completed_at}
                      </Badge>
                    )}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
