import { queryRAG } from "@/lib/rag";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "Mensagem vazia" },
        { status: 400 }
      );
    }

    const result = await queryRAG(message);

    return NextResponse.json({
      response: result.answer,
      sources: result.sources,
      success: true,
    });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      {
        error: error.message || "Erro ao processar pergunta",
        success: false,
      },
      { status: 500 }
    );
  }
}