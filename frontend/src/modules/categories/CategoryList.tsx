import React from "react";

import Panel from "@/components/Panel";

import CategoryForm from "@/modules/categories/CategoryForm";

import { JournalCategory } from "@/utils/types";

import { useAppSelector } from "@/redux/hooks";

const CategoryList = () => {
  const { categories } = useAppSelector((state: any) => state.categories);

  console.log(categories);

  return (
    <div className="flex flex-col gap-4">
      <Panel title="Categories">
        <CategoryForm />
        <hr className="my-4" />

        <ul className="flex flex-col gap-2">
          {categories?.map((category: JournalCategory) => {
            const { id, name } = category;
            return (
              <li
                key={id}
                className="flex max-w-fit px-2 py-1 bg-gray-200 hover:bg-blue-200 rounded text-sm"
              >
                {name}
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
};

export default CategoryList;
