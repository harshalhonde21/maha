import axios from "axios";

import {fetchChpFail, fetchChpRequest, fetchChpSuccess} from "../slices/chpSlice.js"

export const fetchChpEntries = () => async (dispatch) => {
    try {
      dispatch(fetchChpRequest());
      const response = await axios.get("https://mahagenco.onrender.com/api/v2/chp/get-chp-entry");
      dispatch(fetchChpSuccess(response.data));
    } catch (error) {
      dispatch(fetchChpFail(error.message));
    }
  };
  


  export const fetchChpPlainEntries = () => async (dispatch) => {
    try {
      dispatch(fetchChpRequest());
      const response = await axios.get("https://mahagenco.onrender.com/api/v2/chp/chp-entry");
      dispatch(fetchChpSuccess(response.data));
    } catch (error) {
      dispatch(fetchChpFail(error.message));
    }
  };
  