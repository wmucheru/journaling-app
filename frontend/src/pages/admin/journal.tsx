import React, { FC, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

import PageAdmin from "@/components/PageAdmin";
import Modal from "@/components/Modal";

import JournalList from "@/modules/journal/JournalList";
import JournalForm from "@/modules/journal/JournalForm";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchJournalEntries,
  setActiveJournalEntry,
} from "@/redux/slices/journal";

/**
 *
 * Admin: Journal - List all journal entries
 *
 */
const Journal: FC = () => {
  const dispatch = useAppDispatch();

  const { journal } = useAppSelector((state: any) => state.journal);

  /**
   *
   * Fetch data initially
   *
   */
  useEffect(() => {
    dispatch(fetchJournalEntries({}));
  }, []);

  const entryCount: number = journal?.length || 0;

  return (
    <PageAdmin title="Journal">
      <div className="flex flex-col min-h-96 gap-4">
        <div className="flex justify-between items-center mb-0">
          <div className="flex gap-4">
            <Modal
              title="New Entry"
              buttonText={
                <>
                  <FaPlus /> New Entry
                </>
              }
              buttonClass="btn btn-sm btn-primary"
              onToggleClose={() => dispatch(setActiveJournalEntry({}))}
            >
              <JournalForm />
            </Modal>
          </div>

          {entryCount > 0 && (
            <span className="text-sm text-gray-400">
              {`Entries: ${entryCount}`}
            </span>
          )}
        </div>

        {entryCount === 0 && (
          <p className="py-32 text-slate-400 text-lg uppercase text-center">
            No entries added
          </p>
        )}

        {entryCount > 0 && <JournalList data={journal} />}
      </div>
    </PageAdmin>
  );
};

export default Journal;
