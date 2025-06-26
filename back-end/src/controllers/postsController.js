import fs from "fs";
import { buscarPostsDB, buscarPostDB, alterarPostDB, excluirPostDB, inserirPostDB } from "../models/postsModel.js";
import gerarComGemini from "../services/germiniService.js";

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

export async function inserirPostGemini(req, res) {
    const post = req.body;
    try {
        const alt = await gerarComGemini(post.imgUrl, 1);
        post.alt = alt;
        const descricao = await gerarComGemini(post.imgUrl, 2);
        post.descricao = descricao;
        const retorno = await inserirPostDB(post);
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
    const id = req.params.id;
    const body = req.body;
    try {
        var retorno;
        const postAtual = await buscarPostDB(id);
        if (body.modificarTitulo === 'S') {
            const alt = await gerarComGemini(postAtual.imgUrl, 1);
            const post = {
                alt: alt
            };
            retorno = await alterarPostDB(id, post);
            retorno.alt = alt;
        }
        if (body.modificarDescricao === 'S') {
            const descricao = await gerarComGemini(postAtual.imgUrl, 2);
            const post = {
                descricao: descricao
            };
            retorno = await alterarPostDB(id, post);
            retorno.descricao = descricao;
        }
        res.status(200).json(retorno);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function excluirPost(req, res) {
    const id = req.params.id;
    try {
        const retorno = await excluirPostDB(id);
        res.status(200).json(retorno);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function uploadImagem(req, res) {
    const body = req.body;
    try {
        const url = req.protocol + '://' + req.get('host');

        const post = await inserirPostDB(body);
        const id = post.insertedId.toHexString();
        const ext = req.file.mimetype.split(';')[0].match(/jpeg|png|gif/)[0];

        const imagem = `uploads/${id}.` + ext;
        fs.renameSync(req.file.path, imagem);

        const imgBuffer = fs.readFileSync(`uploads/${id}.` + ext);
        const imgBase64 = imgBuffer.toString("base64");

        const novoPost = {
            alt: await gerarComGemini(imgBase64, 1),
            descricao: await gerarComGemini(imgBase64, 2),
            imgUrl: `${url}/${id}.` + ext
        };

        const retorno = await alterarPostDB(id, novoPost);
        res.status(200).json(retorno);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}