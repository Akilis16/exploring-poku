# Explorando o Poku no React (TSX)

Este projeto é uma aplicação experimental desenvolvida com **React 19**, **TypeScript** e **Vite**, com o objetivo principal de explorar e validar o uso do framework de testes **Poku** em um ambiente moderno de componentes Web.

## 🚀 O que é o Poku?

O **Poku** é um executor de testes (test runner) focado em ser o mais amigável e simples possível. Ele se destaca por não exigir configurações complexas e por permitir que você escreva testes de forma nativa e intuitiva, integrando-se facilmente com diferentes ferramentas (como o `@pokujs/react`).

### ✅ Vantagens do Poku
- **Configuração Zero:** É extremamente rápido para começar a usar.
- **Leve e Veloz:** Não traz o "peso" de frameworks maiores como o Jest ou Vitest.
- **Multi-Runtime:** Funciona no Node.js, Bun e Deno nativamente.
- **Legibilidade:** Os relatórios de erro são claros e focados no que realmente importa.
- **Plugins:** Possui plugins oficiais para React e suporte para simulação de DOM (`happy-dom`).

### ❌ Desvantagens do Poku
- **Comunidade menor:** Por ser mais novo, possui menos plugins e exemplos na comunidade se comparado ao Vitest ou Jest.
- **Recursos Avançados:** Algumas funcionalidades complexas de "mocking" ou cobertura de código podem exigir passos extras comparado a ferramentas que já trazem tudo embutido.

---

## 🤯 Nossas "Dores de Cabeça" na Integração

Integrar o Poku em um projeto **TSX (React + TypeScript)** trouxe desafios interessantes, principalmente no ambiente Windows:

1.  **Problemas de Caminho no Windows:** O Node.js no Windows tem dificuldades em resolver caminhos absolutos para módulos ESM (o erro `ERR_UNSUPPORTED_ESM_URL_SCHEME`).
    - **Solução:** Tivemos que desativar o isolamento de processo (`--isolation=none`) para que o executor conseguisse ler os arquivos `.tsx` sem conflitos de protocolo.
2.  **Referência ao React:** Em ambientes de execução direta (como o `tsx` usado internamente pelo Poku), o React 19 às vezes exige o import explícito (`import React from 'react'`) nos arquivos de teste e componentes, ou uma diretiva específica (`@jsxImportSource`), para que o código JSX seja processado corretamente.
3.  **Dependências Faltantes:** Componentes visuais modernos (como os usados aqui com `lucide-react`) precisam estar devidamente instalados e mapeados para que o ambiente de teste consiga renderizar os ícones e layouts sem quebrar.
4.  **Conflitos no DOM Global:** Ao rodar sem isolamento, os testes podem "atropelar" uns aos outros no DOM.
    - **Solução:** Ativamos a execução sequencial (`sequential: true`) no `poku.config.js` para garantir que um teste termine antes do próximo começar.

---

## 🛠️ Como rodar os testes

Para executar a suíte de testes (que inclui testes de formatadores e de componentes):

```bash
# Via script do package.json (configurado com --isolation=none)
npm test

# Ou diretamente via npx
npx poku --isolation=none
```

---

*Este projeto foi desenvolvido como parte de um estudo sobre ferramentas emergentes de teste de software.*
