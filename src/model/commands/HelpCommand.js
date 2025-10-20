// js/commands/HelpCommand.js
// Depende de Command.js

class HelpCommand extends Command {
    _allCommands; 

    constructor(terminal, allCommands) {
        // [COMENTÁRIO MESTRE]: Herança.
        super(terminal, "help", "Mostra a lista de comandos disponíveis.");
        this._allCommands = allCommands;
    }

    execute(args) {
        this._terminal.printOutput("--- Guia de Comandos: XCellCorp V2097 ---");
        this._allCommands.forEach(cmd => {
            this._terminal.printOutput(`> ${cmd.name}: ${cmd.description}`);
        });
        this._terminal.printOutput("---------------------------------------");
    }
}