import type { ApiResponse } from '@/model/ApiResponse';
import type Classroom from '@/model/Classroom';
import { useState, useEffect } from 'react';
import './ClassList.css'; 

export default function ClassList() {
  const API_URL = "https://localhost/api";
  const [classRooms, setClassRooms] = useState<Classroom[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/classrooms`)
      .then(res => res.json())
      .then((data: ApiResponse<Classroom>) => {
        const parsedData = data.member.map((item) => ({
          ...item,
          registerDeadline: new Date(item.registerDeadline),
        }));
        setClassRooms(parsedData);
      })
      .catch(err => {
        console.error("Erreur dans le fetch :", err);
      });
  }, []);

 return (
  <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
      📚 Liste des cours
    </h2>

    <div className="class-list-container">
      {classRooms.map((classRoom) => (
        <div className="class-card" key={classRoom.id}>
          <h3>🎓 {classRoom.name}</h3>
          <p>
            <strong>Capacité :</strong> {classRoom.capacity}
          </p>
          <p>
            <strong>Date butoir :</strong>{' '}
            {classRoom.registerDeadline.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>
            <strong>Étudiants inscrits :</strong> {classRoom.nbStudents}
          </p>
          <a
            href={`/register/${classRoom.id}`}  
            style={{
             
            }}
            >
            S'inscrire
            </a>
        </div>
      ))}
    </div>
  </div>
)
}
