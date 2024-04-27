import axios from "axios";
import { toast } from "react-toastify";

const backendURL = "http://localhost:4000/";

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
    const response = await axios.post(`${backendURL}createJobPost`, {
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
    const userId = JSON.parse(localStorage.getItem("userId"));
    const response = await axios.get(`${backendURL}getJobDetailsById/${jobId}/${userId}`);
    return response.data;
  }catch(error){
    console.log(error);
  }  
}