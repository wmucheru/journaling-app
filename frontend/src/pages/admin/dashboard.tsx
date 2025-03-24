import React, { FC } from "react";

import PageAdmin from "@/components/PageAdmin";
import Panel from "@/components/Panel";
import ApexChart from "@/components/ApexChart";

import { HEATMAP_DATA } from "@/utils/heatmap-data";

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
          <ApexChart
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
