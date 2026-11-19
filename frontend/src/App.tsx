import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { MetricsCards } from './components/MetricsCards';
import { CytoscapeCanvas } from './components/CytoscapeCanvas';
import { SimulationControls } from './components/SimulationControls';
import { EventTimeline } from './components/EventTimeline';
import { DisconnectionAlert } from './components/DisconnectionAlert';
import { CriticalAnalysisModal } from './components/CriticalAnalysisModal';
import {
  fetchTopology,
  computeRoute,
  failSatellite,
  recoverSatellite,
  resetNetwork,
  fetchResilienceMetrics,
  fetchCriticalComponents,
  fetchEvents,
  fetchScenarios,
  loadScenario,
} from './api';
import {
  TopologyResponse,
  RouteResponse,
  ResilienceMetrics,
  CriticalComponents,
  SimulationEvent,
  ScenarioItem,
} from './types';

export const App: React.FC = () => {
  const [topology, setTopology] = useState<TopologyResponse | null>(null);
  const [activeRoute, setActiveRoute] = useState<RouteResponse | null>(null);
  const [metrics, setMetrics] = useState<ResilienceMetrics | null>(null);
  const [events, setEvents] = useState<SimulationEvent[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioItem[]>([]);
  const [criticalData, setCriticalData] = useState<CriticalComponents | null>(null);

  const [selectedSource, setSelectedSource] = useState<number>(1);
  const [selectedTarget, setSelectedTarget] = useState<number>(5);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initial data loading
  useEffect(() => {
    refreshAllData();
    loadScenariosList();
  }, []);

  const refreshAllData = async () => {
    try {
      setIsLoading(true);
      const [topoData, metricsData, eventsData] = await Promise.all([
        fetchTopology(),
        fetchResilienceMetrics(),
        fetchEvents(),
      ]);
      setTopology(topoData);
      setMetrics(metricsData);
      setEvents(eventsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadScenariosList = async () => {
    try {
      const scenList = await fetchScenarios();
      setScenarios(scenList);
    } catch (err) {
      console.error('Error loading scenarios:', err);
    }
  };

  const handleCalculateRoute = async () => {
    try {
      setIsLoading(true);
      const route = await computeRoute(selectedSource, selectedTarget);
      setActiveRoute(route);
      const [metricsData, eventsData] = await Promise.all([
        fetchResilienceMetrics(),
        fetchEvents(),
      ]);
      setMetrics(metricsData);
      setEvents(eventsData);
    } catch (err) {
      console.error('Failed to compute route:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleNodeFailure = async (nodeId: number, isCurrentlyFailed: boolean) => {
    try {
      setIsLoading(true);
      let res;
      if (isCurrentlyFailed) {
        res = await recoverSatellite(nodeId);
      } else {
        res = await failSatellite(nodeId);
      }

      if (res.recovered_route) {
        setActiveRoute(res.recovered_route);
      } else if (activeRoute) {
        // Recompute route if active
        try {
          const updatedRoute = await computeRoute(selectedSource, selectedTarget);
          setActiveRoute(updatedRoute);
        } catch {
          // Path might be disconnected
        }
      }

      await refreshAllData();
    } catch (err) {
      console.error('Error toggling node failure:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateRandomFailure = async () => {
    if (!topology) return;
    const operationalNodes = topology.nodes.filter((n) => n.status === 'OPERATIONAL');
    if (operationalNodes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * operationalNodes.length);
    const targetNode = operationalNodes[randomIndex];
    await handleToggleNodeFailure(targetNode.id, false);
  };

  const handleResetNetwork = async () => {
    try {
      setIsLoading(true);
      const res = await resetNetwork();
      if (res.route) {
        setActiveRoute(res.route);
      } else if (activeRoute) {
        const resetRoute = await computeRoute(selectedSource, selectedTarget);
        setActiveRoute(resetRoute);
      }
      await refreshAllData();
    } catch (err) {
      console.error('Error resetting network:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectScenario = async (scenarioId: string) => {
    try {
      setIsLoading(true);
      const res = await loadScenario(scenarioId);
      setTopology(res.topology);
      setSelectedSource(1);
      setSelectedTarget(res.topology.nodes.length >= 5 ? 5 : res.topology.nodes.length);
      setActiveRoute(null);
      await refreshAllData();
    } catch (err) {
      console.error('Error loading scenario:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAnalysis = async () => {
    try {
      const data = await fetchCriticalComponents();
      setCriticalData(data);
      setIsAnalysisOpen(true);
    } catch (err) {
      console.error('Error fetching critical components:', err);
    }
  };

  return (
    <div className="min-h-screen bg-space-900 text-slate-100 flex flex-col font-sans">
      <Navbar
        metrics={metrics}
        onReset={handleResetNetwork}
        onOpenAnalysis={handleOpenAnalysis}
        isLoading={isLoading}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* KPI Metrics Strip */}
        <MetricsCards metrics={metrics} activeRoute={activeRoute} />

        {/* Network Disconnection Banner */}
        {activeRoute && !activeRoute.is_reachable && (
          <DisconnectionAlert
            message={activeRoute.message}
            onReset={handleResetNetwork}
          />
        )}

        {/* Main Simulation Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Canvas (7 Columns on large screens) */}
          <div className="lg:col-span-7">
            <CytoscapeCanvas
              topology={topology}
              activeRoute={activeRoute}
              selectedSource={selectedSource}
              selectedTarget={selectedTarget}
              onNodeClick={(id) => handleToggleNodeFailure(id, false)}
            />
          </div>

          {/* Right Controls & History (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <SimulationControls
              topology={topology}
              activeRoute={activeRoute}
              scenarios={scenarios}
              selectedSource={selectedSource}
              selectedTarget={selectedTarget}
              onSelectSource={setSelectedSource}
              onSelectTarget={setSelectedTarget}
              onCalculateRoute={handleCalculateRoute}
              onToggleNodeFailure={handleToggleNodeFailure}
              onSimulateRandomFailure={handleSimulateRandomFailure}
              onSelectScenario={handleSelectScenario}
              isLoading={isLoading}
            />

            <EventTimeline events={events} />
          </div>
        </div>
      </main>

      {/* Critical Components Vulnerability Modal */}
      <CriticalAnalysisModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
        criticalData={criticalData}
        topology={topology}
      />

      <footer className="border-t border-space-800 bg-space-900 py-4 text-center text-xs text-slate-500">
        <p>
          SatNexus: Graph-Based Satellite Communication Network Resilience & Failure Recovery
        </p>
        <p className="mt-1 text-[11px] text-slate-600">
          Course: Agile Software Development (B.Tech 5th Sem, Odd 2026) | Evaluated November 21, 2026
        </p>
      </footer>
    </div>
  );
};

export default App;
