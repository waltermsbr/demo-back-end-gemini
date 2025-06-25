import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarDescricaoComGemini(imageBuffer) {
    const prompt =
        "Gere uma única descrição em português do Brasil para a seguinte imagem, sem informar que é uma descrição da imagem";
    console.log("1")
    try {
        var ext = imageBuffer.split(';')[0].match(/jpeg|png|gif/)[0];
        var data = imageBuffer.replace(/^data:image\/\w+;base64,/, '');
        console.log(ext)
        const image = {
            inlineData: {
                data: data,
                mimeType: "image/" + ext,
            },
        };
        console.log(image)
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text não disponível.";
    } catch (erro) {
        console.error("Erro ao obter alt-text:", erro.message, erro);
        throw new Error("Erro ao obter o alt-text do Gemini.");
    }
}