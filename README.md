# SegurAI

SegurAI é um assistente em Streamlit para atendimento inicial de seguros, com base em documentos `.txt` e integração com a Gemini API da Google.

## Requisitos

- Python 3.14+
- `pip`
- Uma chave válida da Google Gemini API

## Instalação

```bash
git clone <url-do-repositorio>
cd segurai
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com a chave da API:

```env
GOOGLE_API_KEY=sua_chave_aqui
```

O app também aceita `GEMINI_API_KEY` ou `API_KEY`, mas `GOOGLE_API_KEY` é o nome recomendado.

Se ainda não tiver uma chave, gere uma no Google AI Studio:

https://aistudio.google.com/app/apikey

## Executar o projeto

Com a virtualenv ativada, inicie o app com:

```bash
streamlit run app.py
```

Depois abra o endereço exibido no terminal, normalmente:

```bash
http://localhost:8501
```

## Estrutura principal

```text
.
├── app.py
├── documents/
├── requirements.txt
└── README.md
```

## Observações

- Os documentos usados pelo RAG devem ficar em `documents/` e ter extensão `.txt`.
- Se a chave da API não estiver configurada, o app mostra um erro explícito ao iniciar.
