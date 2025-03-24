import React, { FC } from "react";
import dynamic from "next/dynamic";

import PageAdmin from "@/components/PageAdmin";
import Panel from "@/components/Panel";

import { HEATMAP_DATA } from "@/utils/heatmap-data";

// https://apexcharts.com/docs/react-charts/
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

/**
 *
 * Dashboard
 *
 */
const Dashboard: FC = () => {
  return (
    <PageAdmin title="Dashboard">
      <div className="flex gap-4">
        <Panel title="Summary Stats">
          <Chart
            options={{
              chart: {
                height: 350,
              },
              dataLabels: {
                enabled: false,
              },
              colors: ["#008FFB"],
              title: {
                text: "Entries over time",
              },
            }}
            series={HEATMAP_DATA}
            type="heatmap"
            width="500"
          />
        </Panel>

        <Panel title="Recent Entries">
          <p>No entries added yet</p>
        </Panel>
      </div>
    </PageAdmin>
  );
};

export default Dashboard;
