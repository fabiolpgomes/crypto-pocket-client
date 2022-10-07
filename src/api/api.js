import axios from "axios";

//configurando nossas URLs de API
const apiURLs = {
<<<<<<< HEAD
<<<<<<< HEAD
  development: "http://localhost:4000",
=======
  development: "http://localhost:4000/",
>>>>>>> 529ec0c76413a6729e5b0e7d6faeb4082836c097
=======
  development: "http://localhost:4000",
>>>>>>> ab4bafead72c3b9028ebbf74253b1d4b28fb4dd8
  production: "https://cryptopocketbf.herokuapp.com",


};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

//adicionar SE HOUVER, o token no header
api.interceptors.request.use((config) => {
  const loggedInUserJSON = localStorage.getItem("loggedInUser"); //pega o user, mas ele tá em JSON
  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""'); // pega o json e transforma em OBJETO.

  /*  if (!parseLoggedInUser) {
    return config;
  } */

  if (parseLoggedInUser.token) {
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }

  return config;
});

export { api };
