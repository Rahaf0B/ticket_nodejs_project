import User from "../models/Admin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { IUser } from "../config/interfaces/models_Interfaces";
import Admin from "../models/Admin";
dotenv.config();

export default class CUser {
  private static instance: CUser;

  private constructor() {}

  public static getInstance(): CUser {
    if (CUser.instance) {
      return CUser.instance;
    }
    CUser.instance = new CUser();
    return CUser.instance;
  }

  generateToken(id: number, email: string): string {
    const token = jwt.sign({ uid: id, email: email }, process.env.SECRET, {
      expiresIn: "1800s",
    });
    return token;
  }

  async registerUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<[string, IUser]> {
    try {
      const createdUser = await Admin.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      });
      const user = createdUser.toJSON();
      delete user.password;
      const token = this.generateToken(user.uid, user.email);
      delete user.uid;
      return [token, user];
    } catch (e: any) {
      if (e.errors[0].type == "unique violation") {
        throw new Error(e.errors[0].message, { cause: e.errors[0].type });
      } else {
        throw new Error(e.message);
      }
    }
  }

  async checkUserExists(key: string, data: string | number): Promise<IUser> {
    try {
      const user = await User.findOne({
        where: { [key]: data },
        attributes: ["uid", "email", "password"],
      });
      if (user) {
        return user.toJSON();
      }
      throw new Error("No User found", { cause: "not-found" });
    } catch (error: any) {
      throw new Error(error.message, { cause: error?.cause });
    }
  }

  async userLogin(email: string, password: string): Promise<[string, IUser]> {
    try {
      const userData = await this.checkUserExists("email", email);
      if (userData) {
        const validatePassword = await bcrypt.compare(
          password,
          userData.password
        );
        if (validatePassword) {
          delete userData.password;
          const token = await this.generateToken(userData.uid, userData.email);
          delete userData.uid;
          return [token, userData];
        } else {
          throw new Error("Invalid Data Try Again", {
            cause: "Validation Error",
          });
        }
      }
    } catch (error: any) {
      throw new Error(error.message, { cause: error?.cause });
    }
  }
}
