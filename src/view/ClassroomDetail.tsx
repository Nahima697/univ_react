import type Classroom from '@/model/Classroom';
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ClassroomDetail() {
const { id } = useParams();
const [classroom,setClassroom]=useState<Classroom>();
  const [errorMessage, setErrorMessage] = useState("");
    return(
        <div> Cours</div>
    )

}