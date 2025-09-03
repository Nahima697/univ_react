import React, { useState } from "react";
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser, memoryStore } from "react-admin";
import { Card, CardContent, Typography, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";  
import { dataProvider } from "@/service/dataProvider";


export const DashboardAdmin = () => {
  const store = memoryStore();
  const [error, setError] = useState<string | null>(null);

  const Dashboard = () => (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Bienvenue dans l’interface d’administration
        </Typography>
        <Typography>
          Utilisez le menu pour accéder aux étudiants, aux classes.
        </Typography>
      </CardContent>
    </Card>
  );

  const handleCloseError = () => {
    setError(null); 
  };

  return (
    <>
      {error && (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      <Admin
        dataProvider={dataProvider}
        store={store}
        dashboard={Dashboard}
        basename="/admin"  
      >
        <Resource name="students" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
        <Resource name="classrooms" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      </Admin>
    </>
  );
};
