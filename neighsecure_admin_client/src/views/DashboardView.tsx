import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {MdCardMembership, MdHome, MdPeople} from 'react-icons/md';
import React from 'react';
import Overview from '@/components/ui/Overview.tsx';
import LinearOverview from '@/components/ui/LinearOverview.tsx';
import useSWR from 'swr';
import {GET} from '@/hooks/Dashboard.tsx';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';

export default function DashboardView() {

    const {data, isLoading}: { data: DashboardData, isLoading: boolean } = useSWR('/admin/dashboard', GET);

    return (
        <section className={'container flex flex-col gap-12 py-12 h-dvh justify-center items-center'}>
            <div
                className={'w-full flex flex-row gap-10 items-center justify-center'}
            >
                {isLoading && (
                    <>
                        <DashboardCardItemSkeleton/>
                        <DashboardCardItemSkeleton/>
                        <DashboardCardItemSkeleton/>
                    </>
                )
                }
                {
                    data && (
                        <>
                            <DashboardCardItem
                                title={'# de visitantes de hoy'}
                                stats={data.totalVisitorsToday}
                                subtitle={'+5.1 % que el mes pasado'}
                                Icon={<MdPeople size={16} className={'text-primaryColor'}/>}
                            />
                            <DashboardCardItem
                                title={'Total de hogares registrados'}
                                stats={data.totalHomes}
                                subtitle={'+10.1 % que el mes pasado'}
                                Icon={<MdHome size={16} className={'text-primaryColor'}/>}
                            />
                            <DashboardCardItem
                                title={'Total residentes registrados'}
                                stats={data.totalResidents}
                                subtitle={'+20.1 % que el mes pasado'}
                                Icon={<MdCardMembership size={16} className={'text-primaryColor'}/>}
                            />
                        </>
                    )
                }
            </div>
            {isLoading && (<LoadingSpinner/>)}
            {data &&
                (
                    <>
                        <div className={'w-full flex-col flex gap-6 px-8'}>
                            <h1 className={'text-1xl font-medium self-start'}>
                                {'Total de entradas por mes'}
                            </h1>
                            <LinearOverview data={data}/>
                        </div>
                        <div className={'w-full flex-col flex gap-6 px-8'}>
                            <h1 className={'text-1xl font-medium'}>
                                {'Total entradas por hora'}
                            </h1>
                            <Overview data={data}/>
                        </div>
                    </>
                )
            }
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
        <Card className={'w-[400px] justify-start'}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {Icon}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-medium">{stats}</div>
                <p className="text-xs pt-2 text-muted-foreground">{subtitle}</p>
            </CardContent>
        </Card>
    );
}

function DashboardCardItemSkeleton() {
    return (
        <div className="w-96 p-4 border border-gray-300 rounded shadow">
            <div className="flex justify-between items-center">
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
            <div className="mt-4 h-8 bg-gray-300 rounded"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
    );
}
