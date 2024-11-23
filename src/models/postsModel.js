import "dotenv-config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function buscarPostsDB() {
    const db = conexao.db("owfsolucoes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function inserirPostDB(post) {
    const db = conexao.db("owfsolucoes");
    const colecao = db.collection("posts");
    return colecao.insertOne(post);
}

export async function alterarPostDB(id, post) {
    const db = conexao.db("owfsolucoes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: post });
}
