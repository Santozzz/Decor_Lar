import {React, useState } from 'react'
import styles from './FormularioProduto.module.css'
import axios from 'axios';

function FormularioProduto() {

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
  
    const fileMain = document.getElementById("mainImg").files[0];    
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

  const formatarMoeda = (valor) => {
    // Remove tudo que não for número
    const valorNumerico = valor.replace(/\D/g, '');

    // Converte para número e divide por 100 para ter centavos
    const valorFloat = parseFloat(valorNumerico) / 100;

    // Se não tiver nada digitado, retorna vazio
    if (isNaN(valorFloat)) {
      return '';
    }

    // Formata para moeda brasileira
    return valorFloat.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };


  return (
    <div>
        <div className={styles.produtoContainer}>
        <div className={styles.formArea}>
          <h2 className={styles.ttl}>ADICIONAR PRODUTOS</h2>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.img}>
                <label htmlFor="mainImg" className={styles.imgLabel}>
                  {mainImg ? (
                    <img src={mainImg} alt="Preview" className={styles.preview} />
                  ) : (
                    <>
                      <span className={styles.icon}>&#128247;</span>
                      <p>INSERIR IMAGEM</p>
                    </>
                  )}
                  <input
                    type="file"
                    id="mainImg"
                    hidden
                    onChange={(e) => handleImageChange(e, setMainImg)}
                  />
                </label>
              </div>

              <div className={styles.outrasImagens}>
                <label htmlFor="extra1" className={styles.btnImg}>
                  {extraImg1 ? (
                    <img
                      src={extraImg1}
                      alt="Extra 1"
                      className={styles.previewMini}
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

                <label htmlFor="extra2" className={styles.btnImg}>
                  {extraImg2 ? (
                    <img
                      src={extraImg2}
                      alt="Extra 2"
                      className={styles.previewMini}
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
            <div className={styles.col}>
              <h2 className={styles.ttlForm}>Dados do Produto</h2>
              <form className={styles.form} onSubmit={handleSubmit}>
                <select className={styles.selectCategoria} defaultValue="">
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
                <div className={styles.btn}>
                  <input type="submit" value="Adicionar Produtos" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormularioProduto