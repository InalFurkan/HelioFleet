import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Sayfalar geldikçe bunları ayrı dosyalara taşıyacağız
const OverviewPage = () => (
  <div>
    <h2 className="text-2xl font-bold tracking-tight">Overview Dashboard</h2>
    <p className="text-sm text-gray-400 mt-1">Sistem geneli enerji dengesi ve operasyonel metrikler.</p>
  </div>
);

const ChargingStationsPage = () => (
  <div>
    <h2 className="text-2xl font-bold tracking-tight">Charging Stations</h2>
    <p className="text-sm text-gray-400 mt-1">İstasyon durumları, tabancalar ve OCPP telemetrisi.</p>
  </div>
);

const FleetManagementPage = () => (
  <div>
    <h2 className="text-2xl font-bold tracking-tight">Fleet Management</h2>
    <p className="text-sm text-gray-400 mt-1">BMC ve Mercedes elektrikli otobüs filosu kontrolü.</p>
  </div>
);

const EnergyAndGridPage = () => (
  <div>
    <h2 className="text-2xl font-bold tracking-tight">Energy & Grid</h2>
    <p className="text-sm text-gray-400 mt-1">Trafo sınırları, dinamik tarifeler ve Çatı GES yönetimi.</p>
  </div>
);

const ReportsPage = () => (
  <div>
    <h2 className="text-2xl font-bold tracking-tight">Reports & Logs</h2>
    <p className="text-sm text-gray-400 mt-1">Geçmiş şarj oturumları ve enerji raporları.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="chargers" element={<ChargingStationsPage />} />
          <Route path="fleet" element={<FleetManagementPage />} />
          <Route path="energy" element={<EnergyAndGridPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}