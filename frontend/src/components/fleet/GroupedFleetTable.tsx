import type { Vehicle, VehicleModel } from '../../types/database';
import { BatteryCharging, Clock, ShieldAlert, Sparkles } from 'lucide-react';

interface GroupedFleetTableProps {
  models: VehicleModel[];
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  selectedVehicleId?: string;
}

export default function GroupedFleetTable({
  models,
  vehicles,
  onSelectVehicle,
  selectedVehicleId,
}: GroupedFleetTableProps) {
  // Öncelik etiket renkleri
  const getPriorityBadge = (priority: Vehicle['chargingPriority']) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-status-faulted/10 text-status-faulted border-status-faulted/30';
      case 'NORMAL':
        return 'bg-status-available/10 text-status-available border-status-available/30';
      case 'LOW':
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  // SOC rengi (Düşükse Kehribar/Kırmızı, Yüksekse Yeşil)
  const getSocColor = (soc: number) => {
    if (soc < 30) return 'bg-status-faulted';
    if (soc < 70) return 'bg-status-suspended';
    return 'bg-status-charging';
  };

  return (
    <div className="space-y-8">
      {models.map((model) => {
        const modelVehicles = vehicles.filter((v) => v.modelId === model.id);

        return (
          <div
            key={model.id}
            className="rounded-xl border border-surface-border bg-surface overflow-hidden shadow-lg"
          >
            {/* Model Grup Başlığı */}
            <div className="px-6 py-4 border-b border-surface-border bg-surface-elevated/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-muted border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {model.brand} {model.modelName}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Batarya: {model.batteryCapacityKwh} kWh ({model.batteryType}) • Maks Hızlı Şarj:{' '}
                    {model.maxDcPowerKw} kW
                  </p>
                </div>
              </div>
              <div className="text-xs font-mono px-2.5 py-1 rounded bg-surface-elevated text-gray-300 border border-surface-border">
                {modelVehicles.length} Araç Kayıtlı
              </div>
            </div>

            {/* Araç Tablosu */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-gray-400 uppercase bg-surface-elevated/20 border-b border-surface-border font-mono">
                  <tr>
                    <th className="px-6 py-3">Plaka / Filo Kodu</th>
                    <th className="px-6 py-3">Batarya Durumu (SOC)</th>
                    <th className="px-6 py-3">Sağlık (SOH)</th>
                    <th className="px-6 py-3">Sonraki Çıkış</th>
                    <th className="px-6 py-3">Şarj Önceliği</th>
                    <th className="px-6 py-3">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border font-sans">
                  {modelVehicles.map((vehicle) => {
                    const isSelected = selectedVehicleId === vehicle.id;
                    const departureFormatted = new Date(
                      vehicle.nextDepartureTime
                    ).toLocaleTimeString('tr-TR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <tr
                        key={vehicle.id}
                        onClick={() => onSelectVehicle(vehicle)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-brand-muted/40 hover:bg-brand-muted/50'
                            : 'hover:bg-surface-elevated/50'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white font-mono">
                            {vehicle.plateNumber}
                          </div>
                          <div className="text-xs text-gray-400 font-mono">
                            {vehicle.fleetCode} • {vehicle.odometerKm.toLocaleString()} km
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-white text-xs w-9">
                              %{vehicle.currentSocPercent}
                            </span>
                            <div className="w-28 h-2 rounded-full bg-surface-elevated overflow-hidden border border-surface-border">
                              <div
                                className={`h-full rounded-full transition-all ${getSocColor(
                                  vehicle.currentSocPercent
                                )}`}
                                style={{ width: `${vehicle.currentSocPercent}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 font-mono text-xs text-gray-300">
                          %{vehicle.batteryHealthSoh}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-gray-300">
                            <Clock className="w-3.5 h-3.5 text-gray-500" />
                            {departureFormatted}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border ${getPriorityBadge(
                              vehicle.chargingPriority
                            )}`}
                          >
                            {vehicle.chargingPriority === 'CRITICAL' && (
                              <ShieldAlert className="w-3 h-3" />
                            )}
                            {vehicle.chargingPriority}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-300">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                vehicle.status === 'IN_DEPOT'
                                  ? 'bg-status-charging'
                                  : 'bg-status-available'
                              }`}
                            />
                            {vehicle.status === 'IN_DEPOT' ? 'Depoda' : 'Seferde'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}