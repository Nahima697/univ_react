import type Student from "@/model/Student";
import { useState } from "react";
import { useParams } from "react-router-dom";

export async function registerStudent(
  formData: Omit<Student, 'id'>,
  classroomId: string,
): Promise<any> {
 const API_URL = "https://localhost/api";
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      classroom: `/api/classrooms/${classroomId}`,
    }),
  });

  if (!response.ok) {
    if (response.status === 503) {
      throw new Error("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
    }

    if (response.status === 422) {
      throw new Error("Le cours est complet. Attendez la prochaine session.");
    }

    const errorText = await response.text();
    throw new Error(`Erreur ${response.status} : ${errorText}`);
  }

  return await response.json();
}

