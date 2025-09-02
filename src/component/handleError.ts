const handleError = async (res: Response, context: string) => {
  if (!res.ok) { 
    if (res.status === 503) {
      console.error(`Erreur 503 - Service indisponible lors de ${context}`);
      // alert("Le service est temporairement indisponible. Veuillez recharger la page.");
    } else {
      console.error(`Erreur ${res.status} lors de ${context}`);
      const errText = await res.text();
      console.error('Détails de l\'erreur :', errText);
    }
    throw new Error(`HTTP error ${res.status}`);
  }
  return res;
};

export {handleError}