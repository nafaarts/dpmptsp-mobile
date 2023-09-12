import axios from "../utils/Axios"

const getData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const postData = async (url, data) => {
  const response = await axios.post(url, data);
  return response.data;
};

const putData = async (url, { arg: data }) => {
  const response = await axios.put(url, data);
  return response.data;
};

// async function sendRequest(url, { arg }) {
//   return fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(arg)
//   })
// }

export { getData, postData, putData };