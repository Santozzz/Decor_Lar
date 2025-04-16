import React from "react";
import { useState } from "react";
import Navbar_SIS from "../../assets/components/SISTEMA/Navbar/Navbar_SIS.jsx";
import "./../../assets/styles/pages/SISTEMA/ADD_PROD_SISTEMA.css";
import axios from 'axios'

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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fileMain = document.getElementById("main-img").files[0];
    const fileExtra1 = document.getElementById("extra1").files[0];
    const fileExtra2 = document.getElementById("extra2").files[0];
  
    const img1 = fileMain ? await convertToBase64(fileMain) : null;
    const img2 = fileExtra1 ? await convertToBase64(fileExtra1) : null;
    const img3 = fileExtra2 ? await convertToBase64(fileExtra2) : null;
  
    const titulo = e.target[1].value;
    const valor = e.target[2].value;
    const descricao = e.target[3].value;
    const categoria = e.target[0].value;
  
    const produto = {
      titulo,
      valor,
      descricao,
      categoria,
      img1,
      img2,
      img3
    };
  
    try {
      const response = await axios.post("http://localhost:5000/produtos", produto);
      console.log("Produto salvo:", response.data);
      alert("Produto adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto.");
    }
  };

  return (
    <div>
      <Navbar_SIS />
      <div className="espaco"></div>
      <div className="produto-container">
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
              <form className="form" onSubmit={handleSubmit}>
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
