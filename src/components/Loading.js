import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ReactLoading type="cubes" color="black" height={150} width={150} />
      <h2>Chargement en cours ... </h2>
    </div>
  );
}

export default Loading;
