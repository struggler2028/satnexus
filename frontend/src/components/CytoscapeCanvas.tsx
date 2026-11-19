import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { TopologyResponse, RouteResponse } from '../types';

interface CytoscapeCanvasProps {
  topology: TopologyResponse | null;
  activeRoute: RouteResponse | null;
  selectedSource: number;
  selectedTarget: number;
  onNodeClick: (nodeId: number) => void;
}

export const CytoscapeCanvas: React.FC<CytoscapeCanvasProps> = ({
  topology,
  activeRoute,
  selectedSource,
  selectedTarget,
  onNodeClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Cytoscape core
    const cy = cytoscape({
      container: containerRef.current,
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#f8fafc',
            'font-size': '11px',
            'font-weight': 'bold',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'background-color': '#10b981',
            'width': 32,
            'height': 32,
            'border-width': 2,
            'border-color': '#047857',
            'transition-property': 'background-color, border-color, width, height',
            'transition-duration': 0.3,
          },
        },
        {
          selector: 'node[status = "FAILED"]',
          style: {
            'background-color': '#ef4444',
            'border-color': '#991b1b',
            'border-width': 3,
            'opacity': 0.85,
          },
        },
        {
          selector: 'node.source-node',
          style: {
            'border-color': '#38bdf8',
            'border-width': 4,
            'width': 38,
            'height': 38,
          },
        },
        {
          selector: 'node.target-node',
          style: {
            'border-color': '#f43f5e',
            'border-width': 4,
            'width': 38,
            'height': 38,
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#334155',
            'curve-style': 'bezier',
            'label': 'data(latency)',
            'font-size': '9px',
            'color': '#94a3b8',
            'text-background-color': '#0f172a',
            'text-background-opacity': 0.8,
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle',
          },
        },
        {
          selector: 'edge[status = "FAILED"]',
          style: {
            'line-color': '#7f1d1d',
            'line-style': 'dashed',
            'opacity': 0.5,
          },
        },
        {
          selector: 'edge.route-primary',
          style: {
            'line-color': '#3b82f6',
            'width': 4,
            'z-index': 10,
          },
        },
        {
          selector: 'edge.route-recovered',
          style: {
            'line-color': '#a855f7',
            'width': 4,
            'z-index': 10,
          },
        },
        {
          selector: 'node.route-active',
          style: {
            'border-width': 3,
          },
        },
      ],
      layout: {
        name: 'preset',
      },
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false,
    });

    cy.on('tap', 'node', (evt) => {
      const nodeId = evt.target.data('id');
      onNodeClick(Number(nodeId));
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, []);

  // Update elements and styling when topology or route changes
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy || !topology) return;

    cy.batch(() => {
      cy.elements().remove();

      // Add nodes
      topology.nodes.forEach((node) => {
        cy.add({
          group: 'nodes',
          data: {
            id: String(node.id),
            label: `${node.name}`,
            status: node.status,
          },
          position: {
            x: node.x,
            y: node.y,
          },
        });
      });

      // Add edges
      topology.links.forEach((link) => {
        cy.add({
          group: 'edges',
          data: {
            id: `e-${link.source}-${link.target}`,
            source: String(link.source),
            target: String(link.target),
            latency: `${link.latency}ms`,
            status: link.status,
          },
        });
      });

      // Highlight source & target
      cy.$(`node[id = "${selectedSource}"]`).addClass('source-node');
      cy.$(`node[id = "${selectedTarget}"]`).addClass('target-node');

      // Highlight active route if present
      if (activeRoute && activeRoute.is_reachable && activeRoute.path.length > 1) {
        const isRecovered = activeRoute.status === 'RECOVERED';
        const routeClass = isRecovered ? 'route-recovered' : 'route-primary';

        for (let i = 0; i < activeRoute.path.length - 1; i++) {
          const u = activeRoute.path[i];
          const v = activeRoute.path[i + 1];

          cy.$(`edge[source = "${u}"][target = "${v}"], edge[source = "${v}"][target = "${u}"]`).addClass(routeClass);
          cy.$(`node[id = "${u}"], node[id = "${v}"]`).addClass('route-active');
        }
      }
    });

    cy.fit(undefined, 40);
  }, [topology, activeRoute, selectedSource, selectedTarget]);

  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const handleFit = () => cyRef.current?.fit(undefined, 40);

  return (
    <div className="relative border border-space-700 rounded-xl overflow-hidden bg-space-900 shadow-xl">
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-space-800/90 px-2.5 py-1 rounded border border-space-700">
          Interactive Orbital Mesh
        </span>
      </div>

      {/* Floating Canvas Controls */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-space-800/90 p-1 rounded-lg border border-space-700 shadow-md">
        <button
          onClick={handleZoomIn}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-space-700 rounded transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-space-700 rounded transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleFit}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-space-700 rounded transition-colors"
          title="Reset View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Graph Legend */}
      <div className="absolute bottom-3 left-3 z-10 bg-space-800/90 px-3 py-2 rounded-lg border border-space-700 text-xs flex flex-wrap gap-x-4 gap-y-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300">Operational</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="text-slate-300">Failed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-1 rounded bg-blue-500"></span>
          <span className="text-slate-300">Primary Route</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-1 rounded bg-purple-500"></span>
          <span className="text-slate-300">Recovered Route</span>
        </div>
      </div>

      <div ref={containerRef} className="cy-container" />
    </div>
  );
};
