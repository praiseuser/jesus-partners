import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import AdminLayout from '../layout/AdminLayout';
import HomePage from '../pages/Home';
import AboutPage from '../pages/About';
import ProgramsPage from '../pages/Programs';
import GalleryPage from '../pages/Gallery';
import ContactPage from '../pages/Contact';
import BlogPage from '../pages/Blog';
import ResourcesPage from '../pages/Resources';
import GivePage from '../pages/Give';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboardPage from '../pages/Admin/Dashboard';
import AdminBlogsPage from '../pages/Admin/Blog';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'programs', element: <ProgramsPage /> },
            { path: 'gallery', element: <GalleryPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'blog', element: <BlogPage /> },
            { path: 'resources', element: <ResourcesPage /> },
            { path: 'give', element: <GivePage /> },
            { path: 'faq', element: <BlogPage /> },
            { path: 'terms', element: <BlogPage /> },
            { path: 'privacy', element: <BlogPage /> },
            { path: 'affiliate', element: <BlogPage /> },
            { path: 'sermons', element: <ResourcesPage /> },
            { path: 'more', element: <BlogPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminDashboardPage /> },
            { path: 'blogs', element: <AdminBlogsPage /> },
            { path: 'activities', element: <AdminDashboardPage /> },
            { path: 'announcements', element: <AdminDashboardPage /> },
            { path: 'bible-studies', element: <AdminDashboardPage /> },
            { path: 'categories', element: <AdminDashboardPage /> },
            { path: 'daily-devotion', element: <AdminDashboardPage /> },
            { path: 'discipleship', element: <AdminDashboardPage /> },
            { path: 'events', element: <AdminDashboardPage /> },
            { path: 'media', element: <AdminDashboardPage /> },
            { path: 'messages', element: <AdminDashboardPage /> },
            { path: 'partners', element: <AdminDashboardPage /> },
            { path: 'payment-methods', element: <AdminDashboardPage /> },
            { path: 'requests', element: <AdminDashboardPage /> },
            { path: 'discipleship-classes', element: <AdminDashboardPage /> },
            { path: 'discipleship-materials', element: <AdminDashboardPage /> },
            { path: 'resources', element: <AdminDashboardPage /> },
            { path: 'tracks', element: <AdminDashboardPage /> },
            { path: 'bible-study-series', element: <AdminDashboardPage /> },
            { path: 'resource-series', element: <AdminDashboardPage /> },
            { path: 'sub-categories', element: <AdminDashboardPage /> },
            { path: 'bank-details', element: <AdminDashboardPage /> },
            { path: 'officials', element: <AdminDashboardPage /> },
            { path: 'settings', element: <AdminDashboardPage /> },
        ],
    },
]);

export default router;