# 🛡️ SegurAI Assistente

> Chatbot inteligente de atendimento ao segurado utilizando IA Generativa + RAG.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://segurai-ten.vercel.app/)
[![Python](https://img.shields.io/badge/Python-3.14+-blue?logo=python)](https://python.org)
[![Gemini](https://img.shields.io/badge/LLM-Google%20Gemini-orange?logo=google)](https://aistudio.google.com)
[![LangChain](https://img.shields.io/badge/RAG-LangChain-green)](https://langchain.com)
[![ChromaDB](https://img.shields.io/badge/VectorDB-ChromaDB-purple)](https://trychroma.com)

---

## 🌐 Sistema Online

**🔗 https://segurai-ten.vercel.app/**

---

## 👥 Grupo — InsurTech Minds

| Nome | E-mail | Celular | Papel |
|------|--------|---------|-------|
| Ednardo Pinheiro Peixoto *(Representante)* | ed.peixoto99@gmail.com | (85) 98536-2741 | Líder Técnico / IA / Dev |
| Lilian Retori | lilianretori@yahoo.com.br | (35) 98842-0622 | Negócios / Seguros | Cientista de dados |
| Manoel da Silva Neto | manoel180@hotmail.com | (92) 99214-1819 | Arquitetura / Dev / Frontend | 
| Rafael Torres Lattaro Soares | lattaro.contato@gmail.com | (61) 99963-5599 | Especialista em Seguros |
| Rolf M. Paninka | romapa@gmail.com | (11) 99819-6693 | Corretor de Imóveis e Consórcio |

---

## 🎯 Objetivo

Automatizar o atendimento inicial de segurados, respondendo dúvidas frequentes sobre:

- 📋 Apólices e coberturas (Auto e Residencial)
- 🚗 Sinistros (abertura e acompanhamento)
- 💰 Pagamentos e segunda via de boleto
- 🆘 Assistência 24h e guincho
- ❌ Cancelamentos e endossos

---

## 🧠 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Python | 3.14+ | Linguagem principal do backend |
| Streamlit | 1.58.0 | Interface web do chatbot |
| LangChain | 1.3.2 | Orquestração do pipeline RAG |
| ChromaDB | 1.5.9 | Banco vetorial local para embeddings |
| Google Gemini API | gemini-2.5-flash | Modelo LLM para geração de respostas |
| Next.js + TypeScript | Latest | Frontend web público |
| Tailwind CSS | Latest | Estilização do frontend |
| Vercel | Cloud | Deploy e hospedagem do frontend |
| Git / GitHub | 2.54+ | Controle de versão e colaboração |

---

## 🏗️ Arquitetura

```
Usuário
   ↓
Frontend Web (Next.js + Vercel) — https://segurai-ten.vercel.app/
   ↓
Chatbot IA (Streamlit + Python) — localhost:8501
   ↓
LangChain RAG Pipeline
   ↓
ChromaDB — Busca Semântica Vetorial
   ↓
Base de Conhecimento (.txt em /docs)
   ↓
Google Gemini 2.5 Flash API
   ↓
Resposta contextualizada com citação da fonte
```

---

## 🚀 Instalação e Execução Local

```bash
git clone https://github.com/manoel180/segurai.git
cd segurai
python3 -m venv .venv
source .venv/bin/activate      # Linux/Mac
# .venv\Scripts\activate       # Windows
pip install -r requirements.txt
npm install
```

### Configuração

Crie um arquivo `.env` na raiz:

```
GOOGLE_API_KEY=sua_chave_aqui
```

Gere sua chave em: https://aistudio.google.com/app/apikey

### Executar os dois projetos juntos

```bash
npm run dev
```

Isso inicia simultaneamente:
- **Streamlit** em `http://localhost:8501`
- **Next.js** em `http://localhost:3001`

### Executar separadamente

```bash
# Apenas o chatbot IA
npm run dev:streamlit
# ou
python -m streamlit run app.py

# Apenas o frontend
npm run dev:next
```

---

## 📁 Estrutura do Repositório

```
segurai/
│
├── app.py                  # Backend principal (Streamlit + Gemini + RAG)
├── requirements.txt        # Dependências Python
├── package.json            # Dependências frontend + scripts dev
├── .env                    # Chave da API (não commitado)
├── .gitignore
├── README.md
│
├── src/                    # Código-fonte do frontend (Next.js)
│   ├── app/page.tsx        # Página principal
│   ├── assets/             # Logo e imagens
│   └── lib/rag.ts          # Integração RAG no frontend
│
├── public/                 # Assets públicos (logo, imagens)
├── docs/                   # Base de conhecimento RAG (.txt)
│   ├── faq_seguros.txt
│   ├── coberturas_auto.txt
│   ├── coberturas_residencial.txt
│   ├── sinistro.txt
│   ├── pagamento_cancelamento.txt
│   └── glossario_seguros.txt
│
├── chroma_db_local/        # Banco vetorial ChromaDB (gerado automaticamente)
├── diagramas/              # Diagramas de arquitetura
├── evidencias/             # Prints e evidências de execução
├── relatorio/              # Relatório final em PDF
└── logs/                   # Logs de interações (gerado automaticamente)
```

---

## 📚 Base de Conhecimento (RAG)

Os documentos utilizados pelo RAG ficam em `/docs/` com extensão `.txt` e cobrem:

- **faq_seguros.txt** — 30 perguntas frequentes sobre seguros
- **coberturas_auto.txt** — Coberturas do seguro automóvel
- **coberturas_residencial.txt** — Coberturas do seguro residencial
- **sinistro.txt** — Procedimentos para abertura de sinistro
- **pagamento_cancelamento.txt** — Segunda via, cancelamento, endosso
- **glossario_seguros.txt** — Termos técnicos do setor

---

## 🔧 Solução de Problemas

- Se `npm run dev` encerrar cedo, confirme se `.venv/` existe e se `npm install` foi executado.
- Se a porta `3001` estiver ocupada, pare o processo antigo ou ajuste `dev:next` em `package.json`.
- Se o chat retornar erro de API, confirme a variável `GOOGLE_API_KEY` no arquivo `.env`.
- Se o Streamlit não for encontrado, use `python -m streamlit run app.py`.

---

## ⚠️ Aviso

O SegurAI fornece respostas informativas baseadas nos documentos configurados e **não substitui análise oficial da seguradora**. Para casos complexos, urgentes ou que envolvam dados pessoais, o sistema recomenda atendimento humano especializado.

---

*InsurTech Minds — Programa InsurMinds / I2A2 Academy — 2026*
