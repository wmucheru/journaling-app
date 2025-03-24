import mongoose from "mongoose";

import { generateSchema } from "../../utils/baseModel.js";
import Event from "../events/event.model.js";

const SpeakerSchema = generateSchema({
  name: {
    type: String,
    required: [true, "Speaker name is required"],
  },
  title: String,
  company: String,
  bio: String,
  photo: String,
  linkedIn: String,
  twitter: String,
  event: {
    type: mongoose.Types.ObjectId,
    ref: Event,
  },

  /**
   *
   * Only published speakers are available on the frontend
   *
   */
  published: {
    type: Boolean,
    default: false,
  },

  /**
   *
   * Defines order of speakers after rearranging
   *
   */
  order: Number,
});

/**
 *
 * Model functions
 *
 */
SpeakerSchema.statics.fetchAll = function (filter = {}) {
  if (filter?.event) {
    filter.event = new mongoose.Types.ObjectId(filter?.event);

    return this.find(filter).select(
      "name title company bio photo linkedIn twitter published"
    );
  } else {
    return [];
  }
};

export default mongoose.model("Speaker", SpeakerSchema);
