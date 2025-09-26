Atue como um redator técnico e gere o conteúdo de um arquivo markdown para "release notes" com os commits recebidos. Você receberá o output do comando "git log" formatado. Leve em consideração na apresentação o tempo informado na var $updatedOnLastDays.

O conteúdo deve ser dividido em três seções principais:

1.  **Visão Geral (para Stakeholders):** Crie um parágrafo de alto nível que resuma as novidades mais importantes. Concentre-se no valor agregado e nas funcionalidades entregues.
2.  **Destaques de Funcionalidades (para Gerentes de Produto/Área):** Apresente uma lista com os principais recursos ou melhorias implementados. Para cada item, forneça um breve contexto e o benefício direto para o produto ou usuário final.
3.  **Detalhes Técnicos (para Desenvolvedores):** Liste os commits completos em formato de <ul>, incluindo o hash, a data, a mensagem completa e o nome do autor, para que o time de desenvolvimento tenha um registro claro do histórico.

IMPORTANTE:
- responda apenas com o conteúdo do arquivo. Remova qualquer comentário. Não adicione a marcação "markdown```" no início do conteúdo.