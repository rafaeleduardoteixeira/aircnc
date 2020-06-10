import React, { useState, useMemo } from "react";
import camera from "../../assets/camera.svg";
import api from "../../service/api";
import "./styles.css";

export default function NewSpot({history}) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  async function handleSubmit(event ) {
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem("user");
    data.append("image", image);
    data.append("techs", techs);
    data.append("company", company);
    data.append("price", price);
    await api.post("/spots", data, {
      headers: { user_id },
    });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id="image" style={{ backgroundImage: `url(${preview})` }} className={image ? "has-image" : ""}>
        <input type="file" onChange={(event) => setImage(event.target.files[0])} />
        <img src={camera} alt="camera" />
      </label>

      <label htmlFor="company">Empresa*</label>
      <input type="text" id="company" placeholder="Sua empresa..." value={company} onChange={(event) => setCompany(event.target.value)} />

      <label htmlFor="techs">
        Tecnologias* <span>(separadas por vírgula)</span>
      </label>
      <input type="text" id="compantechsy" placeholder="Quais tecnologias usam..." value={techs} onChange={(event) => setTechs(event.target.value)} />

      <label htmlFor="price">
        Valor da diária* <span>(em branco para GRATUITO)</span>
      </label>
      <input type="text" id="price" placeholder="Valor cobrado por dia..." value={price} onChange={(event) => setPrice(event.target.value)} />

      <button type="submit" className="buttonSearch">
        Cadastrar
      </button>
    </form>
  );
}
