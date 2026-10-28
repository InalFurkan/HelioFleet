// ==========================================
// 1. ENUM TİPLERİ (Sabit Değer Kümeleri)
// ==========================================

export type EnergySourceType = 'SOLAR_PV' | 'WIND_TURBINE' | 'BIOGAS_GEN' | 'BESS_BATTERY';
export type ConnectionProtocol = 'MODBUS_TCP' | 'SUNSPEC' | 'REST_API' | 'MQTT';
export type BatteryChemistry = 'LFP' | 'NMC' | 'NCA';
export type OcppStatus = 'Available' | 'Preparing' | 'Charging' | 'SuspendedEVSE' | 'SuspendedEV' | 'Finishing' | 'Faulted';
export type PriorityLevel = 'LOW' | 'NORMAL' | 'CRITICAL';
export type VehicleStatus = 'IN_DEPOT' | 'ON_ROUTE' | 'MAINTENANCE';

// ==========================================
// 2. TEMEL MODEL ARAYÜZLERİ (PostgreSQL Birebir Eşleşmesi)
// ==========================================

// Depo / Garaj Tesisi
export interface Depot {
  id: string;
  name: string;
  locationCity: string;
  baseBuildingLoadKw: number;
  isDemoEnvironment: boolean;
}

// Araç Kataloğu (Model Şablonu: BMC Neocity, eCitaro vb.)
export interface VehicleModel {
  id: string;
  brand: string;
  modelName: string;
  vehicleType: 'BUS' | 'VAN' | 'TRUCK';
  modelYear: number;
  batteryCapacityKwh: number;
  batteryType: BatteryChemistry;
  maxAcPowerKw: number;
  maxDcPowerKw: number;
  avgConsumptionKwhPer100km?: number;
}

// Fiziksel Plakalı Araç (Depodaki Bireysel Otobüs)
export interface Vehicle {
  id: string;
  depotId: string;
  modelId: string;
  plateNumber: string;
  fleetCode: string;
  vinNumber?: string;
  odometerKm: number;
  currentSocPercent: number;     // Anlık şarj yüzdesi (0 - 100)
  batteryHealthSoh: number;       // Batarya sağlığı (% SOH)
  nextDepartureTime: string;      // Çıkış saati (ISO formatında: "2026-10-29T06:00:00Z")
  targetSocPercent: number;       // İstenen hedef şarj (örn: %90)
  chargingPriority: PriorityLevel;
  status: VehicleStatus;
}

// Şebeke ve Trafo Sınırları
export interface GridConfig {
  id: string;
  depotId: string;
  connectionName: string;
  transformerLimitKw: number;     // Trafo kapasitesi (örn: 500 kW)
  safetyMarginPercent: number;    // Güvenlik marjı (örn: %5)
  dayTariffPerKwh: number;
  peakTariffPerKwh: number;
  nightTariffPerKwh: number;
  currentDrawKw: number;          // Şebekeden çekilen anlık güç
  isActive: boolean;
}

// Üretim Kaynağı (Çatı Güneş Paneli / GES)
export interface EnergySource {
  id: string;
  depotId: string;
  sourceName: string;
  sourceType: EnergySourceType;
  installedCapacityKwp: number;   // Kurulu güç (kWp)
  inverterBrand: string;
  protocol: ConnectionProtocol;
  endpointAddress: string;        // Modbus/IP adresi (örn: "192.168.1.50:502")
  isOnline: boolean;
  currentGenerationKw: number;    // Anlık üretim (kW)
  todayYieldKwh: number;          // Günlük toplam üretilen enerji (kWh)
}

// Şarj İstasyonu Soketi (Connector)
export interface Connector {
  id: string;
  chargerId: string;
  connectorNo: number;            // 1 veya 2 numaralı tabanca
  connectorType: 'CCS2' | 'Type2';
  maxSocketPowerKw: number;       // Soket gücü (örn: 150 kW)
  status: OcppStatus;
  currentPowerKw: number;         // Anlık verilen güç (kW)
  errorCode: string;
}

// Şarj İstasyonu Kabini (Charger Hardware)
export interface Charger {
  id: string;
  depotId: string;
  stationCode: string;            // İstasyon kodu (örn: "ST-DC-01")
  vendorModel: string;            // Cihaz modeli (örn: "ABB Terra 184 CC")
  maxCabinetPowerKw: number;      // İstasyon toplam gücü (örn: 180 kW)
  ocppIdentity: string;
  ipAddress: string;
  isOnline: boolean;
  internalTempC: number;
  connectors: Connector[];
}

// Aktif / Geçmiş Şarj Seansı
export interface ChargingSession {
  id: string;
  connectorId: string;
  vehicleId: string;
  startedAt: string;
  endedAt?: string;
  startSocPercent: number;
  currentSocPercent: number;
  targetSocPercent: number;
  allocatedPowerKw: number;
  energyDeliveredKwh: number;
  solarContributionKwh: number;
  gridContributionKwh: number;
  isActive: boolean;
}