import type Student from "@/model/Student";
import { API_URL } from "@/config";
import type { ApiResponse } from "@/model/ApiResponse";

const registerStudent = async (formData: Omit<Student, 'id'>,classroomId: string): Promise<Student> => {
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      registeredAt: new Date().toISOString(),
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
};

const getStudents = async (): Promise<Student[]> => {
  const res = await fetch(`${API_URL}/students`, {
    method: "GET",
    credentials: 'include', // pour inclure le cookie où se trouve le token
  });

  if (!res.ok) {
    if (res.status === 503) {
      throw new Error("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
    }
    throw new Error(`Erreur HTTP : ${res.status}`);
  }

  const data: ApiResponse<Student> = await res.json();

  return data.member.map((student: Student) => ({
    ...student,
  }));
};

const deleteStudent = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
    credentials: 'include', 
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`);
  }
};


export { registerStudent, getStudents };
