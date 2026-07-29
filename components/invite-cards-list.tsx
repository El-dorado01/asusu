'use client';

import { useState } from 'react';
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
import {
  IconCheck,
  IconClock,
  IconCrown,
  IconLoader,
  IconX,
} from '@tabler/icons-react';
import { acceptInvite, declineInvite } from '@/app/actions/societies';
import { toast } from 'sonner';

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  if (diffInDays < 30)
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  return past.toLocaleDateString();
}

export default function InviteCardsList({ invites }: { invites: any[] }) {
  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {invites.map((invite) => (
        <InviteCard
          key={invite.id}
          invite={invite}
        />
      ))}
    </div>
  );
}

function InviteCard({ invite }: { invite: any }) {
  const [isLoading, setIsLoading] = useState<'accept' | 'decline' | null>(null);

  const handleAccept = async () => {
    setIsLoading('accept');
    try {
      await acceptInvite(invite.id, invite.invite_type);
      toast.success('Invite Accepted 🎉', {
        description: `You’ve joined "${
          invite.name
        }" as ${invite.role.toLowerCase()}.`,
      });
    } catch (error: any) {
      toast.error('Failed to accept invite', {
        description: error.message || 'Something went wrong.',
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleDecline = async () => {
    setIsLoading('decline');
    try {
      await declineInvite(invite.id);
      toast.success('Invite Declined', {
        description: `You declined the invite to "${invite.name}".`,
      });
    } catch (error: any) {
      toast.error('Failed to decline invite', {
        description: error.message || 'Something went wrong.',
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-12 w-12'>
              <AvatarImage src={invite.avatar_url || undefined} />
              <AvatarFallback>
                {invite.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className='text-lg flex items-center gap-2'>
                {invite.name}
              </CardTitle>
              <CardDescription className='line-clamp-2 mt-1'>
                {invite.description || 'No description'}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={
              invite.invite_type === 'co-founder' ? 'default' : 'secondary'
            }
          >
            {invite.role}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className='space-y-3 text-sm text-muted-foreground'>
          <p>
            <strong>Invited by:</strong> {invite.invited_by}
          </p>
          <p className='flex items-center gap-2'>
            <IconClock className='h-4 w-4' />
            {formatTimeAgo(invite.invited_at)}
          </p>
          {invite.is_public === true && (
            <Badge
              variant='outline'
              className='w-fit'
            >
              Public Society
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className='border-t bg-muted/30 pt-4'>
        <div className='flex w-full gap-3'>
          <Button
            className='flex-1 cursor-pointer'
            onClick={handleAccept}
            disabled={!!isLoading}
          >
            {isLoading === 'accept' ? (
              <>
                <IconLoader className='mr-1 animate-spin' /> Accepting...
              </>
            ) : (
              <>
                <IconCheck className='mr-2 h-4 w-4' />
                Accept
              </>
            )}
          </Button>
          <Button
            variant='outline'
            className='flex-1 cursor-pointer'
            onClick={handleDecline}
            disabled={!!isLoading}
          >
            {isLoading === 'decline' ? (
              <>
                <IconLoader className='mr-1 animate-spin' /> Declining...
              </>
            ) : (
              <>
                <IconX className='mr-2 h-4 w-4' />
                Decline
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
