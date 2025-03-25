import { Journal } from "./journal.model.js";

export const JournalController = {};

/**
 *
 * Fetch entries
 *
 */
JournalController.get = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const entry = await Journal.getOne(id);
      return res.status(200).json(entry);
    } else {
      const journal = await Journal.getAll(req.query);
      return res.status(200).json(journal);
    }
  } catch (e) {
    console.log("JOURNAL_FETCH_ERROR: ", e);

    return res.status(500).send({
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
    const journalEntry = await Journal.insert(req.body);

    return res.status(201).send({
      journalEntry,
      message: "Journal entry added",
      error: false,
    });
  } catch (e) {
    console.log("JOURNAL_ADD_ERROR: ", e);

    return res.status(500).send({
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
    const journalEntry = await Journal.update(obj);

    return res.status(200).send({
      message: "Journal entry updated",
      journalEntry,
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
  const { id } = req.params;

  try {
    const entry = await Journal.getOne(id);

    if (!entry?.id) {
      return res.status(400).send({
        error: true,
        message: "Could not find entry",
      });
    }

    await Journal.deleteOne(id);

    return res.status(200).send({
      id: entry?.id,
      message: "Journal entry deleted",
    });
  } catch (e) {
    console.log("JOURNAL_DELETE_ERROR: ", e);

    return res.status(500).send({
      error: true,
      message: e,
    });
  }
};
