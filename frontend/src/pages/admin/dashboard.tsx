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
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          {[
            {
              total: 10,
              label: "Journal Entries",
            },
            {
              total: 3,
              label: "Categories",
            },
          ].map((stat: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col p-4 bg-white rounded shadow-md text-center"
              >
                <h2 className="!text-[2em] !font-normal">{stat?.total}</h2>
                <div className="text-xs uppercase">{stat?.label}</div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4">
          <Panel title="Summary Stats">
            <ApexChart
              options={{
                title: {
                  text: "Entries over time",
                },
                chart: {
                  height: 350,
                },
                dataLabels: {
                  enabled: false,
                },
                colors: ["#008FFB"],
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

        <div className="flex gap-4 w-full max-w-md">
          <Panel title="Categories">
            <ApexChart
              options={{
                enabled: true,
                title: {
                  text: "",
                },
                chart: {
                  // height: 350,
                },
                formatter: (val: number) => `${val}%`,
                plotOptions: {
                  pie: {
                    size: 350,
                  },
                },
                labels: ["Category 1", "Category 2", "Category 3"],
                colors: ["#008FFB", "#0D9618", "#FFB000"],
              }}
              series={[14, 5, 20]}
              type="pie"
              width="400"
            />
          </Panel>
        </div>
      </div>
    </PageAdmin>
  );
};

export default Dashboard;
