import {
  PredictionInput,
  PredictionResult,
  SeverityLevel,
  IncidentType,
  ContributingFactor
} from '../types';

/**
 * Deterministic Transparent Risk Scoring Function for TRAFFIX AI Prototype
 * 
 * Formula Weightings:
 * - Traffic Density: 25%
 * - Historical Incident Count: 20%
 * - Weather & Rainfall: 25% (Weather 15% + Rainfall 10%)
 * - Road Condition: 15%
 * - Visibility: 10%
 * - Time / Day Factor: 5%
 */
export function calculateIncidentRisk(input: PredictionInput): PredictionResult {
  // 1. Traffic Density Score (0 - 100)
  let trafficScore = 20;
  if (input.trafficDensity === 'Moderate') trafficScore = 50;
  if (input.trafficDensity === 'Heavy') trafficScore = 80;
  if (input.trafficDensity === 'Severe') trafficScore = 100;

  // 2. Historical Incident Score
  const historicalScore = Math.min(100, Math.round((input.historicalIncidentCount / 30) * 100));

  // 3. Weather Score
  let weatherScore = 15;
  if (input.weatherCondition === 'Foggy') weatherScore = 55;
  if (input.weatherCondition === 'Rainy') weatherScore = 78;
  if (input.weatherCondition === 'Stormy') weatherScore = 95;

  // Rainfall factor (0-100)
  const rainfallScore = Math.min(100, Math.round((input.rainfallMm / 60) * 100));
  const combinedWeatherScore = Math.round(weatherScore * 0.6 + rainfallScore * 0.4);

  // 4. Road Condition Score
  let roadScore = 20;
  if (input.roadCondition === 'Fair') roadScore = 45;
  if (input.roadCondition === 'Under Construction') roadScore = 75;
  if (input.roadCondition === 'Poor') roadScore = 90;

  // 5. Visibility Score (Inverted: low visibility = high risk score)
  // Max visibility assumed 10km. 0km = 100 risk, 10km = 0 risk
  const visibilityScore = Math.max(0, Math.min(100, Math.round(((10 - input.visibilityKm) / 10) * 100)));

  // 6. Time/Day Score
  let timeScore = 30;
  if (input.timeOfDay === 'Morning Peak' || input.timeOfDay === 'Evening Peak') timeScore = 85;
  if (input.timeOfDay === 'Late Night') timeScore = 65; // Night fatigue
  if (input.dayType === 'Public Holiday') timeScore += 10;

  // Weighted Sum Calculation
  const totalRiskScore = Math.min(
    99,
    Math.max(
      5,
      Math.round(
        trafficScore * 0.25 +
        historicalScore * 0.20 +
        combinedWeatherScore * 0.25 +
        roadScore * 0.15 +
        visibilityScore * 0.10 +
        timeScore * 0.05
      )
    )
  );

  // Categorize Risk Level
  let riskLevel: SeverityLevel = 'Low';
  if (totalRiskScore >= 30 && totalRiskScore < 50) riskLevel = 'Moderate';
  if (totalRiskScore >= 50 && totalRiskScore < 75) riskLevel = 'High';
  if (totalRiskScore >= 75) riskLevel = 'Critical';

  // Determine Predicted Incident Type
  let predictedIncidentType: IncidentType = 'Heavy Congestion';
  if (combinedWeatherScore > 70 && visibilityScore > 60) {
    predictedIncidentType = 'Weather Hazard';
  } else if (roadScore > 70 && trafficScore > 70) {
    predictedIncidentType = 'Accident';
  } else if (roadScore > 80) {
    predictedIncidentType = 'Road Blockage';
  } else if (trafficScore > 75) {
    predictedIncidentType = 'Heavy Congestion';
  } else if (totalRiskScore > 70) {
    predictedIncidentType = 'Accident';
  }

  // Contributing factors array for UI visualization
  const contributingFactors: ContributingFactor[] = [
    {
      name: 'Traffic Density',
      score: trafficScore,
      impact: trafficScore > 70 ? 'High' : trafficScore > 40 ? 'Moderate' : 'Low',
      description: `${input.trafficDensity} traffic volume with avg speed ${input.avgSpeed} km/h.`
    },
    {
      name: 'Weather & Precipitation',
      score: combinedWeatherScore,
      impact: combinedWeatherScore > 70 ? 'High' : combinedWeatherScore > 40 ? 'Moderate' : 'Low',
      description: `${input.weatherCondition} conditions with ${input.rainfallMm} mm rainfall.`
    },
    {
      name: 'Historical Incident Frequency',
      score: historicalScore,
      impact: historicalScore > 65 ? 'High' : historicalScore > 35 ? 'Moderate' : 'Low',
      description: `${input.historicalIncidentCount} recorded accidents/blockages past 90 days.`
    },
    {
      name: 'Road Infrastructure Quality',
      score: roadScore,
      impact: roadScore > 65 ? 'High' : roadScore > 35 ? 'Moderate' : 'Low',
      description: `Road rated '${input.roadCondition}' with potential traction loss.`
    },
    {
      name: 'Reduced Visibility',
      score: visibilityScore,
      impact: visibilityScore > 60 ? 'High' : visibilityScore > 30 ? 'Moderate' : 'Low',
      description: `Sight range constrained to ${input.visibilityKm} km.`
    }
  ];

  // AI Explainability Generation
  let explanation = `Risk score of ${totalRiskScore}% is driven primarily by `;
  const highFactors = contributingFactors.filter(f => f.score >= 60);
  if (highFactors.length > 0) {
    explanation += highFactors.map(f => f.name.toLowerCase()).join(' and ') + '. ';
  } else {
    explanation += 'normal baseline road factors with manageable traffic. ';
  }
  explanation += `Historical data indicates higher probability of ${predictedIncidentType.toLowerCase()} during ${input.timeOfDay.toLowerCase()} hours under ${input.weatherCondition.toLowerCase()} weather.`;

  return {
    riskScorePercent: totalRiskScore,
    riskLevel,
    predictedIncidentType,
    confidencePercent: Math.min(94, Math.max(78, 80 + Math.round((historicalScore / 100) * 12))),
    contributingFactors,
    explanation,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSimulated: true
  };
}
