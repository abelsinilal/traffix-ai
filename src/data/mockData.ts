import {
  Incident,
  TrafficSegment,
  EmergencyVehicle,
  Location,
  SystemAlert,
  WeatherCondition,
  PredictionInput
} from '../types';

// Map center around a smart urban corridor (e.g., Smart City Command Center zone)
export const MAP_CENTER = { lat: 16.2008, lng: 77.3553, zoom: 13 }; // Hyderabad/Smart City center coordinates

export const MOCK_LOCATIONS: Location[] = [
  { id: 'loc-1', name: 'RIMS District Hospital', lat: 16.2050, lng: 77.3580, address: 'Station Road, Raichur' },
  { id: 'loc-2', name: 'Navodaya Medical College', lat: 16.1850, lng: 77.3710, address: 'Mantralayam Road, Raichur' },
  { id: 'loc-3', name: 'Central Fire Station', lat: 16.2020, lng: 77.3510, address: 'Ambedkar Circle, Raichur' },
  { id: 'loc-4', name: 'City Police Headquarters', lat: 16.1980, lng: 77.3540, address: 'SP Office Road, Raichur' },
  { id: 'loc-5', name: 'NH-167 Express Junction', lat: 16.2120, lng: 77.3650, address: 'National Highway 167' },
  { id: 'loc-6', name: 'Main Market Square', lat: 16.2000, lng: 77.3560, address: 'Gunj Road Cross' },
  { id: 'loc-7', name: 'Bypass Ring Road', lat: 16.2180, lng: 77.3480, address: 'Outer Ring Road Exit' },
];

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC-001',
    locationName: 'NH-167 Express Junction',
    lat: 17.388,
    lng: 78.515,
    type: 'Accident',
    severity: 'Critical',
    timestamp: '10:32 AM Today',
    status: 'Active',
    riskScore: 88,
    affectedRoads: ['NH-167 Northbound', 'Ring Road Connector'],
    nearbyVehicles: ['A102 (Ambulance)', 'P301 (Police)'],
    description: 'Multi-vehicle collision involving a commercial truck and two cars causing lane blockage.',
    recommendedAction: 'Dispatch heavy rescue vehicle, activate digital VMS signage, reroute emergency units via Ring Road Exit 9.'
  },
  {
    id: 'INC-002',
    locationName: 'Main Market Square',
    lat: 17.375,
    lng: 78.478,
    type: 'Road Blockage',
    severity: 'High',
    timestamp: '10:18 AM Today',
    status: 'Active',
    riskScore: 78,
    affectedRoads: ['Market Road', 'Station Road Link'],
    nearbyVehicles: ['P302 (Police)'],
    description: 'Fallen tree and utility wire damage blocking two south-bound lanes.',
    recommendedAction: 'Deploy municipal clearing crew; assign traffic constable for manual diversion.'
  },
  {
    id: 'INC-003',
    locationName: 'Ring Road Interchange',
    lat: 17.412,
    lng: 78.502,
    type: 'Heavy Congestion',
    severity: 'Moderate',
    timestamp: '09:54 AM Today',
    status: 'Monitoring',
    riskScore: 54,
    affectedRoads: ['Outer Ring Road Exit 9'],
    nearbyVehicles: ['A104 (Ambulance)'],
    description: 'Peak hour bottleneck build-up extending 1.8 km back from flyover ramp.',
    recommendedAction: 'Adjust signal timing on adjacent arterial feeders to flush corridor.'
  },
  {
    id: 'INC-004',
    locationName: 'Station Road Flyover',
    lat: 17.398,
    lng: 78.482,
    type: 'Weather Hazard',
    severity: 'High',
    timestamp: '09:20 AM Today',
    status: 'Active',
    riskScore: 72,
    affectedRoads: ['Station Road', 'Central Avenue'],
    nearbyVehicles: ['F204 (Fire Truck)'],
    description: 'Waterlogging under low-clearance railway bridge due to localized flash downpour.',
    recommendedAction: 'Issue hydroplaning alert via mobile notifications and dynamic message signs.'
  },
  {
    id: 'INC-005',
    locationName: 'University Circle',
    lat: 17.362,
    lng: 78.498,
    type: 'Heavy Congestion',
    severity: 'Low',
    timestamp: '08:45 AM Today',
    status: 'Resolved',
    riskScore: 28,
    affectedRoads: ['University Road'],
    nearbyVehicles: [],
    description: 'Temporary slow movement cleared following minor fender bender resolution.',
    recommendedAction: 'Corridor cleared. Retain green wave timing for 15 minutes.'
  }
];

export const MOCK_TRAFFIC_SEGMENTS: TrafficSegment[] = [
  {
    id: 'seg-1',
    roadName: 'NH-167 Corridor',
    zone: 'Zone 4',
    density: 'Severe',
    avgSpeedKmh: 18,
    incidentRiskPercent: 88,
    status: 'Critical',
    congestionIndex: 89,
    historicalIncidents: 24,
    lanes: 4
  },
  {
    id: 'seg-2',
    roadName: 'Station Road',
    zone: 'Zone 2',
    density: 'Moderate',
    avgSpeedKmh: 32,
    incidentRiskPercent: 42,
    status: 'Normal',
    congestionIndex: 45,
    historicalIncidents: 11,
    lanes: 3
  },
  {
    id: 'seg-3',
    roadName: 'Market Road',
    zone: 'Zone 3',
    density: 'Severe',
    avgSpeedKmh: 11,
    incidentRiskPercent: 85,
    status: 'Critical',
    congestionIndex: 92,
    historicalIncidents: 31,
    lanes: 2
  },
  {
    id: 'seg-4',
    roadName: 'Ring Road Expressway',
    zone: 'Zone 1',
    density: 'Low',
    avgSpeedKmh: 68,
    incidentRiskPercent: 18,
    status: 'Normal',
    congestionIndex: 20,
    historicalIncidents: 6,
    lanes: 6
  },
  {
    id: 'seg-5',
    roadName: 'Hospital Link Road',
    zone: 'Zone 1',
    density: 'Moderate',
    avgSpeedKmh: 38,
    incidentRiskPercent: 35,
    status: 'Normal',
    congestionIndex: 38,
    historicalIncidents: 8,
    lanes: 3
  },
  {
    id: 'seg-6',
    roadName: 'Civic Lines Boulevard',
    zone: 'Zone 2',
    density: 'Heavy',
    avgSpeedKmh: 24,
    incidentRiskPercent: 62,
    status: 'At Risk',
    congestionIndex: 68,
    historicalIncidents: 15,
    lanes: 4
  }
];

