// js/commands/ClearCommand.js
// Depende de Command.js

class ClearCommand extends Command {
    constructor(terminal) {
        super(terminal, "clear", "Limpa a tela do terminal.");
    }

    execute(args) {
        this._terminal.clear();
    }
}