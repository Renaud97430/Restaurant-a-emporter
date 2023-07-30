import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { NotificationManager } from "react-notifications";
import { useLocation } from "react-router-dom";

function EditPage() {
  const [meal, setMeal] = useState({});
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    setLoading(true);
    if (state !== undefined && state !== null) {
      setMeal(state.meal);
      setEdit(true);
    }
    setLoading(false);
  }, [state]);

  const handleMeal = async () => {
    setLoading(true);
    meal.stock = parseInt(meal.stock);
    if (
      meal.name === undefined ||
      meal.name === "" ||
      meal.restaurant === undefined ||
      meal.restaurant === "" ||
      meal.stock === undefined
    ) {
      NotificationManager.warning(
        "Veuillez remplir tous les champs",
        "Erreur",
        3000
      );
      setLoading(false);
    } else {
      let response;
      if (edit) {
        response = await axios.put(
          `https://barquett-api.formaterz.fr/api/meals/${meal.id}`,
          meal
        );
      } else {
        response = await axios.post(
          "https://barquett-api.formaterz.fr/api/meals",
          meal
        );
      }
      setLoading(false);
      if (response.status === 201) {
        NotificationManager.success(meal.name, "Repas ajouté", 3000);

        setMeal({});
      } else if (response.status === 200) {
        NotificationManager.success(meal.name, "Repas modifié", 3000);
        // setMeal({});
      } else {
        NotificationManager.error("Une erreur est survenue", "Erreur", 3000);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMeal();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" flex flex-col gap-4 h-80 w-80 items-center justify-center rounded-md bg-black mx-auto mt-6"
        >
          <input
            type="text"
            placeholder="Nom du repas"
            className=" border-2 rounded-full placeholder:text-center p-2"
            required
            defaultValue={edit ? meal.name : ""}
            onChange={(e) => setMeal({ ...meal, name: e.target.value.trim() })}
          />
          <input
            type="text"
            placeholder="Nom du restaurant"
            className=" border-2 rounded-full placeholder:text-center p-2"
            defaultValue={edit ? meal.restaurant : ""}
            onChange={(e) =>
              setMeal({ ...meal, restaurant: e.target.value.trim() })
            }
            required
          />
          <input
            type="number"
            placeholder="stock"
            className=" border-2 rounded-full placeholder:text-center p-2"
            defaultValue={edit ? meal.stock : ""}
            onChange={(e) => setMeal({ ...meal, stock: e.target.value })}
            required
          />
          <input
            type="submit"
            className=" p-4 border-2 border-white bg-black text-white rounded-md hover:text-teal-500 cursor-pointer "
            value={edit ? "Editer" : "Ajouter"}
            disabled={loading}
          />
        </form>
      )}
    </>
  );
}

export default EditPage;
