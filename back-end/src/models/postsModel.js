import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function buscarPostsDB() {
    const db = conexao.db(process.env.STRING_DATABASE);
    const colecao = db.collection(process.env.STRING_COLLECTION);
    return colecao.find().toArray();
}

export async function buscarPostDB(id) {
    const db = conexao.db(process.env.STRING_DATABASE);
    const colecao = db.collection(process.env.STRING_COLLECTION);
    const objID = ObjectId.createFromHexString(id);
    return colecao.findOne({ _id: new ObjectId(objID) });
}

export async function inserirPostDB(post) {
    const db = conexao.db(process.env.STRING_DATABASE);
    const colecao = db.collection(process.env.STRING_COLLECTION);
    return colecao.insertOne(post);
}

export async function alterarPostDB(id, post) {
    const db = conexao.db(process.env.STRING_DATABASE);
    const colecao = db.collection(process.env.STRING_COLLECTION);
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: post });
}

export async function excluirPostDB(id) {
    const db = conexao.db(process.env.STRING_DATABASE);
    const colecao = db.collection(process.env.STRING_COLLECTION);
    const objID = ObjectId.createFromHexString(id);
    return colecao.deleteOne({ _id: new ObjectId(objID) });
}
