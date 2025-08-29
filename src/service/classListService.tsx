import type { ApiResponse } from "@/model/ApiResponse";
import type Classroom from "@/model/Classroom";

const API_URL = "https://localhost/api";

export default async function classListService(): Promise<Classroom[]> {
  const res = await fetch(`${API_URL}/classrooms`);

  if (!res.ok) {
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