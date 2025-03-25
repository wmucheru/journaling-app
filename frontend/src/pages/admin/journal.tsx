import React, { FC, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import PageAdmin from "@/components/PageAdmin";
import StatusMessage from "@/components/StatusMessage";
import Modal from "@/components/Modal";

import JournalList from "@/modules/journal/JournalList";
import JournalForm from "@/modules/journal/JournalForm";

import { JournalItem } from "@/utils/types";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchJournalEntries } from "@/redux/slices/journal";
import { addCategory, fetchCategories } from "@/redux/slices/category";

/**
 *
 * Admin: Journal - List all journal entries
 *
 */
const Journal: FC = () => {
  const dispatch = useAppDispatch();

  const { journal, journalEntry, journalStatus } = useAppSelector(
    (state: any) => state.journal
  );

  const [entries, setEntries] = useState<JournalItem[]>([]);

  useEffect(() => {
    dispatch(fetchCategories({}));
    dispatch(fetchJournalEntries({}));
  }, []);

  /**
   *
   * Close modal on successful
   *
   */
  useEffect(() => {
    if (journalEntry?.id) {
    }
  }, [journalEntry]);

  const onAddEntry = () => {
    const id = entries?.length + 1;

    setEntries((prev: JournalItem[]) => {
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

    dispatch(
      addCategory({
        name: "Test " + id,
      })
    );
  };

  const entryCount: number = entries?.length || 0;

  console.log(journal);

  return (
    <PageAdmin title="Journal">
      <div className="flex flex-col min-h-96 gap-4">
        <div className="flex justify-between items-center mb-0">
          <div className="flex gap-4">
            <Modal
              title="New Entry"
              buttonText="New Entry"
              buttonClass="btn btn-sm btn-primary"
              isOpen={journalEntry?.id !== undefined}
            >
              <JournalForm data={journalEntry} />
            </Modal>

            <button className="btn btn-sm btn-primary" onClick={onAddEntry}>
              <FaPlus /> New Entry
            </button>
          </div>

          {entryCount > 0 && (
            <span className="text-sm text-gray-400">
              {`Entries: ${entryCount}`}
            </span>
          )}
        </div>

        <StatusMessage status={journalStatus} />

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
