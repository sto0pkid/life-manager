import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const _Card : React.FC<{
    title: string,
    description?: string,
    children: React.ReactNode
}> = ({title, description, children}) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {
                        description
                        ? <CardDescription>{description}</CardDescription>
                        : null
                    }
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </>
    )
}

export default _Card