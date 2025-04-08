import React from "react";
import { useState } from "react";
import Navbar_SIS from "../../assets/components/SISTEMA/Navbar_SIS.jsx";
import "./../../assets/styles/pages/SISTEMA/ADD_PROD_SISTEMA.css";

function ADD_PROD_SISTEMA() {
  const [mainImg, setMainImg] = useState(null);
  const [extraImg1, setExtraImg1] = useState(null);
  const [extraImg2, setExtraImg2] = useState(null);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImage(preview);
    }
  };

  return (
    <div>
      <Navbar_SIS />
      <div className="container">
        <div className="form-area">
          <h2 className="ttl">ADICIONAR PRODUTOS</h2>
          <div className="row">
            <div className="col">
              <div className="img">
                <label htmlFor="main-img" className="img-label">
                  {mainImg ? (
                    <img src={mainImg} alt="Preview" className="preview" />
                  ) : (
                    <>
                      <span className="icon">&#128247;</span>
                      <p>INSERIR IMAGEM</p>
                    </>
                  )}
                  <input
                    type="file"
                    id="main-img"
                    hidden
                    onChange={(e) => handleImageChange(e, setMainImg)}
                  />
                </label>
              </div>

              <div className="outras-imagens">
                <label htmlFor="extra1" className="btn-img">
                  {extraImg1 ? (
                    <img
                      src={extraImg1}
                      alt="Extra 1"
                      className="preview-mini"
                    />
                  ) : (
                    "+"
                  )}
                  <input
                    type="file"
                    id="extra1"
                    hidden
                    onChange={(e) => handleImageChange(e, setExtraImg1)}
                  />
                </label>

                <label htmlFor="extra2" className="btn-img">
                  {extraImg2 ? (
                    <img
                      src={extraImg2}
                      alt="Extra 2"
                      className="preview-mini"
                    />
                  ) : (
                    "+"
                  )}
                  <input
                    type="file"
                    id="extra2"
                    hidden
                    onChange={(e) => handleImageChange(e, setExtraImg2)}
                  />
                </label>
              </div>
            </div>
            <div className="col">
              <h2 className="ttl-form">Dados do Produto</h2>
              <form className="form">
                <select className="select-categoria" defaultValue="">
                  <option value="" disabled>Categorias</option>
                  <option value="decoracao">Casa & Decoração</option>
                  <option value="nerd">Nerd</option>
                  <option value="pet">PET</option>
                </select>
                <input type="text" placeholder="Titulo" />
                <input type="text" placeholder="Valor" />
                <textarea
                  name=""
                  id=""
                  placeholder="Descrição do Produto"
                ></textarea>
                <div className="btn">
                  <input type="submit" value="Adicionar Produtos" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ADD_PROD_SISTEMA;
