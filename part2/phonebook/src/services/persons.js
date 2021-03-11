import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const requests = axios.get(baseUrl);
  return requests.then((res) => res.data);
};

const create = (newPerson) => {
  const requests = axios.post(baseUrl, newPerson);
  return requests.then((res) => res.data);
};

const update = (id, newPerson) => {
  const requests = axios.put(`${baseUrl}/${id}`, newPerson);
  return requests.then((res) => res.data);
};

const deleteObj = (id) => {
  const requests = axios.delete(`${baseUrl}/${id}`);
  return requests.then((res) => res.data);
};

const personService = {
  getAll,
  create,
  update,
  deleteObj,
};

export default personService;
