import { Journal } from "./journal.model.js";

export const JournalController = {};

/**
 *
 * Fetch entries
 *
 */
JournalController.get = async (req, res) => {
  const { id } = req.params;
  const { categoryId } = req.query;

  try {
    if (id) {
      const entry = {};
      res.status(200).json(entry);
    } else {
      const list = [];
      res.status(200).json(list);
    }
  } catch (e) {
    console.log("JOURNAL_FETCH_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: "Could not fetch entries(s)",
      log: e,
    });
  }
};

/**
 *
 * Add journal entry
 *
 */
JournalController.add = async (req, res) => {
  try {
    const obj = req.body;

    // TODO: Add query
    const journal = {};

    res.status(201).send({
      journal,
      message: "Journal entry added",
      error: false,
    });
  } catch (e) {
    console.log("JOURNAL_ADD_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: e,
    });
  }
};

/**
 *
 * Update journal entry
 *
 */
JournalController.update = async (req, res) => {
  const obj = req.body;

  try {
    const { id } = obj;

    // TODO: Update query
    const entry = {};

    res.status(200).send({
      message: "Journal entry updated",
      entry,
    });
  } catch (e) {
    console.log("JOURNAL_UPDATE_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: e,
    });
  }
};

/**
 *
 * Delete journal entry
 *
 */
JournalController.remove = async (req, res) => {
  const id = req.params.id;

  try {
    const entry = {};

    if (!entry?.id) {
      return res.status(400).send({
        error: true,
        message: "Could not find entry",
      });
    }

    // TODO: Delete query

    res.status(200).send({
      id,
      message: "Journal entry deleted",
    });
  } catch (e) {
    console.log("JOURNAL_DELETE_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: e,
    });
  }
};
