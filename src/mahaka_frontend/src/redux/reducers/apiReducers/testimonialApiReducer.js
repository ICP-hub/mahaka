import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationManager from "../../../common/utils/notificationManager";

const initialState = {
  testimonials: [],

  testimonialLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const createTestimonial = createAsyncThunk(
  "testimonial/createTestimonial",
  async ({ backend, description, location, title }) => {
    try {
      const response = await backend.createTestimonial(
        description,
        title,
        location
      );
      // action(false);
      // console.log("testimonial created successfully")
      return response;
    } catch (error) {
      notificationManager.error(error?.err);

      throw error;
    }
  }
);

// getall testimonials

export const getAllTestimonials = createAsyncThunk(
  "testimonial/getAllTestimonials",
  async ({ backend }) => {
    try {
      const response = await backend.getAllTestimonials();
      // action(false);
      // console.log("testimonials fetshed successfully")
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// clear all testimonials

export const deleteTestimonial = createAsyncThunk(
  "testimonial/deleteTestimonial",
  async ({ backend, setDeleteModalVisible }) => {
    try {
      const response = await backend.deleteTestimonial();
      if (response.ok) {
        setDeleteModalVisible(false);
        return response.ok; // Success message
      } else {
        throw new Error(response.err); // Handle error
      }
    } catch (error) {
      console.log("Error in clear testimonials", e);
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createTestimonial.pending, (state) => {
        state.testimonialLoading = true;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.testimonialLoading = false;
        //console.log("testimonial in reducer", action)

        state.testimonials.push(action.payload.ok);
        state.error = null;
        notificationManager.success("testimonial created successfully");
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.testimonialLoading = false;
        state.error = action.error.message;
      })

      // get all testimonials

      .addCase(getAllTestimonials.pending, (state) => {
        state.testimonialLoading = true;
      })
      .addCase(getAllTestimonials.fulfilled, (state, action) => {
        state.testimonialLoading = false;
        if (action.payload.ok) {
          state.testimonials = [...action.payload.ok];
        }

        state.error = null;
      })

      .addCase(getAllTestimonials.rejected, (state, action) => {
        state.testimonialLoading = false;
        state.error = action.error.message;
        state.testimonials = [];
      })

      // delete testimonials
      .addCase(deleteTestimonial.pending, (state) => {
        state.testimonialLoading = true;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonialLoading = false;
        state.testimonials = [];
        state.error = null;
      })

      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.testimonialLoading = false;
        state.error = action.error.message;
        // state.testimonials = [];
      });
  },
});

export default testimonialSlice.reducer;
