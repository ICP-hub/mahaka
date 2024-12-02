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
    async ({ backend, description, location,title }) => {
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
        throw error;
      }
    }
  );

  // getall testimonials 

  export const getAllTestimonials = createAsyncThunk(
    "testimonial/getAllTestimonials",
    async ({ backend}) => {
      try {
       
        const response = await backend.getAllTestimonials(
          
           
          
        );
        // action(false);
       // console.log("testimonials fetshed successfully")
        return response;
      } catch (error) {
        throw error;
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
       
        state. testimonials.push(action.payload.ok);
        state.error = null;
        notificationManager.success("testimonial created successfully");

       
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.testimonialLoading = false;
        state.error = action.error.message;
      })


      .addCase(getAllTestimonials.pending, (state) => {
        state.testimonialLoading = true;
      })
      .addCase(getAllTestimonials.fulfilled, (state, action) => {
        state.testimonialLoading = false;

        if (action.payload.ok) {
          state.testimonials= action.payload.ok
         
        } else {
          state.testimonials = [];
          
        }

        state.error = null;
      })

      .addCase(getAllTestimonials.rejected, (state, action) => {
        state.testimonialLoading = false;
        state.error = action.error.message;
      });


    }
})

export default testimonialSlice.reducer;
