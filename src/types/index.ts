export type IncidentType = 'Accident' | 'Road Blockage' | 'Heavy Congestion' | 'Weather Hazard';
export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type VehicleType = 'Ambulance' | 'Fire Truck' | 'Police Vehicle';
export type VehicleStatus = 'En Route' | 'Available' | 'On Scene' | 'Maintenance';
export type PriorityLevel = 'Critical' | 'High' | 'Normal';

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  zone?: string;
}

export interface Incident {
  id: string;
  locationName: string;
  lat: number;
  lng: number;
  type: IncidentType;
  severity: SeverityLevel;
  timestamp: string;
  status: 'Active' | 'Monitoring' | 'Resolved';
  riskScore: number;
  affectedRoads: string[];
  nearbyVehicles: string[];
  description: string;
  recommendedAction: string;
}

export interface TrafficSegment {
  id: string;
  roadName: string;
  zone: string;
  density: 'Low' | 'Moderate' | 'Heavy' | 'Severe';
  avgSpeedKmh: number;
  incidentRiskPercent: number;
  status: 'Normal' | 'At Risk' | 'Critical' | 'Blocked';
  congestionIndex: number; // 0 - 100
  historicalIncidents: number;
  lanes: number;
}

export interface EmergencyVehicle {
  id: string;
  callSign: string;
  type: VehicleType;
  status: VehicleStatus;
  currentLocationName: string;
  lat: number;
  lng: number;
  destinationName?: string;
  destLat?: number;
  destLng?: number;
  etaMinutes?: number;
  currentRouteId?: string;
  driverName: string;
  contactNumber: string;
  unitCode: string;
}

export interface RouteOption {
  id: string;
  name: string;
  etaSeconds: number;
  etaFormatted: string;
  distanceKm: number;
  trafficLevel: 'Low' | 'Moderate' | 'Heavy' | 'Severe';
  riskLevel: SeverityLevel;
  priorityScore: number; // 0-100 score calculated by multi-factor engine
  pathCoordinates: [number, number][]; // [lat, lng] points
  waypoints: string[];
  hasBlockage?: boolean;
  blockageDetails?: string;
  keyFeatures: string[];
}

export interface PredictionInput {
  locationName: string;
  trafficDensity: 'Low' | 'Moderate' | 'Heavy' | 'Severe';
  avgSpeed: number; // km/h
  weatherCondition: 'Clear' | 'Rainy' | 'Foggy' | 'Stormy';
  rainfallMm: number; // mm
  visibilityKm: number; // km
  timeOfDay: 'Morning Peak' | 'Afternoon' | 'Evening Peak' | 'Night' | 'Late Night';
  dayType: 'Weekday' | 'Weekend' | 'Public Holiday';
  historicalIncidentCount: number;
  roadCondition: 'Good' | 'Fair' | 'Poor' | 'Under Construction';
}

export interface ContributingFactor {
  name: string;
  score: number; // 0-100
  impact: 'High' | 'Moderate' | 'Low';
  description: string;
}

export interface PredictionResult {
  riskScorePercent: number;
  riskLevel: SeverityLevel;
  predictedIncidentType: IncidentType;
  confidencePercent: number;
  contributingFactors: ContributingFactor[];
  explanation: string;
  timestamp: string;
  isSimulated: boolean;
}

export interface SystemAlert {
  id: string;
  title: string;
  message: string;
  severity: SeverityLevel;
  timeAgo: string;
  location?: string;
  read: boolean;
}

export interface WeatherCondition {
  temperatureC: number;
  condition: 'Clear' | 'Rainy' | 'Foggy' | 'Stormy';
  rainfallMm: number;
  visibilityKm: number;
  windSpeedKmh: number;
  updatedAt: string;
}
