import React, { FC, useEffect } from "react";

import PageAdmin from "@/components/PageAdmin";
import Panel from "@/components/Panel";
import ApexChart from "@/components/ApexChart";

import { HEATMAP_DATA } from "@/utils/heatmap-data";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchJournalReport } from "@/redux/slices/journal";
import Link from "next/link";

/**
 *
 * Dashboard
 *
 */
const Dashboard: FC = () => {
  const dispatch = useAppDispatch();

  const { journalReport } = useAppSelector((state: any) => state.journal);

  /**
   *
   * Load initial data
   *
   */
  useEffect(() => {
    dispatch(fetchJournalReport({}));
  }, []);

  console.log(journalReport);

  const { stats, categories } = journalReport;

  return (
    <PageAdmin title="Dashboard">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <div className="flex flex-col p-4 bg-white rounded shadow-md text-center">
            <h2 className="!text-[2em] !font-normal">{stats?.journals || 0}</h2>
            <div className="text-xs uppercase">Journal Entries</div>
          </div>

          <div className="flex flex-col p-4 bg-white rounded shadow-md text-center">
            <h2 className="!text-[2em] !font-normal">
              {stats?.categories || 0}
            </h2>
            <div className="text-xs uppercase">Categories</div>
          </div>
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

          <Panel title="Categories">
            {categories?.length === 0 && (
              <div className="block mt-[20%] text-center text-gray-500">
                Go to <Link href="/admin/journal">Journal</Link> to add
                categories
              </div>
            )}

            {categories?.length > 0 && (
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
                  labels: categories?.map((c: any) => c.name),
                  colors: ["#008FFB", "#0D9618", "#FFB000"],
                }}
                series={categories?.map((c: any) => c.count)}
                type="pie"
                width="400"
              />
            )}
          </Panel>
        </div>
      </div>
    </PageAdmin>
  );
};

export default Dashboard;
