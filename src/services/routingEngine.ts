import { RouteOption, PriorityLevel, VehicleType } from '../types';

export interface RouteEvaluationResult {
  routes: RouteOption[];
  recommendedRouteId: string;
  recommendationReason: string;
  isSimulatedIncidentActive: boolean;
  activeSimulatedIncidentText?: string;
}

// Coordinate paths for map rendering [lat, lng]
const ROUTE_A_PATH: [number, number][] = [
  [17.395, 78.472], // District Hospital
  [17.390, 78.480],
  [17.382, 78.488], // Via City Center / Main Market corridor
  [17.375, 78.498],
  [17.368, 78.508]  // Medical College
];

const ROUTE_B_PATH: [number, number][] = [
  [17.395, 78.472], // District Hospital
  [17.408, 78.485], // Bypass via Northern Expressway
  [17.412, 78.502], // Ring Road
  [17.390, 78.512],
  [17.368, 78.508]  // Medical College
];

const ROUTE_C_PATH: [number, number][] = [
  [17.395, 78.472], // District Hospital
  [17.388, 78.475],
  [17.378, 78.482], // Direct Old City Avenue (high density)
  [17.372, 78.490],
  [17.368, 78.508]  // Medical College
];

const ROUTE_REROUTED_A_PATH: [number, number][] = [
  [17.395, 78.472], // District Hospital
  [17.390, 78.480],
  [17.398, 78.495], // Emergency Slip Road Detour avoiding Market Square accident
  [17.385, 78.505],
  [17.368, 78.508]  // Medical College
];

export function evaluateRoutes(
  vehicleType: VehicleType,
  startLocation: string,
  destination: string,
  priority: PriorityLevel,
  isIncidentSimulated: boolean = false
): RouteEvaluationResult {
  if (isIncidentSimulated) {
    // Incident simulated on original Route A!
    const routes: RouteOption[] = [
      {
        id: 'route-a',
        name: 'Route A (Original via Market Road - BLOCKED)',
        etaSeconds: 545, // 9m 05s
        etaFormatted: '9m 05s',
        distanceKm: 5.8,
        trafficLevel: 'Severe',
        riskLevel: 'Critical',
        priorityScore: 52,
        pathCoordinates: ROUTE_A_PATH,
        waypoints: ['Hospital Link', 'Market Square (Accident)', 'University Gate'],
        hasBlockage: true,
        blockageDetails: '⚠ Multi-vehicle crash reported at Market Square 2m ago.',
        keyFeatures: ['Blocked at Km 2.4', 'High congestion delay (+2m 10s)']
      },
      {
        id: 'route-b',
        name: 'Route B (Recommended - Ring Road Expressway Bypass)',
        etaSeconds: 460, // 7m 40s
        etaFormatted: '7m 40s',
        distanceKm: 6.3,
        trafficLevel: 'Low',
        riskLevel: 'Low',
        priorityScore: 94,
        pathCoordinates: ROUTE_B_PATH,
        waypoints: ['Hospital Link', 'Northern Ring Expressway', 'East Gate Flyover'],
        hasBlockage: false,
        keyFeatures: ['Clear expressway lanes', 'Signal-priority override enabled', 'Lowest hazard risk']
      },
      {
        id: 'route-c',
        name: 'Route C (Detour Slip Road)',
        etaSeconds: 535, // 8m 55s
        etaFormatted: '8m 55s',
        distanceKm: 6.1,
        trafficLevel: 'Moderate',
        riskLevel: 'Moderate',
        priorityScore: 78,
        pathCoordinates: ROUTE_REROUTED_A_PATH,
        waypoints: ['Hospital Link', 'Station Flyover Slip', 'University Gate'],
        hasBlockage: false,
        keyFeatures: ['Bypasses Market Square crash', 'Moderate bottleneck near flyover']
      }
    ];

    return {
      routes,
      recommendedRouteId: 'route-b',
      recommendationReason: 'Automated dynamic reroute triggered. Route B avoids the active crash at Market Square, saving 1m 25s over Route A with zero hazard bottlenecks.',
      isSimulatedIncidentActive: true,
      activeSimulatedIncidentText: '⚠ Multi-vehicle collision detected on Route A (Market Square). Dynamic rerouting active.'
    };
  }

  // Standard Normal State
  const routes: RouteOption[] = [
    {
      id: 'route-a',
      name: 'Route A (Primary Express Corridor)',
      etaSeconds: 500, // 8m 20s
      etaFormatted: '8m 20s',
      distanceKm: 5.8,
      trafficLevel: 'Moderate',
      riskLevel: 'Low',
      priorityScore: 92,
      pathCoordinates: ROUTE_A_PATH,
      waypoints: ['Hospital Link', 'Central Boulevard', 'University Gate'],
      hasBlockage: false,
      keyFeatures: ['Optimum balance of speed & risk', 'Traffic signal preemptive green wave active', 'Wide emergency shoulder']
    },
    {
      id: 'route-b',
      name: 'Route B (Ring Road Expressway)',
      etaSeconds: 460, // 7m 40s
      etaFormatted: '7m 40s',
      distanceKm: 6.3,
      trafficLevel: 'Low',
      riskLevel: 'Moderate',
      priorityScore: 89,
      pathCoordinates: ROUTE_B_PATH,
      waypoints: ['Hospital Link', 'Northern Ring Expressway', 'East Gate Flyover'],
      hasBlockage: false,
      keyFeatures: ['Shortest travel time', 'Slightly higher speed variance', '0.5 km longer distance']
    },
    {
      id: 'route-c',
      name: 'Route C (Old City Avenue Direct)',
      etaSeconds: 615, // 10m 15s
      etaFormatted: '10m 15s',
      distanceKm: 5.1,
      trafficLevel: 'Heavy',
      riskLevel: 'High',
      priorityScore: 63,
      pathCoordinates: ROUTE_C_PATH,
      waypoints: ['Hospital Link', 'Old City Market', 'University Gate'],
      hasBlockage: false,
      keyFeatures: ['Shortest physical distance', 'Heavy pedestrian and market congestion', 'High crash probability zone']
    }
  ];

  // For Critical priority, Route A gets highest balance recommendation
  let recId = 'route-a';
  let reason = 'Route A provides the optimal balance of travel time (8m 20s), smooth traffic flow, and lowest incident risk profile.';

  if (priority === 'Critical') {
    recId = 'route-a';
    reason = 'For Critical priority, Route A is selected over Route B because it possesses active signal preemption clearance and wider emergency shoulders, despite Route B being 40s shorter.';
  } else if (priority === 'Normal') {
    recId = 'route-b';
    reason = 'For Normal priority, Route B is recommended as it offers the fastest ETA (7m 40s) on clear expressway lanes.';
  }

  return {
    routes,
    recommendedRouteId: recId,
    recommendationReason: reason,
    isSimulatedIncidentActive: false
  };
}
