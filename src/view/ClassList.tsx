
import type Classroom from '@/model/Classroom';
import { useState, useEffect } from 'react';
import './ClassList.css'; 
import { Link } from 'react-router-dom';
import { classroomList } from '@/service/classroomService';

export default function ClassList() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await classroomList();
        setClassrooms(data);
      } catch (err: any) {
        console.error("Erreur dans le fetch :", err);
        setError(err.message || "Une erreur est survenue.");
      }
    }

    fetchData();
  }, []);

 return (
  <div className='container' >
    <h2>
       Liste des cours
    </h2>
 {error && <div className="error-message">{error}</div>}

    <div className="class-list-container">
      {classrooms.map((classroom) => (
        <div className="class-card" key={classroom.id}>
          <h3>🎓 {classroom.name}</h3>
          <p>
            <strong>Place restantes :</strong> {classroom.freespot}
          </p>
          <p>
            <strong>Date butoire :</strong>{' '}
            {classroom.registerDeadline.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {classroom.isTooLate && (
            <p className='fullOrFinish'> La Date d'inscription est dépassée</p>
          )}
          <p>
            <strong>Étudiants inscrits :</strong> {classroom.nbStudents}
          </p>
             {classroom.isFull && (
            <p className='fullOrFinish'>Ce cours est complet</p>
            )}
            {!classroom.isFull && (
            
        <Link to={`/register/${classroom.id}`} className='link'>S'inscrire</Link>
         )}
        <Link to={`/classroom/${classroom.id}`} className='link'>
      Voir le détail
        </Link>
        </div>
      ))}
      
    </div>
  </div>
)
}
