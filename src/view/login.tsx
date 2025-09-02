import CustomInput from "@/component/CustomInput";
import FormButton from "@/component/FormButton";
import { auth } from "@/service/auth";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import Navbar from "@/component/Navbar"; 

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (formData) => {
    try {
      const data = await auth(formData);
      console.log("Authentification réussie", data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <main>
      <Navbar />

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

          <CustomInput
            icon={<AiFillLock />}
            type="password"
            placeholder="Entrez votre mot de passe"
            id="password"
            name="password"
            register={register("password", {
              required: "Mot de passe requis",
              minLength: {
                value: 2,
                message: "Mot de passe trop court",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <FormButton btnText="Se connecter" disabled={!isValid} />
        </form>
      </div>
    </main>
  );
}