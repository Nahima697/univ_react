import { handleError } from "@/component/handleError";
import { API_URL } from "@/config";
import { fetchUtils } from "react-admin";
import type { DataProvider } from "react-admin";

export const dataProvider: DataProvider = {
  getList: async (resource: string, params: any) => {
  const { page, perPage } = params.pagination;
  const { field, order } = params.sort;

  const url = `${API_URL}/${resource}?page=${page}&itemsPerPage=${perPage}&order[${field}]=${order}`;
  const httpClient = async (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ "Content-Type": "application/json" });
  }
  // Récupérer le token depuis localStorage
  const token = localStorage.getItem("token");
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }

  options.credentials = "include";

  return fetchUtils.fetchJson(url, options)
    .then(response => {
      console.log("Réponse API:", response);
      return response;
    })
    .catch(error => {
      console.error("Erreur de requête:", error);
      throw error;
    });
};

  try {
   const { json } = await httpClient(url);
    console.log("API Platform getList:", resource, json);
    return {
      data: json.member,
      total: json.totalItems,
    };
  } catch (err) {
    console.error("Erreur getList:", err);
    return { data: [], total: 0 };
  }
},


  getOne: async (resource: string, params: any) => {
    const { json } = await fetchUtils.fetchJson(`${API_URL}/${resource}/${params.id}`);
    return { data: json };
  },

  create: async (resource: string, params: any) => {
    const { json } = await fetchUtils.fetchJson(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return { data: json };
  },

  update: async (resource: string, params: any) => {
    const { json } = await fetchUtils.fetchJson(`${API_URL}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return { data: json };
  },

  delete: async (resource: string, params: any) => {
    await fetchUtils.fetchJson(`${API_URL}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: params.previousData };
  },
};
