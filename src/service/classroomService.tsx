import type { ApiResponse } from "@/model/ApiResponse";
import type Classroom from "@/model/Classroom";
import { API_URL } from "@/config";


const  classroomList =  async (): Promise<Classroom[]> =>{
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
    freespot: classroom.capacity - classroom.nbStudents
  }));
}

const classroomDetail = async (id: string): Promise<Classroom> => {
  const res = await fetch(`${API_URL}/classrooms/${id}`);
  if (!res.ok) {
    if (res.status === 503) {
      throw new Error("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
    }
    throw new Error(`Erreur HTTP : ${res.status}`);
  }

  const classroom: Classroom = await res.json();

  return {
    ...classroom,
    registerDeadline: new Date(classroom.registerDeadline),
    isFull: classroom.capacity === classroom.nbStudents,
    isTooLate: new Date(classroom.registerDeadline) < new Date(),
    freespot: classroom.capacity - classroom.nbStudents
  };
};

const createClassroom = async (classroom: Partial<Classroom>): Promise<Classroom> => {
  const res = await fetch(`${API_URL}/classrooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', // pour inclure le cookie où se trouve le token
    body: JSON.stringify(classroom),
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`);
  }

  return await res.json();
};

const updateClassroom = async (id: string, updates: Partial<Classroom>, token: string): Promise<Classroom> => {
  const res = await fetch(`${API_URL}/classrooms/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json", 
    },
     credentials: 'include', 
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`);
  }

  return await res.json();
};

const deleteClassroom = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/classrooms/${id}`, {
    method: "DELETE",
    credentials: 'include', 
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`);
  }
};




export { classroomList, classroomDetail,createClassroom,updateClassroom,deleteClassroom };


