import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas text-gray-100">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <TopHeader />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}