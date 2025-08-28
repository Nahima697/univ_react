import CustomInput from "@/component/CustomInput";
import FormButton from "@/component/FormButton";
import type Student from "@/model/Student";
import { useState } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router-dom";
import './Form.css'

export default function Form() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<Omit<Student,'id'>>({
    name: "",
    firstname: "",
    email: "",
    registeredAt: new Date().toISOString(),
  });
const isFormValid = formData.name && formData.firstname && formData.email;
  const API_URL = "https://localhost/api";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    console.log("submitted", formData);

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          classroom: `/api/classrooms/${id}`,
        }),
      });

        if (!response.ok) {
      if (response.status === 503) {
        throw new Error("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
      }

      if (response.status === 422) {
        throw new Error("Le cours est complet. Attendez la prochaine session");
      }

      const errorText = await response.text();
      throw new Error(`Erreur ${response.status}: ${errorText}`);
    }

      const data = await response.json();
      console.log("Inscription réussi", data);
    } catch (err:any) {
      console.error("Erreur:", err);
      setErrorMessage(err.message || "Une erreur est survenue.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <main>
      <div>
       {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
          )}
      </div>

    <form onSubmit={handleSubmit}>
      <div>
        <CustomInput icon={<AiOutlineUser />} type={'text'} placeholder={'Nom'}   id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange} />
          <CustomInput icon={<AiOutlineUser />} type={'text'} placeholder={'Prénom'} id="firstname"
          name="firstname"
          required
          value={formData.firstname}
          onChange={handleChange} />
          <CustomInput icon={<AiOutlineMail />} type={'text'} placeholder={'Enter your Email'} id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange} />
          <CustomInput type={'hidden'}  id="registeredAt"
          name="registeredAt"
          required
          value={formData.registeredAt} />
          <FormButton btnText={"S'inscrire"} disabled={!isFormValid}/>
          
      </div>
    </form>
    </main>
  );
}
