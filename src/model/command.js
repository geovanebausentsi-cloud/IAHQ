// js/Command.js
// CLASSE ABSTRATA BASE (O CONTRATO)
class Command {
    // Propriedades Protegidas (simuladas em JS com '_')
    _terminal;
    name;
    description;

    constructor(terminal, name, description) {
        this._terminal = terminal;
        this.name = name;
        this.description = description;

        if (new.target === Command) {
            throw new TypeError("Não é possível instanciar a classe abstrata Command diretamente.");
        }
    }

    // [COMENTÁRIO MESTRE]: MÉTODO POLIMÓRFICO. Deve ser sobrescrito.
    execute(args) {
        throw new Error(`O método execute() deve ser implementado na subclasse '${this.name}'.`);
    }
}