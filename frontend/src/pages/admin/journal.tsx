import React, { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";

import PageAdmin from "@/components/PageAdmin";

import { JournalItem } from "@/utils/types";
import JournalList from "@/modules/journal/JournalList";

/**
 *
 * Admin: Journal - List all journal entries
 *
 */
const Journal: FC = () => {
  const [entries, setEntries] = useState<JournalItem[]>([]);

  const onAddEntry = () => {
    setEntries((prev: JournalItem[]) => {
      const id = entries?.length + 1;

      return [
        ...prev,

        {
          id,
          title: `Entry #${id}`,
          content: `Content for entry #${id}`,
          categoryId: 1,
        },
      ];
    });
  };

  return (
    <PageAdmin title="Journal">
      <div className="flex flex-col min-h-96 gap-4">
        <div className="block mb-0">
          <button className="btn btn-sm btn-primary" onClick={onAddEntry}>
            <FaPlus /> New Entry
          </button>
        </div>

        {/* TODO: Blank state UI to create your first journal item */}
        {entries?.length === 0 && (
          <p className="py-16 text-slate-300 text-lg uppercase text-center">
            No Entries added
          </p>
        )}

        {entries?.length > 0 && <JournalList data={entries} />}
      </div>
    </PageAdmin>
  );
};

export default Journal;
