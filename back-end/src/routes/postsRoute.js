import express from 'express';
import multer from 'multer';
import cors from "cors";
import { buscarPosts, buscarPost, alterarPost, alterarPostGemini, inserirPost, inserirPostGemini, excluirPost, uploadImagem } from '../controllers/postsController.js';

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
// Apenas em ambiente Windows
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
// Para upload de arquivos
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))
    app.get('/posts', buscarPosts);
    app.get('/posts/:id', buscarPost);
    app.post('/posts', inserirPost);
    app.put('/posts/:id', alterarPost);
    app.post('/posts/gemini', inserirPostGemini);
    app.put('/posts/gemini/:id', alterarPostGemini);
    app.delete('/posts/:id', excluirPost);
    app.post('/posts/upload', upload.single('imagem'), uploadImagem);
}

export default routes;
