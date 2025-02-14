"use client"

import * as React from "react"
import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { SiteHeader } from "@/components/header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import {  routes } from '../routes'


const sidebarOrder = [
  "/bills",
  "/budget",
  "/revenues",
  "/planning",
  "/health",
  "/fitness",
  "/hobbies",
  "/travel",
  "/events",
  "/reminders",
  "/schedule",
  "/jobLeads",
  "/jobs",
  "/meals",
]

// This is sample data.
const data = {
  user: {
    name: "Me",
    email: "me@example.com",
    avatar: "/avatars/me",
  },
  site: {
    name: "Life Manager",
    logo: GalleryVerticalEnd,
  },
  navMain: [
    {
      title: "Tools",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        ...sidebarOrder.map(path => ({title: routes[path].name, url: path})),
        {title: 'Graph', url: '/graph/get/start'}
      ]
    },
  ],
  projects: [
    {
      name: "Life Manager",
      url: "#",
      icon: Frame,
    },
    {
      name: "Math Project",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SiteHeader site={data.site} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
