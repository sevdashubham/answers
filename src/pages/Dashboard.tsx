//src/pages/Dashboard.tsx
import React from 'react';
import { PageLayout } from '@/components/layout';
import {
  PageHeader,
  ScenarioResults,
  ChartSection,
  KeyIndicators
} from '@/components/dashboard';

/**
 * Main dashboard page component
 */
const Dashboard: React.FC = () => {
  return (
      <PageLayout>
        <PageHeader title="Charging Station" />
        <ScenarioResults />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Graphs section - 60% (3/5) on desktop, full width on mobile */}
          <div className="col-span-1 xl:col-span-3">
            <ChartSection />
          </div>

          {/* KPI section - 40% (2/5) on desktop, full width on mobile */}
          <div className="col-span-1 xl:col-span-2">
            <KeyIndicators />
          </div>
        </div>
      </PageLayout>
  );
};

export default Dashboard;
