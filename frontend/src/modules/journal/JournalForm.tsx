import React, { FC, useEffect, useState } from "react";

import { JournalItem } from "@/utils/types";

interface Props {
  data?: JournalItem;
}

/**
 *
 * Journal Form - Add or edit journal entries
 *
 */
const JournalForm: FC<Props> = ({ data = {} }) => {
  const [form, setForm] = useState<JournalItem>(data);

  useEffect(() => {
    setForm(() => data);
  }, [data]);

  console.log("FORM: ", form);

  return <h2>Add Journal Item</h2>;
};

export default JournalForm;
