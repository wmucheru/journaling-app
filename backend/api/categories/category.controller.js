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
      const category = await Category.getOne(id);
      return res.status(200).json(category);
    }

    // Get by user
    else if (req?.user?.id) {
      const categories = await Category.getAllByUser(req?.user?.id);
      return res.status(200).json(categories);
    }

    // Other
    else {
      const categories = await Category.getAll();
      return res.status(200).json(categories);
    }
  } catch (e) {
    console.log("CATEGORY_FETCH_ERROR: ", e);

    return res.status(500).send({
      error: true,
      message: "Could not fetch entries",
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
    // Add `userId`
    req.body.userId = req?.user?.id;

    const category = await Category.insert(req.body);

    return res.status(201).send({
      category,
      message: "Category added",
    });
  } catch (e) {
    console.log("CATEGORY_ADD_ERROR: ", e);

    return res.status(500).send({
      error: true,
      message: "Could not add category",
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
    const category = await Category.update(obj);

    res.status(200).send({
      message: "Category updated",
      category,
    });
  } catch (e) {
    console.log("CATEGORY_UPDATE_ERROR: ", e);

    res.status(500).send({
      error: true,
      message: "Could not update category",
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
    const category = await Category.getOne(id);

    if (!category?.id) {
      return res.status(400).send({
        error: true,
        message: "Could not find category",
      });
    }

    await Category.deleteOne(id);

    // TODO: Delete query

    return res.status(200).send({
      id,
      message: "Category deleted",
    });
  } catch (e) {
    console.log("CATEGORY_DELETE_ERROR: ", e);

    return res.status(500).send({
      error: true,
      message: "Could not delete category",
    });
  }
};
