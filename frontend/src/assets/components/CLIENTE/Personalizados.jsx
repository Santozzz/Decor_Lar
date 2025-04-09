import React, { useState } from "react";
// import emailjs from "emailjs-com";
import "./../../styles/components/CLIENTE/Personalizados.css";
import imagem from "./../../img/perso.jpg";

const Personalizados = () => {
  const [formData, setFormData] = useState({
    detalhes: "",
    telefone: "",
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
    // Validação simples de telefone (pode ser ajustada conforme necessidade)
    return /^(\+?55)?[\s-]?[0-9]{2}[\s-]?[0-9]{4,5}[\s-]?[0-9]{4}$/.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(formData.telefone)) {
      alert("Por favor, insira um número de telefone válido");
      return;
    }

    setIsSubmitting(true);

    // Configuração do EmailJS (você precisará criar uma conta em https://www.emailjs.com/)
    emailjs
      .send(
        "seu_service_id", // Substitua pelo seu Service ID
        "seu_template_id", // Substitua pelo seu Template ID
        formData,
        "seu_user_id" // Substitua pelo seu User ID
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSubmitStatus("success");
        setFormData({ detalhes: "", telefone: "" });
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
    <div>
      <div className="container">
        <div className="cabecalho">
          <h1>FAÇA SEU PRODUTO</h1>
          <p>
            DE DETALHES E MEDIDAS DO SEU PRODUTO PERSONALIZADO E FAÇA SEU
            ORÇAMENTO
          </p>
        </div>
        <div className="body">
          <img src={imagem} alt="" className="marceneiro" />
          <div className="form-section">
            <h2>
              PREENCHA O FORMULARIO ABAIXO PARA FAZER O ORÇAMENTO DO PRODUTO!
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
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

              <div className="form-group">
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

              <button
                className="btn-enviar"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
              </button>

              {submitStatus === "success" && (
                <p className="success-message">
                  Orçamento enviado com sucesso! Entraremos em contato em breve.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="error-message">
                  Ocorreu um erro ao enviar. Por favor, tente novamente.
                </p>
              )}
            </form>
          </div>
        </div>
        <div className="other-products">
          <button onClick={() => (window.location.href = "/produtos")}>
            OUTROS PRODUTOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Personalizados;
