import app from './app.js'

const PORT = process.env.PORT || 5000;

// Escutar a porta
app.listen(PORT, () => {
    console.log(`O servidor esta rodando na porta ${PORT}`);
});    