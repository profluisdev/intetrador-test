
import error from "../errors/customErrors.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js";

export const checkUserDocuments = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const user = await userRepository.getById(uid);
    console.log(req.file);
    if (!user) throw new error.notFoundError("Usuario no encontrado");
    if (user.documents.length === 0 && user.role === "user")
      throw error.badRequestError("El usuario no tiene documentos");

    // user.documents.forEach((document) => {
    //   if (
    //     !document.name.includes("Identificación") &&
    //     !document.name.includes("Comprobante de domicilio") &&
    //     !document.name.includes("Comprobante de estado de cuenta")
    //   )
    //     throw new error.badRequestError("El usuario no tiene los documentos necesarios");
    // });
    next();
  } catch (error) {
    next(error);
  }
};
