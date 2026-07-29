'use client';

import { FinancialPassport } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconShieldCheck, IconAward, IconArrowRight, IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';

interface PassportWidgetProps {
  passport: FinancialPassport;
}

export function PassportWidget({ passport }: PassportWidgetProps) {
  return (
    <Card className='border bg-card shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div className='flex items-center gap-2'>
          <div className='p-2 rounded-lg bg-primary/10 text-primary'>
            <IconShieldCheck className='h-5 w-5' />
          </div>
          <div>
            <CardTitle className='text-base font-bold'>Financial Passport</CardTitle>
            <p className='text-xs text-muted-foreground'>Portable Reputation</p>
          </div>
        </div>
        <Badge variant='outline' className='font-medium'>
          {passport.trust_level.split('—')[0].trim()}
        </Badge>
      </CardHeader>

      <CardContent className='space-y-4 pt-2'>
        <div className='grid grid-cols-2 gap-4 border-y py-3 text-sm'>
          <div>
            <span className='text-xs text-muted-foreground block'>Consistency Score</span>
            <span className='text-lg font-bold text-primary flex items-center gap-1'>
              <IconTrendingUp className='h-4 w-4' />
              {passport.consistency_score}%
            </span>
          </div>
          <div>
            <span className='text-xs text-muted-foreground block'>Repayment Record</span>
            <span className='text-lg font-bold text-foreground'>
              {passport.repayment_score}%
            </span>
          </div>
        </div>

        <div className='flex items-center justify-between gap-2 pt-1'>
          <div className='flex items-center gap-1 text-xs text-muted-foreground'>
            <IconAward className='h-4 w-4 text-primary' />
            <span>Verified in {passport.verified_cooperatives_count} Societies</span>
          </div>

          <Button asChild size='sm' className='gap-1 font-medium'>
            <Link href='/dashboard/passport'>
              View Passport <IconArrowRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
