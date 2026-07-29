import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Suspense } from 'react';
import { getMyActiveSocieties } from '@/app/actions/societies';
import { IconCalendar, IconCurrencyDollar, IconPlus, IconUsers } from '@tabler/icons-react';
import { QuickCreateSociety } from '@/components/quick-create-society';

function getRoleColor(role: string) {
  switch (role) {
    case 'founder':
      return 'bg-purple-500';
    case 'co-founder':
      return 'bg-blue-500';
    case 'executive':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

function formatFrequency(freq: string) {
  return freq.charAt(0).toUpperCase() + freq.slice(1);
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

async function SocietiesGrid() {
  const { active_societies } = await getMyActiveSocieties();

  if (active_societies.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 text-center'>
        <div className='rounded-full bg-muted p-8 mb-6'>
          <IconUsers className='h-16 w-16 text-muted-foreground' />
        </div>
        <h2 className='text-2xl font-semibold mb-2'>No societies yet</h2>
        <p className='text-muted-foreground mb-6 max-w-md'>
          Join or create a society to start saving together with friends,
          family, or colleagues.
        </p>
        <QuickCreateSociety from='sidebar' />
      </div>
    );
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {active_societies.map((society) => (
        <Link
          key={society.id}
          href={`/dashboard/societies/${society.id}`}
        >
          <Card className='hover:shadow-lg transition-shadow duration-200 h-full flex flex-col'>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-4'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={society.avatar_url || undefined} />
                    <AvatarFallback>
                      {society.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className='text-lg'>{society.name}</CardTitle>
                    <CardDescription className='line-clamp-1'>
                      {society.description || 'No description'}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={`${getRoleColor(society.role)} text-white`}>
                  {society.role.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className='flex-1'>
              <div className='space-y-4'>
                {society.settings && (
                  <>
                    <div className='flex items-center gap-3 text-sm'>
                      <IconCurrencyDollar className='h-4 w-4 text-muted-foreground' />
                      <span>
                        <strong>
                          {society.settings.contribution_amount.toLocaleString()}
                        </strong>{' '}
                        {formatFrequency(society.settings.frequency)}
                      </span>
                    </div>

                    <div className='flex items-center gap-3 text-sm'>
                      <IconUsers className='h-4 w-4 text-muted-foreground' />
                      <span>{society.total_members} members</span>
                    </div>

                    <div className='flex items-center gap-3 text-sm'>
                      <IconCalendar className='h-4 w-4 text-muted-foreground' />
                      <span>Next due: {formatDate(society.next_due?.date)}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>

            <CardFooter className='pt-4 border-t'>
              <Button
                variant='secondary'
                className='w-full'
              >
                View Society
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function SocietiesPage() {
  return (
    <div className='p-6 md:p-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>My Societies</h1>
          <p className='text-muted-foreground mt-2'>
            Manage and track your rotating savings groups
          </p>
        </div>

        <QuickCreateSociety from='page' />
      </div>

      <Suspense
        fallback={
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className='h-12 w-12 rounded-full' />
                  <Skeleton className='h-6 w-48 mt-4' />
                  <Skeleton className='h-4 w-32 mt-2' />
                </CardHeader>
                <CardContent>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full mt-2' />
                  <Skeleton className='h-4 w-full mt-2' />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <SocietiesGrid />
      </Suspense>
    </div>
  );
}
