# Análise e Refatoração do Terminal Interativo

## Como Funciona Atualmente (Estrutura Procedural)

O sistema de terminal atual é construído usando uma abordagem procedural em `terminal.js`. Ele depende de um conjunto de funções e variáveis globais para gerenciar o estado e o comportamento do terminal.

### Pontos-chave da Implementação Atual:

1.  **Manipulação Direta do DOM**: O código interage diretamente com o DOM para criar e adicionar elementos HTML, como linhas de comando (`cmd-line`), saídas (`cmd-output`), e para limpar a tela. Funções como `addLine()` e `addOutput()` são exemplos disso.
2.  **Gerenciamento de Comandos**: Um único `event listener` no campo de input (`cmdInput`) captura o pressionar da tecla "Enter". O valor do input é então processado por uma longa estrutura `if/else if` que verifica o comando digitado e executa a ação correspondente.
3.  **Estado Global**: Variáveis globais como `images` e `currentImageIndex` mantêm o estado da galeria. Isso pode tornar o código difícil de gerenciar e depurar à medida que a aplicação cresce, pois qualquer função pode, teoricamente, modificar essas variáveis.
4.  **Baixo Acoplamento, Baixa Coesão**: Embora as funções sejam pequenas, a lógica de negócios está espalhada. A lógica de renderização da galeria, o processamento de comandos e a manipulação do DOM estão todos no mesmo escopo, o que torna a manutenção mais complexa.

Essa abordagem é funcional para um projeto pequeno, mas se torna limitada e propensa a erros quando novas funcionalidades são adicionadas.

## (Orientação a Objetos)

Para tornar o código mais robusto, escalável e fácil de manter. A ideia é encapsular a lógica em classes, cada uma com uma responsabilidade clara.

### Estrutura de Classes Proposta:

#### 1. `Terminal` (Classe Principal)

Esta seria a classe central que orquestra todo o terminal.

*   **Responsabilidades**:
    *   Gerenciar o ciclo de vida do terminal (inicialização, etc.).
    *   Manter referências aos elementos do DOM (conteúdo, input).
    *   Instanciar e gerenciar o `CommandHandler`.
    *   Fornecer métodos para interagir com a UI, como `printLine()`, `printOutput()`, e `clear()`.

*   **Exemplo de Estrutura**:

```javascript
class Terminal {
    constructor(contentElement, inputElement) {
        this.contentElement = contentElement;
        this.inputElement = inputElement;
        this.commandHandler = new CommandHandler(this); // Passa a si mesma como referência

        this.inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = this.inputElement.value.trim();
                this.commandHandler.execute(command);
                this.inputElement.value = '';
            }
        });
    }

    printLine(prompt, command) {
        // Lógica para adicionar uma linha de comando ao DOM
    }

    printOutput(text) {
        // Lógica para adicionar uma saída ao DOM
    }

    clear() {
        this.contentElement.innerHTML = '';
    }
}
```

#### 2. `CommandHandler` (Gerenciador de Comandos)

Esta classe seria responsável por registrar e executar comandos.

*   **Responsabilidades**:
    *   Manter um mapa de comandos disponíveis (ex: `'help'`, `'clear'`).
    *   Analisar o input do usuário e chamar o comando correspondente.
    *   Lidar com comandos não encontrados.

*   **Exemplo de Estrutura**:

```javascript
class CommandHandler {
    constructor(terminal) {
        this.terminal = terminal;
        this.commands = {
            'help': new HelpCommand(terminal),
            'clear': new ClearCommand(terminal),
            'gallery': new GalleryCommand(terminal),
            // Adicionar outros comandos aqui
        };
    }

    execute(commandString) {
        const [commandName, ...args] = commandString.split(' ');
        const command = this.commands[commandName];

        if (command) {
            command.execute(args);
        } else {
            this.terminal.printOutput(`'${commandName}' não é reconhecido...`);
        }
    }
}
```

#### 3. `Command` (Classe Base e Herança)

Para padronizar os comandos, podemos usar uma classe base abstrata e fazer com que cada comando específico herde dela.

*   **Responsabilidades**:
    *   Definir uma interface comum para todos os comandos (um método `execute()`).

*   **Exemplo de Estrutura**:

```javascript
// Classe base (Abstrata)
class Command {
    constructor(terminal) {
        if (this.constructor === Command) {
            throw new Error("Classe abstrata não pode ser instanciada.");
        }
        this.terminal = terminal;
    }

    execute(args) {
        throw new Error("Método 'execute()' deve ser implementado.");
    }
}

// Comando específico
class HelpCommand extends Command {
    execute(args) {
        this.terminal.printOutput("Comandos disponíveis...");
    }
}

class ClearCommand extends Command {
    execute(args) {
        this.terminal.clear();
    }
}
```

### Vantagens da Abordagem Orientada a Objetos:

1.  **Encapsulamento**: Cada classe tem sua própria responsabilidade e estado interno. A classe `GalleryCommand`, por exemplo, gerenciaria seu próprio estado (`images`, `currentImageIndex`) em vez de poluir o escopo global.
2.  **Escalabilidade**: Adicionar um novo comando se torna trivial. Basta criar uma nova classe que herda de `Command` e registrá-la no `CommandHandler`. Não é mais necessário mexer em uma longa estrutura `if/else if`.
3.  **Manutenibilidade**: O código se torna mais fácil de ler, entender e depurar. Se houver um bug no comando `gallery`, você sabe que a lógica está encapsulada na classe `GalleryCommand`.
4.  **Reutilização**: Componentes como a classe `Command` podem ser reutilizados e estendidos facilmente.
