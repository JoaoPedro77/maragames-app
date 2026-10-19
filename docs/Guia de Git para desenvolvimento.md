# Git — Guia Rápido de Desenvolvimento

Guia de consulta rápida para uso do Git durante o desenvolvimento de projetos.

---

## 1. Comandos principais

|Comando|Para que serve|
|---|---|
|`git init`|Inicializa um repositório Git|
|`git clone <url>`|Clona um repositório existente|
|`git status`|Mostra o estado atual dos arquivos|
|`git add <arquivo>`|Adiciona arquivo à área de staging|
|`git add .`|Adiciona todas as alterações ao staging|
|`git commit -m "mensagem"`|Cria um commit|
|`git log`|Exibe o histórico de commits|
|`git diff`|Mostra alterações ainda não adicionadas ao staging|
|`git diff --staged`|Mostra alterações que estão no staging|
|`git push`|Envia commits para o repositório remoto|
|`git pull`|Baixa e integra alterações do remoto|
|`git fetch`|Baixa alterações do remoto sem integrá-las|
|`git remote -v`|Exibe os repositórios remotos configurados|
|`git stash`|Guarda alterações temporariamente|
|`git stash pop`|Recupera alterações guardadas no stash|

### Fluxo básico

```bash
git status
git add .
git commit -m "tipo: descrição"
git push
```

---

# 2. Branches

Branches permitem desenvolver funcionalidades, correções ou outras alterações **isoladamente**, sem modificar diretamente a branch principal.

### Criar branch

```bash
git switch -c feature/login
```

### Trocar de branch

```bash
git switch feature/login
```

### Listar branches

```bash
git branch
```

### Deletar branch local

```bash
git branch -d feature/login
```

### Enviar branch para o remoto

```bash
git push -u origin feature/login
```

---

# 3. Branches mais comuns

## `main`

Representa a versão **estável/pronta para produção** do projeto.

```text
main
```

Evite desenvolver diretamente nela.

---

## `develop`

Utilizada como branch de **integração do desenvolvimento** em fluxos que adotam Git Flow.

```text
develop
```

As funcionalidades são integradas nela antes de uma release.

> Nem todo projeto utiliza `develop`. Em fluxos mais simples, `main` pode ser suficiente.

---

## `feature/*`

Utilizada para desenvolver **novas funcionalidades**.

```text
feature/login
feature/cadastro-usuario
feature/dashboard
feature/api-clientes
```

Normalmente parte de `develop` ou `main`, dependendo do fluxo adotado.

---

## `fix/*` / `bugfix/*`

Utilizada para corrigir bugs encontrados durante o desenvolvimento.

```text
fix/erro-login
fix/calculo-total
bugfix/validacao-email
```

---

## `hotfix/*`

Utilizada para correções **urgentes em produção**.

```text
hotfix/erro-pagamento
hotfix/falha-autenticacao
```

No Git Flow, normalmente parte da `main`.

---

## `release/*`

Utilizada para preparar uma nova versão para produção.

```text
release/1.2.0
release/2.0.0
```

Pode conter ajustes finais, correções, documentação e atualização de versão.

---

## `docs/*`

Utilizada especificamente para alterações de documentação.

```text
docs/documentacao-api
docs/documentacao-codigo
```

Nem toda equipe utiliza esse tipo de branch; pode-se utilizar `feature/*` para documentação também.

---

# 4. Exemplo de fluxo

Um fluxo baseado em Git Flow:

```text
                    feature/login
                   /
develop ──────────●───────────────●
                  \
                   feature/clientes
                          \
                           ●

develop
   │
   └── release/1.0.0
            │
            ▼
           main
```

Para um projeto menor, pode ser simplesmente:

```text
main
 │
 ├── feature/login
 ├── feature/clientes
 ├── fix/erro-login
 └── docs/documentacao
```

---

# 5. Tipos de commit

Um padrão bastante utilizado é o **Conventional Commits**:

```text
tipo: descrição
```

