import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/hooks';
import { Layout } from '@/views/layout';
/* Rutas */
import { AuthPage } from '@/views/auth/AuthPage';
import { DashboardView } from '@/views/pages/dashboard';
import { UsersView } from '@/views/pages/users';
import { PropertiesView } from '@/views/pages/properties';
import { CustomersView } from '@/views/pages/customers';
import { TypesCustomersView } from '@/views/pages/typesCustomers';
import { RatesView } from '@/views/pages/rates';
import { RentalCalendarView } from '@/views/pages/rentalCalendar';
import { RentalView } from '@/views/pages/rental';
import { HourRangeView } from '@/views/pages/hourRanges';
import { RequirementsView } from '@/views/pages/requirements';
import { ProductsView } from '@/views/pages/products';
import { ReportView } from '@/views/pages/reports'
import { RolesView } from '@/views/pages/roles'

interface ProtectedRouteProps {
    permission: string;
    children: React.ReactNode;
}

const ProtectedRoute = ({ permission, children }: ProtectedRouteProps) => {
    const { hasPermission } = useAuthStore();
    if (!hasPermission(permission)) {
        return <Navigate to={"/rentalCalendarView"} />;
    }
    return <>{children}</>;
};

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
                    <Route path="/propertiesView" element={
                        <ProtectedRoute permission="rooms.view">
                            <PropertiesView />
                        </ProtectedRoute>
                    } />
                    {/* productos */}
                    <Route path="/productsView" element={
                        <ProtectedRoute permission="products.view">
                            <ProductsView />
                        </ProtectedRoute>
                    } />
                    {/* arriendos con calendario */}
                    <Route path="/rentalCalendarView" element={
                        <ProtectedRoute permission="leases.view">
                            <RentalCalendarView />
                        </ProtectedRoute>
                    } />
                    {/* arriendos */}
                    <Route path="/rentalView" element={
                        <ProtectedRoute permission="leases.view">
                            <RentalView />
                        </ProtectedRoute>
                    } />
                    {/* rangos de horas */}
                    <Route path="/hourRangesView" element={
                        <ProtectedRoute permission="products.view">
                            <HourRangeView />
                        </ProtectedRoute>
                    } />
                    {/* tarifas */}
                    <Route path="/ratesView" element={
                        <ProtectedRoute permission="products.view">
                            <RatesView />
                        </ProtectedRoute>
                    } />
                    {/* requisitos */}
                    <Route path="/requirementsView" element={
                        <ProtectedRoute permission="requirements.view">
                            <RequirementsView />
                        </ProtectedRoute>
                    } />
                    {/* clientes */}
                    <Route path="/customersView" element={
                        <ProtectedRoute permission="customers.view">
                            <CustomersView />
                        </ProtectedRoute>
                    } />
                    {/* tipos de clientes */}
                    <Route path="/typeCustomersView" element={
                        <ProtectedRoute permission="customers.view">
                            <TypesCustomersView />
                        </ProtectedRoute>
                    } />
                    {/* usuarios */}
                    <Route path="/usersView" element={
                        <ProtectedRoute permission="users.view">
                            <UsersView />
                        </ProtectedRoute>
                    } />
                    {/* roles */}
                    <Route path="/rolesView" element={
                        <ProtectedRoute permission="users.view">
                            <RolesView />
                        </ProtectedRoute>
                    } />
                    {/* reportes */}
                    <Route path="/reports" element={
                        <ProtectedRoute permission="leases.view">
                            <ReportView />
                        </ProtectedRoute>
                    } />
                    {/*  */}
                    <Route path="/*" element={<Navigate to={"/rentalCalendarView"} />} />
                </Routes>
            </Layout>
    )
}
