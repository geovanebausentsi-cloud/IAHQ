// js/commands/CharactersCommand.js
// Depende de Command.js

class CharactersCommand extends Command {
    _characters;

    constructor(terminal, characters) {
        super(terminal, "personagens", "Mostra informações sobre os personagens.");
        this._characters = characters;
    }

    execute(args) {
        this._terminal.printOutput("--- Personagens da Trama ---");
        this._characters.forEach(char => {
            this._terminal.printOutput(`> ${char.name} (${char.role}) - Status: ${char.status}`);
        });
        this._terminal.printOutput("--------------------------");
    }
}
