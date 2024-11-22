import fs from "fs";
import { alterarPostDB, buscarPostsDB, inserirPostDB } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/germiniService.js";

export async function buscarPosts(req, res) {
    const posts = await buscarPostsDB();
    res.status(200).json(posts);
}

export async function inserirPost(req, res) {
    const post = req.body;
    try {
        const retorno = await inserirPostDB(post);
        res.status(200).json(retorno);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function uploadImagem(req, res) {
    const post = req.body;
    try {
        const retorno = await inserirPostDB(post);
        const imagem = `uploads/${retorno.insertedId}.png`
        fs.renameSync(req.file.path, imagem);
        res.status(200).json(retorno);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function alterarPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt,
        };
        const retorno = await alterarPostDB(id, post);
        res.status(200).json(retorno);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}