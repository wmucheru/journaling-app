import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { useAPI } from "@/utils/api";

import * as types from "@/redux/actions/actionTypes";
import type { RootState } from "@/redux/store";

interface IState {
  journal: any[];
  journalEntry: object;
  journalStatus: {
    message: string;
    error: boolean;
    loading: boolean;
    saving: boolean;
  };
}

const initialState: IState = {
  journal: [],
  journalEntry: {},
  journalStatus: {
    message: "",
    error: false,
    loading: false,
    saving: false,
  },
};

/**
 *
 * Journal Entries
 *
 */
export const fetchJournalEntries = createAsyncThunk(
  types.FETCH_JOURNAL_ENTRIES,
  async (filter: object | any = {}, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "GET",
        url: "/journal",
        params: filter,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchJournalEntry = createAsyncThunk(
  types.FETCH_JOURNAL_ENTRY,
  async (id: string | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "GET",
        url: `/journal/${id}`,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addJournalEntry = createAsyncThunk(
  types.ADD_JOURNAL_ENTRY,
  async (obj: object | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "POST",
        url: "/journal",
        data: obj,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateJournalEntry = createAsyncThunk(
  types.UPDATE_JOURNAL_ENTRY,
  async (obj: object | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "PUT",
        url: `/journal/${obj.id}`,
        data: obj,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteJournalEntry = createAsyncThunk(
  types.DELETE_JOURNAL_ENTRY,
  async (id: string | any, { rejectWithValue }) => {
    try {
      const response = await useAPI({
        type: "DELETE",
        url: `/journal/${id}`,
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const slice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setActiveJournalEntry: (state, action) => {
      state.journalEntry = action.payload;
      state.journalStatus = initialState.journalStatus;
    },
  },
  extraReducers: (builder) => {
    /**
     *
     * Fetch journal entries
     *
     */
    builder.addCase(fetchJournalEntries.pending, (state) => {
      state.journal = [];
      state.journalStatus.loading = true;
      state.journalStatus.message = "";
    });

    builder.addCase(fetchJournalEntries.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.journalStatus.message = message;
      state.journalStatus.error = error;
      state.journalStatus.loading = false;
    });

    builder.addCase(fetchJournalEntries.fulfilled, (state, action) => {
      state.journal = action.payload;
      state.journalStatus.loading = false;
    });

    /**
     *
     * Fetch single journal entry
     *
     */
    builder.addCase(fetchJournalEntry.pending, (state) => {
      state.journalEntry = {};
      state.journalStatus.loading = true;
      state.journalStatus.saving = false;
      state.journalStatus.message = "";
    });

    builder.addCase(fetchJournalEntry.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.journalStatus.message = message;
      state.journalStatus.error = error;
      state.journalStatus.loading = false;
    });

    builder.addCase(fetchJournalEntry.fulfilled, (state, action) => {
      const { journal, error, message } = action.payload;

      state.journal = journal;
      state.journalStatus.error = error;
      state.journalStatus.loading = false;
      state.journalStatus.message = message;
    });

    /**
     *
     * Add journal entry
     *
     */
    builder.addCase(addJournalEntry.pending, (state) => {
      state.journalEntry = {};
      state.journalStatus.loading = false;
      state.journalStatus.saving = true;
    });

    builder.addCase(addJournalEntry.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.journalStatus.message = message;
      state.journalStatus.error = error;
      state.journalStatus.saving = false;
    });

    builder.addCase(addJournalEntry.fulfilled, (state, action) => {
      const { journalEntry, message, error } = action.payload;

      state.journal = [journalEntry, ...state.journal];
      state.journalEntry = journalEntry;
      state.journalStatus.message = message;
      state.journalStatus.error = error;
      state.journalStatus.saving = false;
    });

    /**
     *
     * Update journal entry
     *
     */
    builder.addCase(updateJournalEntry.pending, (state) => {
      state.journalEntry = {};
      state.journalStatus.message = "";
      state.journalStatus.loading = false;
      state.journalStatus.saving = true;
    });

    builder.addCase(updateJournalEntry.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.journalStatus.message = message;
      state.journalStatus.error = error;
      state.journalStatus.loading = false;
      state.journalStatus.saving = false;
    });

    builder.addCase(updateJournalEntry.fulfilled, (state, action) => {
      const { journalEntry, message, error } = action.payload;

      state.journal = state.journal.map((j: any) =>
        j?.id === journalEntry?.id ? journalEntry : j
      );
      state.journalEntry = journalEntry;
      state.journalStatus.message = message;
      state.journalStatus.error = error;
      state.journalStatus.saving = false;
    });

    /**
     *
     * Delete journal entry
     *
     */
    builder.addCase(deleteJournalEntry.pending, (state) => {
      state.journalEntry = {};
      state.journalStatus.message = "";
      state.journalStatus.loading = false;
      state.journalStatus.saving = true;
    });

    builder.addCase(deleteJournalEntry.rejected, (state, action) => {
      const { message, error }: any = action?.payload || {};

      state.journalStatus.message = message;
      state.journalStatus.error = error;
      state.journalStatus.loading = false;
      state.journalStatus.saving = false;
    });

    builder.addCase(deleteJournalEntry.fulfilled, (state, action) => {
      const { id, message, error } = action.payload;

      state.journal = state.journal.filter((j: any) => j?.id !== id);
      state.journalStatus.message = message;
      state.journalStatus.error = error;
      state.journalStatus.saving = false;
    });
  },
});

export const journalState = (state: RootState) => state.journal;

export const { setActiveJournalEntry } = slice.actions;

export default slice.reducer;
