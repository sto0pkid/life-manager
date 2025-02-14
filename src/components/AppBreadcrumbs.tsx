import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation } from 'react-router-dom';
import { routes } from '../routes'


export const AppBreadcrumbs = () => {
    const location = useLocation()
    const pageName = (
       routes[location.pathname]
       ? routes[location.pathname].name
       : (
        location.pathname.startsWith('/graph')
        ? 'Graph'
        : ''
       )
    )

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                        Tools
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>{pageName}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}