// components/society-cards.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { IconFilterSearch, IconUsers } from '@tabler/icons-react';

type Society = {
  id: number;
  name: string;
  description?: string | null;
  member_count?: number;
  avatar_url?: string; // from accessor
};

interface SocietyCardsProps {
  societies: Society[];
}

export function SocietyCards({ societies }: SocietyCardsProps) {
  if (!societies || societies.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 px-4 text-center bg-sidebar-border/50 rounded-lg'>
        <div className='mb-3 rounded-full bg-muted p-4'>
          <IconFilterSearch className='h-8 w-8 text-muted-foreground' />
        </div>

        <h3 className='text-xl font-semibold text-foreground'>
          No societies found
        </h3>

        <p className='mt-3 max-w-md text-muted-foreground'>
          We couldn&apos;t find any societies matching your search. Try adjusting
          your filters or explore all public societies below.
        </p>

        <Button
          variant='outline'
          className='mt-6'
          asChild
        >
          <Link href='/dashboard'>Clear search & explore</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {societies.map((society) => (
        <Card
          key={society.id}
          className='group flex flex-col overflow-hidden transition-all hover:shadow-lg'
        >
          {/* Avatar + Name Header */}
          <CardHeader className='flex flex-row items-center gap-4'>
            <Avatar className='h-12 w-12 border-2 border-background shadow-sm'>
              <AvatarImage
                src={society.avatar_url || undefined}
                alt={society.name}
              />
              <AvatarFallback className='bg-muted text-lg font-semibold'>
                {society.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1'>
              <CardTitle className='line-clamp-1 text-base font-medium group-hover:text-primary transition-colors'>
                {society.name}
              </CardTitle>
              <div className='mt-1 flex items-center gap-1 text-xs text-muted-foreground'>
                <IconUsers className='h-3 w-3' />
                <span>{society.member_count || 0} members</span>
              </div>
            </div>
          </CardHeader>

          {/* Description + Action */}
          <CardContent className='flex flex-1 flex-col justify-between'>
            <CardDescription className='line-clamp-2 text-xs'>
              {society.description ||
                'A community dedicated to collective growth and support.'}
            </CardDescription>

            <div className='mt-4'>
              <Button
                asChild
                size='sm'
                className='w-full'
              >
                <Link href={`/dashboard/societies/${society.id}`}>View Society</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
