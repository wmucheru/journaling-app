import React, { FC, FormEvent, useState } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { addCategory, updateCategory } from "@/redux/slices/category";
import { FaPlus } from "react-icons/fa6";

const CategoryForm: FC = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<any>({});

  /**
   *
   * Handle input change
   *
   */
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
      dispatch(updateCategory(form));
    } else {
      dispatch(addCategory(form));
      setForm({});
    }
  };

  return (
    <form className="form-horizontal" onSubmit={onSubmit}>
      <div className="flex gap-4">
        <input
          type="text"
          name="name"
          className="form-control !py-1"
          placeholder="New Category"
          required={true}
          value={form?.name || ""}
          onChange={onChange}
        />
        <button className="btn btn-default">
          <FaPlus /> Add
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
