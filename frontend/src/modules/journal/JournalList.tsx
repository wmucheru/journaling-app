import React, { FC, useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

import JournalForm from "@/modules/journal/JournalForm";

import { JournalItem } from "@/utils/types";

interface Props {
  data?: JournalItem[];
}

/**
 *
 * Journal List
 *
 */
const JournalList: FC<Props> = ({ data = [] }) => {
  const [entries, setEntries] = useState<JournalItem[]>([]);
  const [activeEntry, setActiveEntry] = useState<JournalItem>({});

  useEffect(() => {
    setEntries(() => data);
  }, [data]);

  const onEdit = (entry: JournalItem) => {
    // TODO: Open edit modal
    setActiveEntry(() => entry);
  };

  const onDelete = (id: number | undefined) => {
    // TODO: Open confirmation modal
    if (id && confirm("Delete this entry?")) {
      setEntries((prev: JournalItem[]) => {
        return prev.filter((p: JournalItem) => p?.id !== id);
      });

      // TODO: Do some API action to async delete from backend
    }
  };

  console.log(activeEntry);

  return (
    <div className="flex flex-col gap-4">
      {entries?.map((item: JournalItem, index: number) => {
        return (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 bg-white border border-gray-100 
              shadow-lg rounded-md"
          >
            <h4>{item?.title}</h4>
            <div
              dangerouslySetInnerHTML={{ __html: item?.content || "" }}
            ></div>

            <div className="flex gap-2">
              <button
                className="btn btn-xs btn-warning"
                onClick={() => onEdit(item)}
              >
                <FaPen /> Edit
              </button>

              <button
                className="btn btn-xs btn-danger"
                onClick={() => onDelete(item?.id)}
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
