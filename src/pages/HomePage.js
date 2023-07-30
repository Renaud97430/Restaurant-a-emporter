import React, { useEffect } from "react";
import MealCard from "../components/MealCard";
import axios from "axios";
import Loading from "../components/Loading";


function HomePage() {
  const [meals, setMeals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);

  const fetchMeals = async () => {
    const response = await axios.get(
      "https://barquett-api.formaterz.fr/api/meals"
    );
    setMeals(response.data["hydra:member"]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, [refresh]);

  return (
    <div className=" flex flex-wrap m-4 items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <>
          {meals.map((m, index) => (
                        <MealCard
                        key={index}
                        meal={m}
                        setRefresh={setRefresh}
                        refresh={refresh}
                      />
          ))}
        </>
      )}
    </div>
  );
}

export default HomePage;
