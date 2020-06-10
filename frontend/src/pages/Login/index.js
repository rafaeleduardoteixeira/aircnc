import React, { Fragment, useState } from "react";
import api from "../../service/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post("/sessions", { email });
    localStorage.setItem("user", response.data._id);

    history.push("/dashboard");
  }

  return (
    <Fragment>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL*</label>
        <input type="email" id="email" placeholder="Seu e-mail" onChange={(event) => setEmail(event.target.value)} value={email} />
        <button action="submit" className="buttonSearch">
          Entrar
        </button>
      </form>
    </Fragment>
  );
}
