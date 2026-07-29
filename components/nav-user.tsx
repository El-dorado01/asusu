// components/nav-user.tsx (or wherever your NavUser is)

'use client';

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import LogoutButton from './logout-button';

type CurrentUser = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string | null; // from your API/profile
};

export function NavUser({ user }: { user: CurrentUser | null }) {
  const { isMobile } = useSidebar();

  // If no user (e.g., not logged in), show a placeholder or nothing
  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-border/50'
          >
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarFallback className='rounded-lg text-xs'>?</AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium text-muted-foreground'>
                Guest
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const displayName = user.name || 'User';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-border/50 hover:bg-sidebar-border/50 data-[state=open]:text-foreground hover:text-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={user.avatar_url || undefined} // ← Safe: null → undefined
                  alt={displayName}
                />
                <AvatarFallback className='rounded-lg text-xs font-medium'>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{displayName}</span>
                <span className='truncate text-xs text-muted-foreground'>
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-3 px-2 py-3 text-left text-sm'>
                <Avatar className='h-9 w-9 rounded-lg'>
                  <AvatarImage
                    src={user.avatar_url || undefined}
                    alt={displayName}
                  />
                  <AvatarFallback className='rounded-lg text-sm font-medium'>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1'>
                  <p className='font-medium truncate'>{displayName}</p>
                  <p className='text-xs text-muted-foreground truncate'>
                    {user.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle className='mr-2 h-4 w-4' />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard className='mr-2 h-4 w-4' />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification className='mr-2 h-4 w-4' />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
