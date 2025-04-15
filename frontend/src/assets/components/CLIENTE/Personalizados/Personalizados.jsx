import React, { useState } from "react";
import emailjs from "emailjs-com";
import styles from "./Personalizados.module.css";
import imagem from "./../../../img/perso.jpg";

const Personalizados = () => {
  const [formData, setFormData] = useState({
    detalhes: "",
    telefone: "",
    nome: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhone = (phone) => {
    return /^(\+?55)?[\s-]?[0-9]{2}[\s-]?[0-9]{4,5}[\s-]?[0-9]{4}$/.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(formData.telefone)) {
      alert("Por favor, insira um número de telefone válido");
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      detalhes: formData.detalhes,
      telefone: formData.telefone,
      nome: formData.nome,
      to_email: "itens.personalizadosDL@gmail.com",
      from_name: "Site Decor & Lar",
      subject: "Novo orçamento de produto personalizado",
    };

    emailjs
      .send(
        "service_x89rxh9",
        "template_yls1tem",
        templateParams,
        "CZ7gRNRTRh267W0pr"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSubmitStatus("success");
        setFormData({ detalhes: "", telefone: "", nome: "" });
      })
      .catch((err) => {
        console.log("FAILED...", err);
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <h1>FAÇA SEU PRODUTO</h1>
        <p>
          DE DETALHES E MEDIDAS DO SEU PRODUTO PERSONALIZADO E FAÇA SEU
          ORÇAMENTO
        </p>
      </div>
      <div className={styles.body}>
        <img src={imagem} alt="Marceneiro" className={styles.marceneiro} />
        <div className={styles.formSection}>
          <h2>
            PREENCHA O FORMULARIO ABAIXO PARA FAZER O ORÇAMENTO DO PRODUTO!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="detalhes">DIGITE AQUI!</label>
              <textarea
                id="detalhes"
                name="detalhes"
                value={formData.detalhes}
                onChange={handleChange}
                required
                placeholder="Descreva detalhes, medidas e características do produto que deseja..."
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telefone">TELEFONE</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                placeholder="(XX) XXXXX-XXXX"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nome">NOME</label>
              <input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Digite seu nome"
              />
            </div>

            <button
              className={styles.btnEnviar}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
            </button>

            {submitStatus === "success" && (
              <p className={styles.successMessage}>
                Orçamento enviado com sucesso! Entraremos em contato em breve.
              </p>
            )}
            {submitStatus === "error" && (
              <p className={styles.errorMessage}>
                Ocorreu um erro ao enviar. Por favor, tente novamente.
              </p>
            )}
          </form>
        </div>
      </div>
      <div className={styles.otherProducts}>
        <p onClick={() => (window.location.href = "/Home")}>
          OUTROS PRODUTOS
        </p>
      </div>
    </div>
  );
};

export default Personalizados;
