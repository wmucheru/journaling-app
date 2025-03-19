import React, { FC } from "react";
import dynamic from "next/dynamic";

import PageAdmin from "@/components/PageAdmin";
import Panel from "@/components/Panel";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard: FC = () => {
  const generateData = (
    count: number,
    yrange: { max: number; min: number }
  ) => {
    let i = 0;
    const series = [];

    while (i < count) {
      const x = (i + 1).toString();
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  };

  const options = {
    series: [
      {
        name: "Metric1",
        data: generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Metric2",
        data: generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Metric3",
        data: generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Metric4",
        data: generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Metric5",
        data: generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Metric6",
        data: generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Metric7",
        data: generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Metric8",
        data: generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: "Metric9",
        data: generateData(18, {
          min: 0,
          max: 90,
        }),
      },
    ],
    chart: {
      height: 350,
      type: "heatmap",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB"],
    title: {
      text: "",
    },
  };

  return (
    <PageAdmin title="Dashboard">
      <div className="flex gap-4">
        <Panel title="Summary Stats">
          <Chart
            options={options}
            series={options.series}
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
