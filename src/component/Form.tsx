export  default function Form() {

    function submit() {

    }

    return (
<form action ={submit}>
  <div>
    <label htmlFor="nom">Nom :</label>
    <input type="text" id="nom" name="nom" required />
  </div>

  <div>
    <label htmlFor="prenom">Prénom :</label>
    <input type="text" id="prenom" name="prenom" required />
  </div>


  <div>
    <label htmlFor="dateInscription">Date d'inscription :</label>
    <input type="date" id="dateInscription" name="dateInscription" required />
  </div>

  <div>
    <label htmlFor="email">Email :</label>
    <input type="email" id="email" name="email" required />
  </div>

  <button type="submit">S'inscrire</button>
</form>

    )

}