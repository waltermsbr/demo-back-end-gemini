import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarComGemini(imageBuffer, tipo) {
    var prompt;
    if (tipo === 1) {
        prompt =
            "Gere uma única sugestão de título em português do Brasil para a seguinte imagem, "
            + "sem informar que é uma sugestão de título da imagem e com no mínimo 30 letras";
    } else if (tipo === 2) {
        prompt =
            "Gere uma única descrição em português do Brasil para a seguinte imagem, "
            + "sem informar que é uma descrição da imagem e com no máximo 400 letras";
    }
    try {
        var ext = imageBuffer.split(';')[0].match(/jpeg|png|gif/)[0];
        var data = imageBuffer.replace(/^data:image\/\w+;base64,/, '');
        const image = {
            inlineData: {
                data: data,
                mimeType: "image/" + ext,
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text não disponível.";
    } catch (erro) {
        console.error("Erro ao obter alt-text:", erro.message, erro);
        return "Alt-text não disponível.";
    }
}