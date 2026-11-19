import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { MetricsCards } from '../components/MetricsCards';
import { DisconnectionAlert } from '../components/DisconnectionAlert';
import { ResilienceMetrics } from '../types';

describe('SatNexus Frontend Mission Control UI', () => {
  it('TC-FE-01: Navbar renders title, version badge, and action controls', () => {
    const dummyMetrics: ResilienceMetrics = {
      node_availability_pct: 100,
      link_availability_pct: 100,
      lcc_ratio_pct: 100,
      reachability_ratio_pct: 100,
      total_satellites: 8,
      active_satellites: 8,
      failed_satellites: 0,
      total_links: 13,
      active_links: 13,
      failed_links: 0,
      network_status: 'OPTIMAL',
    };

    render(
      <Navbar
        metrics={dummyMetrics}
        onReset={vi.fn()}
        onOpenAnalysis={vi.fn()}
        isLoading={false}
      />
    );

    expect(screen.getByText('SatNexus')).toBeDefined();
    expect(screen.getByText('OPTIMAL CONSTELLATION')).toBeDefined();
    expect(screen.getByText('Reset Constellation')).toBeDefined();
  });

  it('TC-FE-02: MetricsCards displays availability, LCC ratio, and status', () => {
    const dummyMetrics: ResilienceMetrics = {
      node_availability_pct: 87.5,
      link_availability_pct: 92.3,
      lcc_ratio_pct: 87.5,
      reachability_ratio_pct: 78.5,
      total_satellites: 8,
      active_satellites: 7,
      failed_satellites: 1,
      total_links: 13,
      active_links: 12,
      failed_links: 1,
      network_status: 'DEGRADED',
    };

    render(<MetricsCards metrics={dummyMetrics} activeRoute={null} />);

    expect(screen.getByText('7/8')).toBeDefined();
    expect(screen.getByText('(87.5%)')).toBeDefined();
    expect(screen.getByText('87.5%')).toBeDefined();
    expect(screen.getByText('78.5%')).toBeDefined();
  });

  it('TC-FE-03: DisconnectionAlert renders warning banner when destination is unreachable', () => {
    render(
      <DisconnectionAlert
        message="Destination unreachable due to network partition."
        onReset={vi.fn()}
      />
    );

    expect(
      screen.getByText('NETWORK PARTITION DETECTED — DESTINATION UNREACHABLE')
    ).toBeDefined();
    expect(
      screen.getByText('Destination unreachable due to network partition.')
    ).toBeDefined();
    expect(screen.getByText('Restore Constellation')).toBeDefined();
  });
});
