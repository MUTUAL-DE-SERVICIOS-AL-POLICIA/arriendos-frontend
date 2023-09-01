import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { AuthPage } from '@/views/auth/AuthPage';
import { DashboardView } from '@/views/pages/dashboard/DashboardView';
import { UsersView } from '@/views/pages/users';
import { PropertiesView } from '@/views/pages/properties';
import { CustomersView } from '@/views/pages/customers';
import { TypesCustomersView } from '@/views/pages/typesCustomers';
import { RatesView } from '@/views/pages/rates';
import { LeasesView } from '@/views/pages/leases';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    useEffect(() => {
        checkAuthToken();
    }, []);

    return (
        (status === 'not-authenticated') ?
            <AuthPage />
            :
            <Layout>
                <Routes>
                    <Route path="/dashboardView" element={<DashboardView />} />
                    <Route path="/propertiesView" element={<PropertiesView />} />
                    <Route path="/ratesView" element={<RatesView />} />
                    <Route path="/leasesView" element={<LeasesView />} />
                    {/* module customers */}
                    <Route path="/customersView" element={<CustomersView />} />
                    <Route path="/typeCustomersView" element={<TypesCustomersView />} />
                    {/* module users */}
                    <Route path="/usersView" element={<UsersView />} />

                    {/*  */}
                    <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
                </Routes>
            </Layout>
    )
}