export const MOCK_EMERGENCY_VEHICLES: EmergencyVehicle[] = [
  {
    id: 'veh-1',
    callSign: 'A102',
    type: 'Ambulance',
    status: 'En Route',
    currentLocationName: 'District Hospital',
    lat: 17.395,
    lng: 78.472,
    destinationName: 'Government Medical College',
    destLat: 17.368,
    destLng: 78.508,
    etaMinutes: 8,
    currentRouteId: 'route-a',
    driverName: 'Rajesh Kumar',
    contactNumber: '+91 98765 43210',
    unitCode: 'EMS-HYD-04'
  },
  {
    id: 'veh-2',
    callSign: 'F204',
    type: 'Fire Truck',
    status: 'Available',
    currentLocationName: 'Central Fire Station',
    lat: 17.402,
    lng: 78.480,
    destinationName: '—',
    etaMinutes: 0,
    driverName: 'Suresh Verma',
    contactNumber: '+91 98765 11223',
    unitCode: 'FIRE-SEC-02'
  },
  {
    id: 'veh-3',
    callSign: 'P301',
    type: 'Police Vehicle',
    status: 'En Route',
    currentLocationName: 'City Police HQ',
    lat: 17.378,
    lng: 78.492,
    destinationName: 'NH-167 Incident Zone',
    destLat: 17.388,
    destLng: 78.515,
    etaMinutes: 5,
    currentRouteId: 'route-police-1',
    driverName: 'Insp. Vikram Singh',
    contactNumber: '+91 98765 99887',
    unitCode: 'PATROL-UNIT-09'
  },
  {
    id: 'veh-4',
    callSign: 'A104',
    type: 'Ambulance',
    status: 'On Scene',
    currentLocationName: 'Station Road Flyover',
    lat: 17.398,
    lng: 78.482,
    destinationName: 'District Hospital',
    destLat: 17.395,
    destLng: 78.472,
    etaMinutes: 4,
    driverName: 'Anil Sharma',
    contactNumber: '+91 98765 33445',
    unitCode: 'EMS-HYD-08'
  },
  {
    id: 'veh-5',
    callSign: 'P302',
    type: 'Police Vehicle',
    status: 'En Route',
    currentLocationName: 'Civic Lines',
    lat: 17.375,
    lng: 78.478,
    destinationName: 'Main Market Square',
    destLat: 17.375,
    destLng: 78.478,
    etaMinutes: 3,
    driverName: 'Sub-Insp. Priya Das',
    contactNumber: '+91 98765 55667',
    unitCode: 'TRAFFIC-CELL-03'
  }
];

export const MOCK_SYSTEM_ALERTS: SystemAlert[] = [
  {
    id: 'alt-1',
    title: 'High Incident Probability Detected',
    message: 'Predicted 88% crash probability on NH-167 Junction due to rain and heavy truck density.',
    severity: 'Critical',
    timeAgo: '2m ago',
    location: 'NH-167 Corridor',
    read: false
  },
  {
    id: 'alt-2',
    title: 'Ambulance #A102 Dynamic Reroute Recommended',
    message: 'Primary route blocked near Market Square. Rerouting via Ring Road Bypass saves 2m 45s.',
    severity: 'High',
    timeAgo: '5m ago',
    location: 'District Hospital to Med College',
    read: false
  },
  {
    id: 'alt-3',
    title: 'Flash Rainfall Warning',
    message: 'Heavy precipitation in Zone 4 (42mm/hr). Hydrolock risk elevated on underpasses.',
    severity: 'High',
    timeAgo: '12m ago',
    location: 'Zone 4 Infrastructure',
    read: true
  },
  {
    id: 'alt-4',
    title: 'Traffic Diversion Active',
    message: 'Road blockage reported near Main Market. Traffic constables notified.',
    severity: 'Moderate',
    timeAgo: '22m ago',
    location: 'Main Market Square',
    read: true
  }
];

export const CURRENT_WEATHER: WeatherCondition = {
  temperatureC: 28,
  condition: 'Rainy',
  rainfallMm: 34,
  visibilityKm: 3.8,
  windSpeedKmh: 22,
  updatedAt: '10:35 AM'
};

export const DEFAULT_PREDICTION_INPUT: PredictionInput = {
  locationName: 'NH-167 Express Junction',
  trafficDensity: 'Heavy',
  avgSpeed: 22,
  weatherCondition: 'Rainy',
  rainfallMm: 38,
  visibilityKm: 3.5,
  timeOfDay: 'Morning Peak',
  dayType: 'Weekday',
  historicalIncidentCount: 22,
  roadCondition: 'Poor'
};
