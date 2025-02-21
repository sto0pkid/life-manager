import { AppSidebar } from "@/components/AppSidebar"
import { AppBreadcrumbs } from "@/components/AppBreadcrumbs"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from "react"
import { BrowserRouter } from 'react-router'


const Layout : React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <AppBreadcrumbs />
            </div>
          </header>
          { children }
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default Layout
