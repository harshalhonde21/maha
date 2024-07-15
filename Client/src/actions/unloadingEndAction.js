import axios from "axios";
import {
    fetchUnloadingRequest,
    fetchUnloadingSuccess,
    fetchUnloadingFail
} from "../slices/unloadingEnd.js";
import toast from "react-hot-toast";

export const updateUnloadingEnd = (data) => async (dispatch) => {
    dispatch(fetchUnloadingRequest());
    try {
        const response = await axios.put('https://mahagenco.onrender.com/api/v3/unloadingEnd/unloadingEndAddUpdate', data);
        dispatch(fetchUnloadingSuccess(response.data));
        toast.success('Unloading end data updated successfully!');
    } catch (error) {
        dispatch(fetchUnloadingFail(error.message));
        toast.error('Failed to update unloading end data!');
    }
};


export const fetchUnloadingEnd = () => async dispatch => {
    dispatch(fetchUnloadingRequest());
    try {
      const response = await axios.get('https://mahagenco.onrender.com/api/v3/unloadingEnd/get-unloadingEndTps');
      dispatch(fetchUnloadingSuccess(response.data.entries));
      toast.success('Unloading end data fetched successfully!');
    } catch (error) {
      dispatch(fetchUnloadingFail(error.message));
      toast.error('Failed to fetch unloading end data!');
    }
  };