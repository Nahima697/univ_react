import type { ApiResponse } from "@/model/ApiResponse";
import type Classroom from "@/model/Classroom";
import { API_URL } from "@/config";
import { handleError } from "../component/handleError";


const  classroomList =  async (): Promise<Classroom[]> =>{
  const res = await fetch(`${API_URL}/classrooms`);
  handleError(res, 'classroomList');
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
  handleError(res, 'classroomDetail');
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
    credentials: 'include', 
    body: JSON.stringify(classroom),
  });

  handleError(res, 'createClassroom');
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

  handleError(res, 'updateClassroom');
    return await res.json();
  };

const deleteClassroom = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/classrooms/${id}`, {
    method: "DELETE",
    credentials: 'include', 
  });

  handleError(res, 'delete classroom');
};

export { classroomList, classroomDetail,createClassroom,updateClassroom,deleteClassroom };


