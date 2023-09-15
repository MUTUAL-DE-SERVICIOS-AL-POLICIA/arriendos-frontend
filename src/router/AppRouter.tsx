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
import { HourRangeView } from '@/views/pages/hourRanges/HourRangeView';
import { RequirementsView } from '@/views/pages/requirements/RequirementsView';
import { ProductsView } from '@/views/pages/products/ProductsView';

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
                    {/* dashboard */}
                    <Route path="/dashboardView" element={<DashboardView />} />
                    {/* inmuebles */}
                    <Route path="/propertiesView" element={<PropertiesView />} />
                    {/* productos */}
                    <Route path="/productsView" element={<ProductsView />} />
                    {/* arriendos */}
                    <Route path="/leasesView" element={<LeasesView />} />
                    {/* rangos de horas */}
                    <Route path="/hourRangesView" element={<HourRangeView />} />
                    {/* tarifas */}
                    <Route path="/ratesView" element={<RatesView />} />
                    {/* requisitos */}
                    <Route path="/requirementsView" element={<RequirementsView />} />
                    {/* clientes */}
                    <Route path="/customersView" element={<CustomersView />} />
                    {/* tipos de clientes */}
                    <Route path="/typeCustomersView" element={<TypesCustomersView />} />
                    {/* usuarios */}
                    <Route path="/usersView" element={<UsersView />} />
                    {/*  */}
                    <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
                </Routes>
            </Layout>
    )
}
