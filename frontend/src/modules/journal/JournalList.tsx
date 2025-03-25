import React, { FC, useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

import JournalForm from "@/modules/journal/JournalForm";

import { JournalItem } from "@/utils/types";

import { useAppDispatch } from "@/redux/hooks";
import { deleteJournalEntry } from "@/redux/slices/journal";
import Modal from "@/components/Modal";

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

  const [entries, setEntries] = useState<JournalItem[]>([]);
  const [activeEntry, setActiveEntry] = useState<JournalItem>({});

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
   * Handle edit
   *
   */
  const onEdit = (entry: JournalItem) => {
    setActiveEntry(() => entry);
  };

  /**
   *
   * Handle deletion
   *
   */
  const onDelete = (id: number | undefined) => {
    console.log(id);

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
        title={`Edit ${activeEntry?.title}`}
        isOpen={activeEntry?.id !== undefined}
        onToggleClose={() => setActiveEntry({})}
      >
        <JournalForm data={activeEntry} onSave={() => setActiveEntry({})} />
      </Modal>

      {entries?.map((item: JournalItem, index: number) => {
        const { id, title, content } = item;

        return (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 bg-white border border-gray-100 
              shadow-lg rounded-md"
          >
            <h4>{title}</h4>
            <div dangerouslySetInnerHTML={{ __html: content || "" }}></div>

            <div className="flex gap-2">
              <button
                className="btn btn-xs btn-warning"
                onClick={() => onEdit(item)}
              >
                <FaPen /> Edit
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

      {activeEntry?.id && <JournalForm />}
    </div>
  );
};

export default JournalList;
