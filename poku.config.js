// poku.config.js
import { reactTestingPlugin } from "@pokujs/react/plugin";
import { defineConfig } from "poku";

/**
 * CONFIGURAÇÃO DO POKU (Baseada na documentação oficial do Poku + Problemas de integração com o Node.js + TSX - Experiência própria)
 * Este arquivo centraliza como os testes devem ser executados pelo Poku.
 */
export default defineConfig({
  /**
   * Execução Sequencial:
   * No Windows, ao usar o plugin de React com o DOM global, rodar os testes
   * um por um (sequencialmente) evita conflitos onde um teste tenta ler
   * ou modificar o DOM ao mesmo tempo que outro.
   */
  sequential: true,

  /**
   * Plugins:
   * Aqui registramos extensões que adicionam novas funcionalidades ao Poku.
   */
  plugins: [
    /**
     * Plugin Oficial do React:
     * Habilita o suporte para renderizar componentes .tsx e .jsx.
     */
    reactTestingPlugin({
      /**
       * Adaptador de DOM:
       * O 'happy-dom' é uma biblioteca leve que simula as APIs do navegador
       * (como document e window) no Node.js, permitindo que o React funcione
       * fora de um browser real.
       */
      dom: "happy-dom",
    }),
  ],
});
