import { Category } from "./category.model.js";

export const CategoryController = {};

/**
 *
 * Fetch entries
 *
 */
CategoryController.get = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const category = {};
      res.status(200).json(category);
    } else {
      const list = [];
      res.status(200).json(list);
    }
  } catch (e) {
    console.log("CATEGORY_FETCH_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: "Could not fetch entries",
      log: e,
    });
  }
};

/**
 *
 * Add category
 *
 */
CategoryController.add = async (req, res) => {
  try {
    const obj = req.body;

    // TODO: Add query
    const category = {};

    res.status(201).send({
      category,
      message: "Category added",
      error: false,
    });
  } catch (e) {
    console.log("CATEGORY_ADD_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: e,
    });
  }
};

/**
 *
 * Update category
 *
 */
CategoryController.update = async (req, res) => {
  const obj = req.body;

  try {
    const { id } = obj;

    // TODO: Update query
    const category = {};

    res.status(200).send({
      message: "Categoru updated",
      category,
    });
  } catch (e) {
    console.log("CATEGORY_UPDATE_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: e,
    });
  }
};

/**
 *
 * Delete category
 *
 */
CategoryController.remove = async (req, res) => {
  const id = req.params.id;

  try {
    const category = {};

    if (!category?.id) {
      return res.status(400).send({
        error: true,
        message: "Could not find category",
      });
    }

    // TODO: Delete query

    res.status(200).send({
      id,
      message: "Category deleted",
    });
  } catch (e) {
    console.log("CATEGORY_DELETE_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: e,
    });
  }
};
