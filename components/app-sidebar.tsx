'use client';

import * as React from 'react';
import {
  IconBellCheck,
  IconBuildingCommunity,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconMailBolt,
  IconMoneybag,
  IconReport,
  IconSearch,
  IconSettings,
  IconShieldCheck,
} from '@tabler/icons-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavDocuments } from './nav-documents';
import { NavSecondary } from './nav-secondary';
import { NavUser } from './nav-user';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NavUserWrapper } from './nav-user-wrapper';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'My Societies',
      url: '/dashboard/societies',
      icon: IconBuildingCommunity,
    },
    {
      title: 'Financial Passport',
      url: '/dashboard/passport',
      icon: IconShieldCheck,
    },
    {
      title: 'Invites',
      url: '/dashboard/invites',
      icon: IconMailBolt,
    },
    {
      title: 'Reminders',
      url: '#',
      icon: IconBellCheck,
    },
    {
      title: 'Payouts',
      url: '#',
      icon: IconMoneybag,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
  // documents: [
  //   {
  //     name: 'Data Library',
  //     url: '#',
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: 'Reports',
  //     url: '#',
  //     icon: IconReport,
  //   },
  //   {
  //     name: 'Word Assistant',
  //     url: '#',
  //     icon: IconFileWord,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='offExamples'
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:p-1.5!'
            >
              <Link href='#'>
                <IconInnerShadowTop className='size-5!' />
                <span className='text-base font-semibold'>AsusuHQ.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary
          items={data.navSecondary}
          className='mt-auto'
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUserWrapper />
      </SidebarFooter>
    </Sidebar>
  );
}
