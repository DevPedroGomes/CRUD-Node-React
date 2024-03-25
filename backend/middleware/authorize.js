const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware para autorizar requisições
function authorize(req, res, next) {
  // Obter token do cabeçalho
  const token = req.header("jwt_token");

  // Verificar se não há token
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }

  // Verificar o token
  try {
    // Vai nos fornecer o ID do usuário (user:{id: user.id})
    const verify = jwt.verify(token, process.env.SECRET_KEY);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

// Exportar o middleware com um nome específico
module.exports = authorize;
