import CustomInput from "@/component/CustomInput";
import FormButton from "@/component/FormButton";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { registerStudent } from "@/service/student";
import Navbar from "@/component/Navbar";

import formImg from "../images/form-image.jpg";

type RegisterFormValues = {
  name: string;
  firstname: string;
  email: string;}

export default function Form() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    mode: "onChange", 
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (formData) => {
    try {
      const data = await registerStudent(formData, id!);
      console.log("Inscription réussie", data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <main>
        <Navbar />
    
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="form-container">
  <form onSubmit={handleSubmit(onSubmit)} noValidate>
    <CustomInput
      icon={<AiOutlineUser />}
      type="text"
      placeholder="Renseignez votre nom"
      id="name"
      name="name"
      register={register("name", {
        required: "Nom requis",
        minLength: { value: 2, message: "Nom trop court" },
      })}
    />
    {errors.name && <p>{errors.name.message}</p>}

    <CustomInput
      icon={<AiOutlineUser />}
      type="text"
      placeholder="Renseignez votre prénom"
      id="firstname"
      name="firstname"
      register={register("firstname", {
        required: "Prénom requis",
        minLength: { value: 2, message: "Prénom trop court" },
      })}
    />
    {errors.firstname && <p>{errors.firstname.message}</p>}

    <CustomInput
      icon={<AiOutlineMail />}
      type="email"
      placeholder="Renseignez votre email"
      id="email"
      name="email"
      register={register("email", {
        required: "Email requis",
        pattern: {
          value:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Format d'email invalide",
        },
      })}
    />
    {errors.email && <p>{errors.email.message}</p>}

    <FormButton btnText={"S'inscrire"} disabled={!isValid} />
  </form>

  <div className="form-image">
    <img src={formImg} alt="Form illustration" />
  </div>
</div>


 
    </main>
  );
}
