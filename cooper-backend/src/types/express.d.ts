import { User } from "../models/User"; // Ajuste o caminho conforme necessário

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
