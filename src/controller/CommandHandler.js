// js/CommandHandler.js
// CONTROLLER: Controla o fluxo de execução e delega para o Modelo.

class CommandHandler {
    _terminal;
    _commands = new Map(); 

    constructor(terminal) {
        // Dependência da View (Terminal).
        this._terminal = terminal;
    }

    registerCommand(command) {
        // [COMENTÁRIO MESTRE]: O Controller armazena referências aos objetos do Modelo.
        this._commands.set(command.name, command);
    }

    getAllCommands() {
        return this._commands;
    }

    execute(commandString) {
        const parts = commandString.trim().split(/\s+/);
        if (parts.length === 0 || parts[0] === "") return;

        const commandName = parts[0].toLowerCase();
        const args = parts.slice(1);

        const commandInstance = this._commands.get(commandName);

        if (commandInstance) {
            // [COMENTÁRIO MESTRE]: POLIMORFISMO!
            commandInstance.execute(args);
        } else {
            this._terminal.printError(`ERRO: Comando '${commandName}' não reconhecido. Tipo 'help'.`);
        }
    }
}