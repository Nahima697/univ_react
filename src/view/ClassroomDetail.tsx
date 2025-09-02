import Navbar from '@/component/Navbar';
import type Classroom from '@/model/Classroom';
import { classroomDetail } from '@/service/classroomService';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ClassroomDetail() {
  const { id } = useParams();
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!id) return; 
      try {
        const data = await classroomDetail(id);
        setClassroom(data);
      } catch (err: any) {
        console.error("Erreur dans le fetch :", err);
        setErrorMessage(err.message || "Une erreur est survenue.");
      }
    }

    fetchData();
  }, [id]);

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (!classroom) {
    return <div>Chargement...</div>;
  }

  return (
    <div className='container'>
      <Navbar/>
      <h2>Détail du cours</h2>

      <div className="class-card">
        <h3>🎓 {classroom.name}</h3>
        <p>
          <strong>Description :</strong> {classroom.description}
        </p>
        <p>
          <strong>Date butoire :</strong>{" "}
          {classroom.registerDeadline.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {classroom.isTooLate && (
          <p className="fullOrFinish">La date d'inscription est dépassée</p>
        )}
        <p>
          <strong>Place restantes  :</strong> {classroom.freespot}
        </p>
        {classroom.isFull && (
          <p className="fullOrFinish">Ce cours est complet</p>
        )}
        {!classroom.isFull && !classroom.isTooLate && (
          <Link to={`/register/${classroom.id}`} className="link">
            S'inscrire
          </Link>
        )}
      </div>
    </div>
  );
}
