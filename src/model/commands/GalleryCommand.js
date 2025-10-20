// js/commands/GalleryCommand.js
// Depende de Command.js

class GalleryCommand extends Command {
    _images;

    constructor(terminal, images) {
        super(terminal, "gallery", "Exibe uma página da HQ. Uso: gallery [numero] ou gallery all");
        this._images = images;
    }

    execute(args) {
        const arg = args[0];

        if (arg === 'all') {
            this._terminal.printOutput("[CARREGANDO TODAS AS PÁGINAS...]");
            this._images.forEach((imageData, index) => {
                const pageNum = index + 1;
                this._terminal.printOutput(`[PÁGINA ${pageNum} / ${this._images.length}]`);
                this._terminal.printHTML(`<img src="${imageData.path}" alt="${imageData.title}" class="gallery-image"/>`);
                this._terminal.printOutput(`>> Título: ${imageData.title}`);
                this._terminal.printOutput(`>> ${imageData.description}`);
                this._terminal.printOutput(" "); // Adiciona um espaço entre as imagens
            });
            return;
        }

        const pageNum = parseInt(arg) || 1; 

        if (pageNum < 1 || pageNum > this._images.length || isNaN(pageNum)) {
            this._terminal.printError(`ERRO: Página '${arg}' inexistente. Tente um número de 1 a ${this._images.length} ou 'all'.`);
            return;
        }

        const imageData = this._images[pageNum - 1];

        this._terminal.printOutput(`[CARREGANDO PÁGINA ${pageNum} / ${this._images.length}]`);
        this._terminal.printHTML(`<img src="${imageData.path}" alt="${imageData.title}" class="gallery-image"/>`);
        this._terminal.printOutput(`>> Título: ${imageData.title}`);
        this._terminal.printOutput(`>> ${imageData.description}`);
    }
}