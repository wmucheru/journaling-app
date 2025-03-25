import React, { FC, FormEvent, useEffect, useState } from "react";

import { JournalCategory, JournalItem } from "@/utils/types";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addJournalEntry,
  setActiveJournalEntry,
  updateJournalEntry,
} from "@/redux/slices/journal";
import { fetchCategories } from "@/redux/slices/category";

interface Props {
  data?: JournalItem;
}

/**
 *
 * Journal Form - Add or edit journal entries
 *
 */
const JournalForm: FC<Props> = ({ data = {} }) => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state: any) => state.categories);

  const [form, setForm] = useState<any>(data);

  /**
   *
   * Load initial data
   *
   */
  useEffect(() => {
    dispatch(fetchCategories({}));
  }, []);

  useEffect(() => {
    // setForm(() => data);
  }, [data]);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prevForm: object) => {
      return { ...prevForm, [name]: value };
    });
  };

  /**
   *
   * Save journal entry
   *
   */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (form?.id) {
      dispatch(updateJournalEntry(form));
    } else {
      dispatch(addJournalEntry(form));
    }

    dispatch(setActiveJournalEntry({}));
  };

  console.log(form);

  return (
    <div className="flex flex-col gap-4">
      <form className="form-horizontal" onSubmit={onSubmit}>
        <div className="form-group">
          <label className="control-label">Category</label>
          <div>
            <select
              name="categoryId"
              className="form-control max-w-[16em]"
              required={true}
              value={form?.categoryId || ""}
              onChange={onChange}
            >
              <option>Select category</option>

              {categories?.map((category: JournalCategory) => {
                const { id, name } = category;

                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="control-label">Title</label>
          <div>
            <input
              type="text"
              name="title"
              className="form-control"
              required={true}
              value={form?.title || ""}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label">Comment</label>
          <div>
            <textarea
              name="content"
              className="form-control"
              rows={8}
              required={true}
              value={form?.content || ""}
              onChange={onChange}
            ></textarea>
          </div>
        </div>

        <div className="form-group">
          <div className="hidden sm:flex w-1/4"></div>
          <button className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default JournalForm;
