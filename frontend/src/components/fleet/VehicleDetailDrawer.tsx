import type { Vehicle, VehicleModel } from '../../types/database';
import { X, Battery, Zap, Calendar, Gauge, ShieldAlert } from 'lucide-react';

interface VehicleDetailDrawerProps {
  vehicle: Vehicle | null;
  model?: VehicleModel;
  onClose: () => void;
  onUpdatePriority: (vehicleId: string, priority: Vehicle['chargingPriority']) => void;
  onUpdateTargetSoc: (vehicleId: string, targetSoc: number) => void;
}

export default function VehicleDetailDrawer({
  vehicle,
  model,
  onClose,
  onUpdatePriority,
  onUpdateTargetSoc,
}: VehicleDetailDrawerProps) {
  if (!vehicle || !model) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-surface border-l border-surface-border shadow-2xl z-40 flex flex-col transition-all">
      {/* Çekmece Başlığı */}
      <div className="h-16 px-6 border-b border-surface-border flex items-center justify-between bg-surface-elevated/40">
        <div>
          <h2 className="text-sm font-bold text-white font-mono">{vehicle.plateNumber}</h2>
          <p className="text-xs text-gray-400 font-mono">{vehicle.fleetCode}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-surface-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Çekmece İçeriği */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Model & Donanım Özeti */}
        <div className="p-4 rounded-xl bg-surface-elevated/60 border border-surface-border space-y-3">
          <div className="text-xs font-mono text-brand-primary font-semibold uppercase">
            Model Özellikleri
          </div>
          <div className="text-sm font-semibold text-white">
            {model.brand} {model.modelName}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-300">
            <div>Kapasite: <span className="text-white font-bold">{model.batteryCapacityKwh} kWh</span></div>
            <div>Kimya: <span className="text-white font-bold">{model.batteryType}</span></div>
            <div>Maks DC: <span className="text-white font-bold">{model.maxDcPowerKw} kW</span></div>
            <div>Tüketim: <span className="text-white font-bold">{model.avgConsumptionKwhPer100km} kWh/100km</span></div>
          </div>
        </div>

        {/* Batarya ve Sağlık Seviyesi */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400 flex items-center gap-1.5">
              <Battery className="w-4 h-4 text-brand-primary" /> Anlık Şarj (SOC)
            </span>
            <span className="text-white font-bold">%{vehicle.currentSocPercent}</span>
          </div>
          <div className="w-full h-3 rounded-full bg-surface-elevated border border-surface-border overflow-hidden">
            <div
              className="h-full bg-brand-primary rounded-full transition-all"
              style={{ width: `${vehicle.currentSocPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-gray-400">
            <span>Batarya Sağlığı (SOH): %{vehicle.batteryHealthSoh}</span>
            <span>Kilometre: {vehicle.odometerKm.toLocaleString()} km</span>
          </div>
        </div>

        {/* Hedef Şarj Yüzdesi Ayarı (Slider) */}
        <div className="space-y-2 p-4 rounded-xl bg-surface-elevated/30 border border-surface-border">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-gray-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-status-charging" /> Hedef Şarj (Target SOC)
            </span>
            <span className="text-brand-primary font-bold">%{vehicle.targetSocPercent}</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            step="5"
            value={vehicle.targetSocPercent}
            onChange={(e) => onUpdateTargetSoc(vehicle.id, Number(e.target.value))}
            className="w-full accent-brand-primary cursor-pointer bg-surface-elevated"
          />
          <p className="text-[11px] text-gray-500">
            Batarya ömrünü korumak için önerilen günlük tavan: %85 - %90
          </p>
        </div>

        {/* Akıllı Şarj Önceliği Seçici */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-status-suspended" /> Akıllı Yük Dengeleme Önceliği
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['LOW', 'NORMAL', 'CRITICAL'] as const).map((p) => (
              <button
                key={p}
                onClick={() => onUpdatePriority(vehicle.id, p)}
                className={`py-2 text-xs font-mono font-semibold rounded-lg border transition-all ${
                  vehicle.chargingPriority === p
                    ? 'bg-brand-primary text-canvas border-brand-primary'
                    : 'bg-surface-elevated text-gray-400 border-surface-border hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 font-sans">
            Trafo kapasitesi aşıldığında <strong>CRITICAL</strong> araçlara kesintisiz güç verilirken, <strong>LOW</strong> araçların gücü dinamik kısılır.
          </p>
        </div>
      </div>
    </div>
  );
}