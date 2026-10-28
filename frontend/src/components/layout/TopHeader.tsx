import { Zap, Sun, AlertTriangle } from 'lucide-react';
import { mockGridConfig, mockEnergySources, mockDepot } from '../../mocks/seedData';

export default function TopHeader() {
  return (
    <header className="h-16 border-b border-surface-border bg-surface/80 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
      <div>
        <h1 className="text-sm font-semibold text-white">{mockDepot.name}</h1>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="w-2 h-2 rounded-full bg-status-charging animate-pulse" />
          <span className="text-xs text-gray-400">Dynamic Load Balancing: Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Trafo Çekilen Güç / Sınır */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated border border-surface-border">
          <Zap className="w-3.5 h-3.5 text-status-available" />
          <span className="text-xs text-gray-400">Grid Load:</span>
          <span className="text-xs font-mono font-bold text-white">
            {mockGridConfig.currentDrawKw} / {mockGridConfig.transformerLimitKw} kW
          </span>
        </div>

        {/* Canlı Güneş Üretimi */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated border border-surface-border">
          <Sun className="w-3.5 h-3.5 text-status-charging" />
          <span className="text-xs text-gray-400">Solar Gen:</span>
          <span className="text-xs font-mono font-bold text-status-charging">
            +{mockEnergySources[0].currentGenerationKw} kW
          </span>
        </div>

        {/* Hata Bildirimi */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-faulted/10 border border-status-faulted/30 text-status-faulted">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span className="text-xs font-mono font-medium">0 Critical Faults</span>
        </div>
      </div>
    </header>
  );
}