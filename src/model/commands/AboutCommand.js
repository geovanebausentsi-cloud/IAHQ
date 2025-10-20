// js/commands/AboutCommand.js
// Depende de Command.js

class AboutCommand extends Command {
    _lore;

    constructor(terminal, lore) {
        super(terminal, "about", "Exibe a história (lore) do universo de Brasil, 2097.");
        this._lore = lore;
    }

    execute(args) {
        this._terminal.printOutput("[SOBRE O UNIVERSO DE BRASIL, 2097]");
        this._terminal.printOutput(this._lore);
    }
}