import { GoogleGenerativeAI } from "@google/generative-ai";
import docsData from "@/data/documents.json";

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

function getDocuments(): string[] {
  return docsData.map((d: { content: string }) => d.content);
}

export async function initializeRAG() {
  const docs = getDocuments();
  console.log(`✅ RAG inicializado com ${docs.length} documentos`);
}

export async function queryRAG(question: string) {
  const documents = getDocuments();

  if (documents.length === 0) {
    throw new Error("Nenhum documento encontrado na base de dados");
  }

  const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

  const context = documents.join("\n\n---NOVO DOCUMENTO---\n\n");

  const prompt = `Você é um assistente de seguros chamado SegurAI. Você ajuda clientes com dúvidas sobre apólices de seguro.

INSTRUÇÕES IMPORTANTES:
- Responda SEMPRE em português brasileiro
- Use um tom elegante, profissional e refinado
- Seja conciso mas informativo
- Se a informação não estiver nos documentos, diga: "Esta informação não está disponível em meus registros"
- Nunca invente informações
- NÃO mencione nomes de documentos na resposta
- NÃO diga frases como "Documento: X" ou "Conforme previsto na apólice (Documento: ...)"
- Responda como se o conhecimento fosse seu, sem referenciar a fonte

DOCUMENTOS DE REFERÊNCIA:
${context}

PERGUNTA DO CLIENTE:
${question}

Responda de forma clara e objetiva:`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      answer: text,
      sources: ["Base de Documentos SegurAI"],
    };
  } catch (error) {
    console.error("Erro ao fazer query:", error);
    throw new Error("Erro ao processar sua pergunta");
  }
}