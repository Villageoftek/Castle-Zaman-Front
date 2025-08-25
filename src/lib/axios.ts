///// <reference types="vite/client" />
// import axios from 'axios';
// export const urlBase = process.env.PUBLIC_API_URL ||"https://castle-panel.wassalha.net/api/en/";
// export const apiBase = axios.create({
//   baseURL: urlBase,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

import axios from "axios";



// export const urlBase = import.meta.env.VITE_API_BASE_URL || "https://castle-panel.wassalha.net/api/en/";

export const apiBase = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://castle-panel.wassalha.net/api/en/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
