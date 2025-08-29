import CustomInput from "@/component/CustomInput";
import FormButton from "@/component/FormButton";
import type Student from "@/model/Student";
import { useState } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router-dom";
import './Form.css'
import { registerStudent } from "@/service/registerStudent";

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
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage('');
  console.log("submitted", formData);
    try {
          const data = await registerStudent(formData, id!);
          console.log("Inscription réussie", data);
    } catch (err: any) {
  setErrorMessage(err.message || "Une erreur est survenue.");
  }
}

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
        <CustomInput icon={<AiOutlineUser />} type={'text'} placeholder={'Renseignez votre nom'}   id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange} />
          <CustomInput icon={<AiOutlineUser />} type={'text'} placeholder={'Renseignez votre prénom'} id="firstname"
          name="firstname"
          required
          value={formData.firstname}
          onChange={handleChange} />
          <CustomInput icon={<AiOutlineMail />} type={'text'} placeholder={'Renseignez votre email'} id="email"
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
