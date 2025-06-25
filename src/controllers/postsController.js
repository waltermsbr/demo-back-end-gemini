import fs from "fs";
import { buscarPostsDB, buscarPostDB, alterarPostDB, excluirPostDB, inserirPostDB } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/germiniService.js";

export async function buscarPosts(req, res) {
    const posts = await buscarPostsDB();
    res.status(200).json(posts);
}

export async function buscarPost(req, res) {
    const id = req.params.id;
    const post = await buscarPostDB(id);
    res.status(200).json(post);
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
    try {
        const post = {
            alt: req.body.alt,
            descricao: req.body.descricao,
        };
        const retorno = await alterarPostDB(id, post);
        res.status(200).json(retorno);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function alterarPostGemini(req, res) {
    console.log("1")
    const id = req.params.id;
    try {
        const postAtual = await buscarPostDB(id);
        //      var ext = postAtual.imgUrl.split(';')[0].match(/jpeg|png|gif/)[0];
        //      var data = postAtual.imgUrl.replace(/^data:image\/\w+;base64,/, '');
        //     var buffer = Buffer.from(data, 'base64');
        console.log("2")

        //    var imgBuffer = fs.writeFile("imagem." + ext, buffer);

        console.log("3")


        const descricao = await gerarDescricaoComGemini(postAtual.imgUrl);
        const post = {
            descricao: descricao
        };
        const retorno = await alterarPostDB(id, post);
        retorno.descricao = descricao;
        res.status(200).json(retorno);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function excluirPost(req, res) {
    const id = req.params.id;
    const imagem = `uploads/${id}.png`
    try {
        await fs.unlink(imagem)
        const retorno = await excluirPostDB(id);
        res.status(200).json(retorno);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}