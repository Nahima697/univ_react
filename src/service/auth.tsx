import { handleError } from "@/component/handleError";
import { API_URL } from "@/config";
import type User from "@/model/User";


const auth = async (data: User) => {
  const res = await fetch(`${API_URL}/login_check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    handleError(res,'erreur veuiller réessayer')
  }

  // Récupérer le token dans la réponse JSON
  const responseData = await res.json();

  if (!responseData.token) {
    throw new Error("Aucun token reçu lors de l'authentification.");
  }

  // Stocker le token dans localStorage
  localStorage.setItem("token", responseData.token);

  return responseData;
};


const logout = async () => {
  const res = await fetch(`${API_URL}/logout`, {
     method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },

  );
   localStorage.removeitem("token");
}

export {auth,logout}