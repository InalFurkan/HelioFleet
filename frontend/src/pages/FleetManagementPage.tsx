import { useState } from 'react';
import { mockVehicles, mockVehicleModels } from '../mocks/seedData';
import type { Vehicle } from '../types/database';
import GroupedFleetTable from '../components/fleet/GroupedFleetTable';
import VehicleDetailDrawer from '../components/fleet/VehicleDetailDrawer';

export default function FleetManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || null;
  const selectedModel = selectedVehicle
    ? mockVehicleModels.find((m) => m.id === selectedVehicle.modelId)
    : undefined;

  const handleUpdatePriority = (vehicleId: string, priority: Vehicle['chargingPriority']) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, chargingPriority: priority } : v))
    );
  };

  const handleUpdateTargetSoc = (vehicleId: string, targetSoc: number) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, targetSocPercent: targetSoc } : v))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Filo Yönetimi</h2>
          <p className="text-sm text-gray-400 mt-1">
            Depodaki BMC Neocity ve Mercedes-Benz eCitaro elektrikli otobüslerinin batarya ve öncelik kontrolü.
          </p>
        </div>
      </div>

      {/* Gruplu Araç Tablosu */}
      <GroupedFleetTable
        models={mockVehicleModels}
        vehicles={vehicles}
        onSelectVehicle={(v) => setSelectedVehicleId(v.id)}
        selectedVehicleId={selectedVehicleId || undefined}
      />

      {/* Sağdan Açılan Detay Çekmecesi */}
      <VehicleDetailDrawer
        vehicle={selectedVehicle}
        model={selectedModel}
        onClose={() => setSelectedVehicleId(null)}
        onUpdatePriority={handleUpdatePriority}
        onUpdateTargetSoc={handleUpdateTargetSoc}
      />
    </div>
  );
}