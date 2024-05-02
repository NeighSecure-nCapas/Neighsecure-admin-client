import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {MdCardMembership, MdHome, MdPeople} from "react-icons/md";
import React from "react";
import Overview from "@/components/ui/Overview.tsx";
import LinearOverview from "@/components/ui/LinearOverview.tsx";

export default function DashboardView() {
    return (
        <section className={"container flex flex-col gap-12 h-dvh justify-center items-center"}>
            <div className={"w-full flex flex-row gap-10 items-center justify-center"}>
                <DashboardCardItem
                    title={"# de visitantes de hoy"}
                    stats={23}
                    subtitle={"+5.1 % que el mes pasado"}
                    Icon={<MdPeople size={16} className={"text-primaryColor"}/>}
                />
                <DashboardCardItem
                    title={"Total de hogares registrados"}
                    stats={2500}
                    subtitle={"+10.1 % que el mes pasado"}
                    Icon={<MdHome size={16} className={"text-primaryColor"}/>}
                />
                <DashboardCardItem
                    title={"Total residentes registrados"}
                    stats={1156}
                    subtitle={"+20.1 % que el mes pasado"}
                    Icon={<MdCardMembership size={16} className={"text-primaryColor"}/>}
                />
            </div>
            <div className={"w-full flex-col flex gap-4"}>
                <h1 className={"text-1xl font-medium self-start"}>{"Total de entradas por mes"}</h1>
                <LinearOverview/>
            </div>
            <div className={"w-full flex-col flex gap-4"}>
                <h1 className={"text-1xl font-medium"}>{"Total entradas por hora"}</h1>
                <Overview/>
            </div>
        </section>
    );
}

interface DashboardCardItem {
    title: string;
    subtitle?: string;
    stats: number;
    Icon?: React.ReactNode;
}

function DashboardCardItem({title, stats, subtitle, Icon}: DashboardCardItem) {
    return (
        <Card className={"w-[400px] justify-start"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {Icon}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-medium">{stats}</div>
                <p className="text-xs pt-2 text-muted-foreground">{subtitle}</p>
            </CardContent>
        </Card>
    )
}

