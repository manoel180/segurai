# SegurAI

SegurAI tem dois projetos no mesmo repositório:

- `app.py`: app principal em Streamlit para atendimento inicial de seguros.
- `src/`: interface em Next.js/React para apresentação e chat web.

## Requisitos

- Python 3.14+
- `pip`
- Node.js 24+ com `npm`
- Uma chave válida da Google Gemini API

## Instalação

```bash
git clone https://github.com/manoel180/segurai
cd segurai
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com a chave da API:

```env
GOOGLE_API_KEY=sua_chave_aqui
```

O app também aceita `GEMINI_API_KEY` ou `API_KEY`, mas `GOOGLE_API_KEY` é o nome recomendado.

Se ainda não tiver uma chave, gere uma no Google AI Studio:

https://aistudio.google.com/app/apikey

## Executar os projetos

Para subir os dois projetos ao mesmo tempo, use o launcher principal:

```bash
npm run dev
```

Esse comando inicia:

- Streamlit em `http://localhost:8501`
- Next.js em `http://localhost:3001`
- Se um dos processos falhar de verdade, o outro é encerrado automaticamente.
- Os logs aparecem com prefixos `streamlit` e `next`.

Se quiser iniciar apenas um dos projetos:

```bash
npm run dev:next
```

ou

```bash
npm run dev:streamlit
```

Depois abra os endereços exibidos no terminal, normalmente:

```bash
http://localhost:8501
```

e

```bash
http://localhost:3001
```

## Solução de problemas

- Se `npm run dev` encerrar cedo, confira se a pasta `.venv/` existe e se `npm install` já foi executado.
- Se a porta `3001` estiver ocupada, pare o processo antigo ou ajuste `dev:next` em `package.json`.
- Se o chat retornar erro de API, confirme a variável `GOOGLE_API_KEY` no arquivo `.env`.

## Estrutura principal

```text
.
├── app.py
├── docs/
├── public/
├── src/
├── requirements.txt
├── package.json
└── README.md
```

## Observações

- Os documentos usados pelo RAG devem ficar em `docs/` e ter extensão `.txt`.
- Se a chave da API não estiver configurada, o app mostra um erro explícito ao iniciar.
- O logo do Next está sendo servido a partir de `src/assets/`.
