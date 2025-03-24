import React, { FC } from "react";
import dynamic from "next/dynamic";

// https://apexcharts.com/docs/react-charts/
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ApexChart: FC<any> = (props) => {
  return <Chart {...props} />;
};

export default ApexChart;
