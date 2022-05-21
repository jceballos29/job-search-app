import axios from "axios";
import authHeader from "../utils/authHeader";

const fetchAllJobs = async () => {
  try {
    const response = await axios.get("/api/jobs", {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const fetchJob = async (id) => {
  try {
    const response = await axios.get(`/api/jobs/${id}`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const createJob = async (job) => {
  try {
    const response = await axios.post("/api/jobs", job, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const updateJob = async (job) => {
  try {
    const response = await axios.put(`/api/jobs/${job._id}`, job, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`/api/jobs/${id}`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const jobs = { fetchAllJobs, fetchJob, createJob, updateJob, deleteJob };

export default jobs;
