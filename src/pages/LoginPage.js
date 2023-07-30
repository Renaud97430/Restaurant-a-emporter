// import React from "react";

// function LoginPage() {
//   return <div>LoginPage</div>;
// }

// export default LoginPage;


import React from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://barquett-api.formaterz.fr/api/login",
        formData
      );
      if (response.status === 200) {
        NotificationManager.success("formation", "Connexion réussite", 3000);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", formData.username);
        navigate("/");
      } else {
        NotificationManager.error("Une erreur est survenue", "Erreur", 3000);
      }
    } catch (error) {
      // console.log(error);
      NotificationManager.error("Une erreur est survenue", "Erreur", 3000);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className=" flex flex-col gap-4 h-80 w-80 items-center justify-center rounded-md bg-black mx-auto mt-6"
    >
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        className=" border-2 rounded-full placeholder:text-center p-2"
        required
        onChange={(e) =>
          setFormData({ ...formData, username: e.target.value.trim() })
        }
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className=" border-2 rounded-full placeholder:text-center p-2"
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value.trim() })
        }
        required
      />
      <input
        type="submit"
        className=" p-4 border-2 border-white bg-black text-white rounded-md hover:text-teal-500 cursor-pointer "
        value="Se connecter"
        disabled={loading}
      />
    </form>
  );
}

export default LoginPage;
