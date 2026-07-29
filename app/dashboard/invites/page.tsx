// app/dashboard/invites/page.tsx

import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { IconUserPlus } from '@tabler/icons-react';
import { getPendingInvites } from '@/app/actions/societies';
import InviteCardsList from '@/components/invite-cards-list';

// This is a Server Component — NO 'use client' here
async function InvitesListServer() {
  const { pending_invites } = await getPendingInvites();

  if (pending_invites.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 text-center'>
        <div className='rounded-full bg-muted p-6 mb-6'>
          <IconUserPlus className='h-12 w-12 text-muted-foreground' />
        </div>
        <h2 className='text-xl font-semibold mb-2'>No pending invites</h2>
        <p className='text-muted-foreground max-w-md'>
          When someone invites you to join a society or become a co-founder,
          you&apos;ll see it here.
        </p>
      </div>
    );
  }

  return <InviteCardsList invites={pending_invites} />;
}

export default function InvitesPage() {
  return (
    <div className='p-6 md:p-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold tracking-tight'>Pending Invites</h1>
        <p className='text-muted-foreground mt-2'>
          Review and respond to invitations to join savings societies
        </p>
      </div>

      <Suspense
        fallback={
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className='flex items-center gap-4'>
                    <Skeleton className='h-12 w-12 rounded-full' />
                    <div>
                      <Skeleton className='h-6 w-40' />
                      <Skeleton className='h-4 w-32 mt-2' />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-32 mt-3' />
                </CardContent>
                <CardFooter className='gap-3'>
                  <Skeleton className='h-10 flex-1' />
                  <Skeleton className='h-10 flex-1' />
                </CardFooter>
              </Card>
            ))}
          </div>
        }
      >
        <InvitesListServer />
      </Suspense>
    </div>
  );
}
