import jwt from "jsonwebtoken";

const key = process.env.JWT_KEY;

const checkToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, key, (error, decoded) => {
      if (error) {
        return res.status(401).send({ ok: false, message: "Invalid token..." });
      } else {
        req.decoded = decoded;
        console.log("decoded: ", decoded);
        next();
      }
    });
  } else {
    return res.status(401).send({ ok: false, message: "Token not supplied" });
  }
};

export default checkToken;
