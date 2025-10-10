## Como Contribuir

Siga este passo a passo para contribuir com o projeto.

### 1. Clonar o Repositório

Primeiro, você precisa ter uma cópia do projeto na sua máquina. Isso é feito com o comando `git clone`.

```bash
git clone https://github.com/geovanebausentsi-cloud/IAHQ.git
```

Depois de clonar, entre na pasta do projeto:

```bash
cd IAHQ
```

### 2. Criar uma Nova Branch

Nunca trabalhe diretamente na branch `main`. Sempre crie uma nova branch para cada nova funcionalidade ou correção que você for desenvolver.

Use o comando `git checkout -b` seguido do nome da sua branch. É uma boa prática nomear a branch de forma descritiva, por exemplo:

```bash
# Para uma nova funcionalidade
git checkout -b feature/nome-da-funcionalidade

# Para uma correção de bug
git checkout -b fix/descricao-do-bug
```

### 3. Desenvolver e Fazer Commits

Agora você pode trabalhar nos arquivos do projeto. Depois de fazer suas alterações, você precisa adicioná-las e fazer um commit.

```bash
# Verifique os arquivos que você modificou
git status

# Adicione os arquivos que você quer incluir no commit
git add .

# Faça o commit com uma mensagem clara
git commit -m "feat: Descrição da nova funcionalidade"
```

### 4. Enviar a Branch para o GitHub

Depois de fazer seus commits, envie a sua branch para o repositório remoto no GitHub.

```bash
git push -u origin nome-da-sua-branch
```

### 5. Criar um Pull Request (PR)

Com a sua branch no GitHub, o último passo é criar um Pull Request.

1.  Abra o repositório no seu navegador: [https://github.com/geovanebausentsi-cloud/IAHQ](https://github.com/geovanebausentsi-cloud/IAHQ)
2.  O GitHub geralmente mostrará um aviso para criar um Pull Request a partir da sua branch recém-enviada. Clique em "Compare & pull request".
3.  Adicione um título e uma descrição clara para o seu Pull Request, explicando o que você fez.
4.  Clique em "Create pull request".

Seu Pull Request será revisado por outros membros da equipe antes de ser incorporado à branch `main`.
