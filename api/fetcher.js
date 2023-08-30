import axios from "../utils/Axios"

const getData = async (url) => {
  const response = await axios.get(url);
  return response.data;
  // console.info('from fetcher :', error)
};

const postData = async (url, data) => {
  const response = await axios.post(url, data);
  return response.data;
};

export { getData, postData };