"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SiteHeader({
  site,
}: {
  site: {
    name: string
    logo: React.ElementType
  }
}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex gap-2 h-full">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <site.logo className="size-4" />
            </div>
            <div className="h-full flex-1 flex flex-col">
                <div className="flex-1"></div>
                <div className="grid grow text-left text-lg leading-tight">
                    <span className="truncate font-semibold">
                        {site.name}
                    </span>
                </div>
                <div className="flex-1"></div>
            </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
