import useSWR from 'swr';
import React from 'react';
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardShell";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import EmptyState from "@/components/EmptyState";
import SiteTable from "@/components/SiteTable";
import SiteTableHeader from "@/components/SiteTableHeader";
import {useAuth} from "@/lib/auth";

const Dashboard = () => {
    const {user} = useAuth();
    const {data} = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
    const sites = data?.sites;

    if (!data) {
        return (
            <DashboardShell>
                <SiteTableHeader/>
                <SiteTableSkeleton/>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <SiteTableHeader/>
            {sites?.length ? <SiteTable sites={sites}/> : <EmptyState/>}
        </DashboardShell>
    );
};

export default Dashboard;