### Tipos principais

|Tipo|Uso|
|---|---|
|`feat`|Nova funcionalidade|
|`fix`|Correção de bug|
|`docs`|Documentação|
|`refactor`|Refatoração sem mudança de comportamento|
|`test`|Criação/alteração de testes|
|`style`|Formatação, espaços, lint etc.|
|`chore`|Manutenção/configurações|
|`build`|Build/dependências|
|`ci`|CI/CD|
|`perf`|Melhoria de performance|

### Moldes

```text
feat: adiciona <funcionalidade>
```

```text
fix: corrige <problema>
```

```text
docs: documenta <módulo/funcionalidade>
```

```text
refactor: reorganiza <código/módulo>
```

```text
test: adiciona testes para <funcionalidade>
```

```text
style: ajusta formatação de <arquivo/módulo>
```

```text
chore: atualiza <configuração/dependência>
```

### Exemplos

```text
feat: adiciona autenticação de usuários
```

```text
fix: corrige cálculo do valor total
```

```text
docs: documenta módulo de autenticação
```

```text
refactor: separa lógica de autenticação
```

```text
test: adiciona testes para criação de usuários
```

---

# 6. Boas práticas de commit

### Faça commits pequenos e lógicos

```text
feat: adiciona modelo de usuário
test: adiciona testes de usuário
docs: documenta modelo de usuário
```

Evite:

```text
update
alterações
coisas
final
mudanças
```

### Prefira mensagens objetivas

```text
feat: adiciona endpoint de clientes
```

Em vez de:

```text
feat: fiz algumas alterações no código dos clientes
```

### Regra prática

> **1 commit deve representar uma alteração lógica.**

---

# 7. Pull Request

Um **Pull Request (PR)** é utilizado para propor a integração de uma branch em outra.

Exemplo:

```text
feature/login → develop
```

ou:

```text
feature/login → main
```

### Estrutura básica

```text
Título:
<tipo>: <descrição>

Descrição:

## O que foi feito
- <alteração 1>
- <alteração 2>

## Como testar
- <passo 1>
- <passo 2>

## Observações
- <informação relevante>
```

### Exemplo

```text
Título:
feat: adiciona autenticação de usuários

## O que foi feito
- Adiciona login de usuários
- Implementa validação de credenciais
- Adiciona endpoint de autenticação

## Como testar
- Executar a aplicação
- Acessar POST /login
- Enviar usuário e senha válidos

## Observações
- Testes automatizados foram adicionados.
```

---

# 8. Fluxo completo de uma tarefa

```bash
# Atualizar a branch base
git switch develop
git pull

# Criar branch
git switch -c feature/nova-funcionalidade

# Desenvolver...

# Verificar alterações
git status
git diff

# Preparar alterações
git add .

# Criar commit
git commit -m "feat: adiciona nova funcionalidade"

# Enviar branch
git push -u origin feature/nova-funcionalidade
```

Depois:

```text
GitHub
   ↓
Create Pull Request
   ↓
Revisão
   ↓
Aprovação
   ↓
Merge
   ↓
Branch base
```

---

# 9. Fluxo rápido para consultar durante o desenvolvimento

```text
┌─────────────────────────────────────────┐
│              DESENVOLVIMENTO            │
└─────────────────────────────────────────┘

1. Atualizar branch base
   git pull

2. Criar branch
   git switch -c feature/nome

3. Desenvolver

4. Verificar
   git status
   git diff

5. Commit
   git add .
   git commit -m "tipo: descrição"

6. Enviar
   git push -u origin feature/nome

7. Criar Pull Request
   feature/nome → branch base

8. Após aprovação
   Merge
```

### Regra geral

```text
Branch → Desenvolver → Commit → Push → PR → Review → Merge
```

**Convenção recomendada para começar:**

```text
Branches:
feature/*
fix/*
docs/*
hotfix/*
release/*

Commits:
feat:
fix:
docs:
refactor:
test:
style:
chore:
build:
ci:
perf:
```