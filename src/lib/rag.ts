import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

let cachedDocuments: string[] | null = null;

async function loadDocuments(): Promise<string[]> {
  // Se já carregou, não carrega novamente
  if (cachedDocuments) return cachedDocuments;

  try {
    const documentsPath = path.join(process.cwd(), "docs");
    
    // Verifica se a pasta existe
    if (!fs.existsSync(documentsPath)) {
      console.warn("⚠️ Pasta 'docs' não encontrada");
      return [];
    }

    // Lê todos os arquivos da pasta
    const files = fs.readdirSync(documentsPath);
    const txtFiles = files.filter(f => f.endsWith(".txt"));

    console.log(`📄 Encontrados ${txtFiles.length} arquivos .txt`);

    const documents: string[] = [];

    // Lê cada arquivo
    for (const file of txtFiles) {
      const filePath = path.join(documentsPath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      documents.push(content);
      console.log(`✅ Carregado: ${file}`);
    }

    cachedDocuments = documents;
    return documents;
  } catch (error) {
    console.error("❌ Erro ao carregar documentos:", error);
    return [];
  }
}

export async function initializeRAG() {
  const docs = await loadDocuments();
  console.log(`✅ RAG inicializado com ${docs.length} documentos`);
}

export async function queryRAG(question: string) {
  const documents = await loadDocuments();

  if (documents.length === 0) {
    throw new Error("Nenhum documento encontrado na pasta 'docs'");
  }

  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

  const context = documents.join("\n\n---NOVO DOCUMENTO---\n\n");

  const prompt = `Você é um assistente de seguros chamado SegurAI. Você ajuda clientes com dúvidas sobre apólices de seguro.

INSTRUÇÕES IMPORTANTES:
- Responda SEMPRE em português brasileiro
- Use um tom elegante, profissional e refinado
- Seja conciso mas informativo
- Se a informação não estiver nos documentos, diga: "Esta informação não está disponível em meus registros"
- Nunca invente informações
- Cite o documento quando possível

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