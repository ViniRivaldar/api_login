import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database{
    constructor(){
        this.Init()
    }

    Init(){
        this.mongoConnection = mongoose.connect(process.env.CONNECTION_DATABASE)
        .then(() => {
            console.log("Conectado ao banco de dados")
            console.log("")
        }).catch((err) => {
            console.log("Erro ao conectar ao banco de dados: " + err)
        });
    }
}

export default new Database();