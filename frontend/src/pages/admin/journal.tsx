import React, { FC, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import PageAdmin from "@/components/PageAdmin";

import JournalList from "@/modules/journal/JournalList";

import { JournalItem } from "@/utils/types";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchJournalCategories,
  fetchJournalEntries,
} from "@/redux/slices/journal";

/**
 *
 * Admin: Journal - List all journal entries
 *
 */
const Journal: FC = () => {
  const dispatch = useAppDispatch();

  const { journal, journalStatus } = useAppSelector(
    (state: any) => state.journal
  );

  const [entries, setEntries] = useState<JournalItem[]>([]);

  useEffect(() => {
    dispatch(fetchJournalCategories({}));
    dispatch(fetchJournalEntries({}));
  }, []);

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

  const entryCount: number = entries?.length || 0;

  console.log(journal);

  return (
    <PageAdmin title="Journal">
      <div className="flex flex-col min-h-96 gap-4">
        <div className="flex justify-between items-center mb-0">
          <button className="btn btn-sm btn-primary" onClick={onAddEntry}>
            <FaPlus /> New Entry
          </button>

          {entryCount > 0 && (
            <span className="text-sm text-gray-400">
              {`Entries: ${entryCount}`}
            </span>
          )}
        </div>

        {/* TODO: Blank state UI to create your first journal item */}
        {entryCount === 0 && (
          <p className="py-32 text-slate-400 text-lg uppercase text-center">
            No Entries added
          </p>
        )}

        {entryCount > 0 && <JournalList data={entries} />}
      </div>
    </PageAdmin>
  );
};

export default Journal;
