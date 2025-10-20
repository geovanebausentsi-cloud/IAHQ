// js/app.js
// Ponto de entrada e Orquestração (LIGAÇÃO das Classes)
// Depende de TODAS as classes e de data.js

function initializeTerminal() {
    // 1. Instancia o View
    const terminal = new Terminal('content-area', 'input-field');

    // 2. Instancia o Controller
    const commandHandler = new CommandHandler(terminal);
    
    // 3. Liga a View ao Controller (Delegação)
    terminal.setCommandHandler(commandHandler);

    // 4. Registra os Modelos (Comandos) no Controller
    
    // O HelpCommand precisa da lista completa de comandos.
    const allCommandsMap = commandHandler.getAllCommands();
    const helpCommand = new HelpCommand(terminal, allCommandsMap);

    // Registro dos Comandos (Instanciação das Classes Concretas)
    commandHandler.registerCommand(helpCommand);
    commandHandler.registerCommand(new GalleryCommand(terminal, DATA.HQ_IMAGES));
    commandHandler.registerCommand(new CharactersCommand(terminal, DATA.CHARACTERS));
    commandHandler.registerCommand(new ClearCommand(terminal));
    commandHandler.registerCommand(new AboutCommand(terminal, DATA.LORE));

    // 5. Mensagem de Boas-Vindas
    terminal.printOutput("Iniciando 'CYBER_SHELL 3.0'...");
    terminal.printOutput("Conexão estabelecida com a sombra digital. Digite 'help'.");
}

// Inicia a aplicação após o carregamento completo do DOM
window.onload = initializeTerminal;