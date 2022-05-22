import axios from "axios";
import authHeader from "../utils/authHeader";

const fetchAllJobs = async () => {
  try {
    const response = await axios.get("jobs", {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const fetchJob = async (id) => {
  try {
    const response = await axios.get(`jobs/${id}`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const createJob = async (job) => {
  try {
    const response = await axios.post("jobs", job, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const updateJob = async (job) => {
  try {
    const response = await axios.put(`jobs/${job._id}`, job, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`jobs/${id}`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const fetchApplications = async () => {
  try {
    const response = await axios.post(
      "jobs/me",
      {},
      {
        headers: authHeader(),
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};


const applyForJob = async (jobId) => {
  try {
    const response = await axios.put(
      `jobs/apply/${jobId}`,
      {},
      {
        headers: authHeader(),
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}


const unapplyForJob = async (jobId) => {
  try {
    const response = await axios.put(
      `jobs/unapply/${jobId}`,
      {},
      {
        headers: authHeader(),
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}


const fetchOffers = async () => {
  try {
    const response = await axios.post(
      "jobs/employer",
      {},
      {
        headers: authHeader(),
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const jobs = {
  fetchAllJobs,
  fetchJob,
  createJob,
  updateJob,
  deleteJob,
  fetchApplications,
  fetchOffers,
  applyForJob,
  unapplyForJob
};

export default jobs;
