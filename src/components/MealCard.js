import React from "react";
import ImageDefault from "../assets/img/default.png";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { NavLink } from "react-router-dom";

function MealCard({ meal, setRefresh, refresh }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce repas ?"
    );
    if (!confirmDelete) {
      return;
    }
    const response = await axios.delete(
      `https://barquett-api.formaterz.fr/api/meals/${meal.id}`
    );
    if (response.status === 204) {
      NotificationManager.success(meal.name, "Repas supprimé", 3000);
    } else {
      NotificationManager.error("Une erreur est survenue", "Erreur", 3000);
    }
    setRefresh(!refresh);
  };

  return (
    <div className="rounded-md border-4 w-60 m-2 relative">
      <img src={ImageDefault} className=" bg-gray-300 p-4" alt="RestoImg"/>
      <div className=" text-center p-2">
        <div className=" absolute top-1 right-1 flex gap-2 ">
          <NavLink to="/edit" state={{ meal: meal }}>
            <FaEdit className=" cursor-pointer" />
          </NavLink>
          <MdDelete
            className=" cursor-pointer"
            onClick={() => {
              handleDelete();
            }}
          />
        </div>
        <h3
          className={
            meal.name.length > 6 ? "font-bold text-sm" : "font-bold text-xl"
          }
        >
          {meal.name}
        </h3>
        <p className="text-gray-500">{meal.restaurant}</p>
        <p className="text-gray-400">Stock : {meal.stock}</p>
      </div>
    </div>
  );
}

export default MealCard;
