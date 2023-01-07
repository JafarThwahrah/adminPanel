/* eslint-disable */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const fetchStores = createAsyncThunk("contact/fetchStores", async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/contact/all");
    return response.data.messages;
  } catch ($e) {
    console.log($e);
  }
});

const initialState = {
  name: "",
  email: "",
  content: "",
  messages: [],
};
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    createMessage: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.content = payload.content;

      axios.post("/api/contact", state).then((response) => {
        Swal.fire(response.data.message);
      });
    },
    // readMessage: (state) => {
    //   state.messages = fetchStores();
    //   console.log(state.messages);
    // },
    deleteMessage: ({ id }) => {
      console.log(id);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
           
            axios
              .delete(`http://localhost:8000/api/contact/${id}`)
              .then((res) => {
                console.log(res);
                swalWithBootstrapButtons.fire("Deleted!", res.data.message, "success");
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelled", "Your imaginary file is safe :)", "error");
          }
        });
    },
  },
  extraReducers: {
    [fetchStores.pending]: (state, action) => {
      state.status = "Loading...";
    },
    [fetchStores.fulfilled]: (state, action) => {
      //   state.messages = JSON.parse(JSON.stringify(payload.messages));
      state.messages = state.messages.concat(action.payload);
      console.log(state.messages);
    },
    [fetchStores.rejected]: (state, action) => {
      state.status = "something went wrong";
    },
  },
});

export const { createMessage, deleteMessage } = contactSlice.actions;

export default contactSlice.reducer;
