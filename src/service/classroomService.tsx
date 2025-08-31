import type { ApiResponse } from "@/model/ApiResponse";
import type Classroom from "@/model/Classroom";
import { API_URL } from "@/config";

export default async function classListService(): Promise<Classroom[]> {
  const res = await fetch(`${API_URL}/classrooms`);
  if (!res.ok) {
    if (res.status === 503) {
      throw new Error("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
    }
    throw new Error(`Erreur HTTP : ${res.status}`);
  }

  const data: ApiResponse<Classroom> = await res.json();
  

  return data.member.map((classroom: Classroom) => ({
    ...classroom,
    registerDeadline: new Date(classroom.registerDeadline),
    isFull: classroom.capacity === classroom.nbStudents,
    isTooLate: new Date(classroom.registerDeadline) < new Date(),
  }));
}