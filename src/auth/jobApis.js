import axios from "axios";
import { toast } from "react-toastify";

export const createJobPost = async ({
  companyName,
  logoURL,
  position,
  salary,
  location,
  locationType,
  jobType,
  description,
  aboutCompany,
  skills,
  information,
}) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(`${process.env.REACT_APP_BACKENDURL}createJobPost`, {
      companyName,
      logoURL,
      position,
      salary,
      location,
      locationType,
      jobType,
      description,
      aboutCompany,
      skills,
      information,
    });
    return response;
  } catch (error) {
    console.log(error);
    toast(error.response.data.message);
  }
};

export const getJobDetailsById = async(jobId) => {
  try{
    console.log(backendURL)
    const userId = JSON.parse(localStorage.getItem("userId"));
    const response = await axios.get(`${process.env.REACT_APP_BACKENDURL}getJobDetailsById/${jobId}/${userId}`);
    return response.data;
  }catch(error){
    console.log(error);
  }  
}