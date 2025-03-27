import React, { FC, useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

import Modal from "@/components/Modal";

import JournalForm from "@/modules/journal/JournalForm";

import { JournalItem } from "@/utils/types";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteJournalEntry,
  setActiveJournalEntry,
} from "@/redux/slices/journal";
import { fetchCategories } from "@/redux/slices/category";

interface Props {
  data?: JournalItem[];
}

/**
 *
 * Journal List
 *
 */
const JournalList: FC<Props> = ({ data = [] }) => {
  const dispatch = useAppDispatch();

  const { journalEntry } = useAppSelector((state: any) => state.journal);

  const [entries, setEntries] = useState<JournalItem[]>([]);

  /**
   *
   * Load initial data
   *
   */
  useEffect(() => {
    dispatch(fetchCategories({}));
  }, []);

  /**
   *
   * Load journal entry data
   *
   */
  useEffect(() => {
    setEntries(() => data);
  }, [data]);

  /**
   *
   * Handle deletion
   *
   */
  const onDelete = (id: number | undefined) => {
    if (id && confirm("Delete this entry?")) {
      setEntries((prev: JournalItem[]) => {
        return prev.filter((p: JournalItem) => p?.id !== id);
      });

      dispatch(deleteJournalEntry(id));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Modal
        title={`Edit ${journalEntry?.title}`}
        isOpen={Number.isInteger(journalEntry?.id)}
        onToggleClose={() => dispatch(setActiveJournalEntry({}))}
      >
        <JournalForm />
      </Modal>

      {entries?.map((item: JournalItem, index: number) => {
        const { id, title, content } = item;

        return (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 pr-32 bg-white border border-gray-100 
              shadow-lg rounded-md group relative cursor-pointer"
          >
            <h4>{title}</h4>
            <div dangerouslySetInnerHTML={{ __html: content || "" }}></div>

            <div className="hidden gap-2 group-hover:flex absolute top-4 right-4">
              <button
                className="btn btn-xs btn-info"
                onClick={() => dispatch(setActiveJournalEntry(item))}
              >
                <FaPen /> View
              </button>

              <button
                className="btn btn-xs btn-danger"
                onClick={() => onDelete(id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JournalList;
