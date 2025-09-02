import { API_URL } from "@/config";
import type User from "@/model/User";


const auth = async (data:User) => {
    const res =  await fetch(`${API_URL}/login_check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', 
    body: JSON.stringify(data),
    });
        
     if (!res.ok) {
    if (res.status === 503) {
      throw new Error("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
    }
    throw new Error(`Erreur HTTP : ${res.status}`);
  }

}

export {auth}