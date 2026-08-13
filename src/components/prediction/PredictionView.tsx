import React, { useState } from 'react';
import {
  BrainCircuit,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  BarChart2,
  Sliders,
  CheckCircle2,
  Info,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { PredictionInput, PredictionResult } from '../../types';
import { DEFAULT_PREDICTION_INPUT } from '../../data/mockData';
import { calculateIncidentRisk } from '../../services/predictionEngine';

export const PredictionView: React.FC = () => {
  const [input, setInput] = useState<PredictionInput>(DEFAULT_PREDICTION_INPUT);
  const [result, setResult] = useState<PredictionResult>(calculateIncidentRisk(DEFAULT_PREDICTION_INPUT));
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field: keyof PredictionInput, value: any) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = calculateIncidentRisk(input);
      setResult(res);
      setIsAnalyzing(false);
    }, 400); // realistic UI reaction delay
  };

  // Preset Scenario Loaders
  const loadPreset = (presetName: string) => {
    if (presetName === 'nh167') {
      const scenario: PredictionInput = {
        locationName: 'NH-167 Express Junction',
        trafficDensity: 'Severe',
        avgSpeed: 18,
        weatherCondition: 'Rainy',
        rainfallMm: 45,
        visibilityKm: 2.8,
        timeOfDay: 'Morning Peak',
        dayType: 'Weekday',
        historicalIncidentCount: 28,
        roadCondition: 'Poor'
      };
      setInput(scenario);
      setResult(calculateIncidentRisk(scenario));
    } else if (presetName === 'market') {
      const scenario: PredictionInput = {
        locationName: 'Main Market Square',
        trafficDensity: 'Heavy',
        avgSpeed: 12,
        weatherCondition: 'Clear',
        rainfallMm: 0,
        visibilityKm: 8.5,
        timeOfDay: 'Evening Peak',
        dayType: 'Weekend',
        historicalIncidentCount: 19,
        roadCondition: 'Under Construction'
      };
      setInput(scenario);
      setResult(calculateIncidentRisk(scenario));
    } else if (presetName === 'ringroad') {
      const scenario: PredictionInput = {
        locationName: 'Outer Ring Road Expressway',
        trafficDensity: 'Low',
        avgSpeed: 65,
        weatherCondition: 'Clear',
        rainfallMm: 0,
        visibilityKm: 10,
        timeOfDay: 'Afternoon',
        dayType: 'Weekday',
        historicalIncidentCount: 4,
        roadCondition: 'Good'
      };
      setInput(scenario);
      setResult(calculateIncidentRisk(scenario));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-wide">
              AI Incident Prediction
            </h2>
          </div>
          <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20 font-bold uppercase">
            XGBoost / ML Model Pipeline (Prototype)
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Predict potential traffic incidents before they occur using real-time traffic density, precipitation radar, road infrastructure quality, and historical accident patterns.
        </p>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 pt-2 text-xs flex-wrap">
          <span className="text-slate-500 font-mono text-[11px] uppercase tracking-wider">Load Test Scenarios:</span>
          <button
            onClick={() => loadPreset('nh167')}
            className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-[11px] uppercase font-mono transition"
          >
            NH-167 High Risk (88%)
          </button>
          <button
            onClick={() => loadPreset('market')}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 font-bold text-[11px] uppercase font-mono transition"
          >
            Market Square Blockage (78%)
          </button>
          <button
            onClick={() => loadPreset('ringroad')}
            className="px-2.5 py-1 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 font-bold text-[11px] uppercase font-mono transition"
          >
            Ring Road Clear (18%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 font-sans">
              <Sliders className="w-4 h-4 text-blue-400" /> Environmental & Traffic Variables
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase">10 Parameters</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Location / Road Name */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Road Corridor</label>
              <select
                value={input.locationName}
                onChange={(e) => handleInputChange('locationName', e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="NH-167 Express Junction">NH-167 Express Junction</option>
                <option value="Main Market Square">Main Market Square</option>
                <option value="Station Road Flyover">Station Road Flyover</option>
                <option value="Outer Ring Road Expressway">Outer Ring Road Expressway</option>
                <option value="University Circle">University Circle</option>
                <option value="Hospital Link Boulevard">Hospital Link Boulevard</option>
              </select>
            </div>

            {/* Traffic Density & Avg Speed */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Traffic Density</label>
                <select
                  value={input.trafficDensity}
                  onChange={(e) => handleInputChange('trafficDensity', e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Heavy">Heavy</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Avg Speed ({input.avgSpeed} km/h)</label>
                <input
                  type="range"
                  min="5"
                  max="90"
                  value={input.avgSpeed}
                  onChange={(e) => handleInputChange('avgSpeed', Number(e.target.value))}
                  className="w-full accent-blue-500 mt-2"
                />
              </div>
            </div>

            {/* Weather & Rainfall */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Weather Condition</label>
                <select
                  value={input.weatherCondition}
                  onChange={(e) => handleInputChange('weatherCondition', e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="Clear">Clear</option>
                  <option value="Rainy">Rainy</option>
                  <option value="Foggy">Foggy</option>
                  <option value="Stormy">Stormy</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Precipitation ({input.rainfallMm} mm/hr)</label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={input.rainfallMm}
                  onChange={(e) => handleInputChange('rainfallMm', Number(e.target.value))}
                  className="w-full accent-blue-500 mt-2"
                />
              </div>
            </div>

            {/* Visibility & Time of Day */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Visibility ({input.visibilityKm} km)</label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={input.visibilityKm}
                  onChange={(e) => handleInputChange('visibilityKm', Number(e.target.value))}
                  className="w-full accent-blue-500 mt-2"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Time Window</label>
                <select
                  value={input.timeOfDay}
                  onChange={(e) => handleInputChange('timeOfDay', e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="Morning Peak">Morning Peak</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening Peak">Evening Peak</option>
                  <option value="Night">Night</option>
                  <option value="Late Night">Late Night</option>
                </select>
              </div>
            </div>

            {/* Historical Incidents & Road Condition */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Past Incidents (Past 90d)</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={input.historicalIncidentCount}
                  onChange={(e) => handleInputChange('historicalIncidentCount', Number(e.target.value))}
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Road Condition</label>
                <select
                  value={input.roadCondition}
                  onChange={(e) => handleInputChange('roadCondition', e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                >
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>
            </div>

            {/* Action Submit Button */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 mt-2"
            >
              <BrainCircuit className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Running Model Scoring...' : 'Analyze Incident Risk'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Prediction Results & Explainability Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Risk Score Card */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Target: {input.locationName}</span>
                <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider font-sans">Prediction Assessment</h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono uppercase">
                Prototype Score
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Risk Gauge Box */}
              <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 text-center space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider font-bold">INCIDENT RISK SCORE</div>
                <div className={`text-4xl font-black font-mono ${
                  result.riskScorePercent >= 75
                    ? 'text-red-500'
                    : result.riskScorePercent >= 50
                    ? 'text-amber-400'
                    : 'text-green-400'
                }`}>
                  {result.riskScorePercent}%
                </div>
                <div className="pt-1">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                    result.riskLevel === 'Critical'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse'
                      : result.riskLevel === 'High'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : result.riskLevel === 'Moderate'
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      : 'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {result.riskLevel} RISK
                  </span>
                </div>
              </div>

              {/* Predicted Incident Type & Confidence */}
              <div className="md:col-span-2 space-y-2 p-3.5 rounded-xl bg-[#0f172a] border border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Predicted Incident Type:</span>
                  <span className="font-bold text-blue-400 font-sans text-sm">{result.predictedIncidentType}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Model Confidence:</span>
                  <span className="font-bold font-mono text-green-400">{result.confidencePercent}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Scoring Engine:</span>
                  <span className="font-mono text-slate-300">Weighted Risk Matrix v1.0</span>
                </div>
              </div>
            </div>

            {/* Explainability Section: "Why is this area at risk?" */}
            <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                <span>Why is this area at risk? (AI Explainability)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                "{result.explanation}"
              </p>

              {/* Horizontal Risk Factor Visualization Meters required in Prompt */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                  Contributing Risk Factor Weights
                </span>

                {result.contributingFactors.map((factor, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">{factor.name}</span>
                      <span className="font-mono text-blue-400 font-bold">{factor.score}%</span>
                    </div>
                    {/* Visual Meter Bar */}
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          factor.score >= 75
                            ? 'bg-red-500'
                            : factor.score >= 50
                            ? 'bg-amber-400'
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prototype / Production Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] block">Prototype ML Model Architecture Note</span>
              <p className="text-[11px] leading-relaxed">
                This hackathon prototype evaluates deterministic risk factors. For full deployment, the system connects to a trained XGBoost / Random Forest classifier trained on 5+ years of urban accident history and live weather radar telemetry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
