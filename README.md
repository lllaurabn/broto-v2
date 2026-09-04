# Broto — Landing Page de Clínica Pediátrica

Landing page estática desenvolvida para a disciplina de Desenvolvimento de Soluções para Clínica de Saúde, referente ao **Projeto 01 — Landing Page Estática**.

A proposta foi criar o site de uma clínica pediátrica fictícia, a **Broto**, apresentando os serviços, a equipe e a estrutura da clínica de um jeito acolhedor e diferente do formato tradicional de site de clínica.

## Sobre o projeto

Em vez do menu no topo da página, a navegação fica em um trilho fixo na lateral esquerda, com as seções numeradas de 01 a 10 (como um sumário). Conforme a pessoa rola a página, a seção atual acende no trilho. No celular, esse trilho vira uma barra no topo com um indicador de página e um menu.

## Tecnologias usadas

- HTML5
- CSS3 (sem framework — todo o layout e as animações de hover/scroll foram feitos à mão)
- JavaScript puro
- [GSAP](https://gsap.com/) + ScrollTrigger, para as animações de entrada e o acompanhamento da seção ativa no trilho
- Google Fonts — Kalam (títulos) e Quicksand (texto)

## Estrutura de arquivos

```
├── index.html          → estrutura e conteúdo da página
├── style.css            → todo o estilo visual
├── script.js             → animações, navegação e interações
└── images/
    ├── ambiente-cantinho.jpg
    ├── ambiente-recepcao.jpg
    ├── ambiente-brinquedoteca.jpg
    ├── ambiente-atendimento.jpg
    ├── equipe-helena.jpg
    ├── equipe-lucas.jpg
    └── equipe-marina.jpg
```

## Como executar o projeto

Não precisa de servidor nem de instalação de nada. É só:

1. Baixar (ou clonar) este repositório mantendo a pasta `images/` junto dos arquivos `index.html`, `style.css` e `script.js`.
2. Abrir o arquivo `index.html` diretamente no navegador (duplo clique, ou clique com o botão direito → "Abrir com" → seu navegador).

Se preferir rodar com um servidor local (opcional, mas evita qualquer bloqueio de navegador com arquivos locais):

```bash
# dentro da pasta do projeto
python3 -m http.server 8000
```

E depois acessar `http://localhost:8000` no navegador.

> **Importante:** as animações usam a biblioteca GSAP carregada via CDN, então é necessário estar conectado à internet para que a página funcione com as animações. Sem internet, a página ainda abre e mostra o conteúdo, só que sem as animações de entrada e sem o destaque automático da seção ativa no trilho.

## Requisitos do enunciado

| Requisito | Status |
|---|---|
| Título da aba | ✅ |
| Mínimo de 2 imagens dos serviços | ✅ (4 fotos reais da clínica) |
| Descrição dos serviços | ✅ |
| Equipe fictícia (mín. 3, com foto e cargo) | ✅ |
| Mínimo 2 níveis de cabeçalho | ✅ (h1, h2 e h3) |
| Formulário estático (Nome, E-mail, Cidade, Estado) | ✅ (sem processamento após o envio) |

## Autor
Laura Barbosa

