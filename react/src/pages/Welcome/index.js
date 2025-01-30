import React from "react";

export default function Welcome() {
  return (
    <div className="mt-[100px] font-bold text-[35px]  ml-[200px] ">
      
      WELCOME  {localStorage.getItem("nom")} {localStorage.getItem("prenom")} <br/>to <h1 >AdmineX</h1>
    </div>
   
  );
}
