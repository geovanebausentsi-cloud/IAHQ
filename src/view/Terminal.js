// js/Terminal.js
// VIEW: Responsável por toda a manipulação da interface de usuário (DOM, I/O).

class Terminal {
    _contentElement;
    _inputElement;
    _inputLine;
    _commandHandler; 
    _promptSymbol = "TRASH-PUNK $";

    constructor(contentId, inputId) {
        this._contentElement = document.getElementById(contentId);
        this._inputElement = document.getElementById(inputId);
        this._inputLine = document.getElementById('input-line');

        if (!this._contentElement || !this._inputElement || !this._inputLine) {
            console.error("Elementos DOM do terminal não encontrados!");
            return;
        }

        document.getElementById('terminal-container').addEventListener('click', () => {
            this._inputElement.focus();
        });

        this._inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                this._handleInput();
            }
        });
        this.scrollToBottom();
    }

    // [COMENTÁRIO MESTRE]: Injeção do Controller (CommandHandler).
    setCommandHandler(handler) {
        this._commandHandler = handler;
    }

    _handleInput() {
        const commandString = this._inputElement.value.trim();
        this.printCommand(commandString);

        if (commandString && this._commandHandler) {
            // DELEGAÇÃO para o Controller.
            this._commandHandler.execute(commandString);
        }

        this._inputElement.value = ''; 
        this.scrollToBottom();
    }

    // Métodos de Output (chamados pelos comandos)
    printCommand(command) {
        const line = document.createElement('div');
        line.innerHTML = `<span class="prompt">${this._promptSymbol}</span> ${command}`;
        line.classList.add('line');
        this._contentElement.insertBefore(line, this._inputLine);
    }

    printOutput(text) {
        const output = document.createElement('div');
        output.textContent = text;
        output.classList.add('output');
        this._contentElement.insertBefore(output, this._inputLine);
    }

    printError(text) {
        const error = document.createElement('div');
        error.textContent = text;
        error.classList.add('error');
        this._contentElement.insertBefore(error, this._inputLine);
    }

    printHTML(html) {
        const container = document.createElement('div');
        container.innerHTML = html;
        this._contentElement.insertBefore(container, this._inputLine);
    }

    clear() {
        // Limpa tudo, exceto a linha de input
        const children = Array.from(this._contentElement.children);
        children.forEach(child => {
            if (child.id !== 'input-line') {
                this._contentElement.removeChild(child);
            }
        });
    }

    scrollToBottom() {
        this._contentElement.scrollTop = this._contentElement.scrollHeight;
    }
}