const authHeader = () => {
  const token = localStorage.getItem("jobSearchToken");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export default authHeader;
