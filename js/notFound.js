// Verifica o status da página carregada
function checkPageStatus() {
  // Verifica se ocorreu um erro de "Página Não Encontrada" (404)
  if (window.location.href.includes("404.html")) {
    redirectToAnotherPage();
  }

  // Verifica se o arquivo HTML não pôde ser encontrado
  // Adicione sua verificação personalizada aqui, por exemplo:
  // if (window.location.href.includes("meu-arquivo.html")) {
  //   redirectToAnotherPage();
  // }
}

// Redireciona para outra página
function redirectToAnotherPage() {
  window.location.href = "notFound.html";
}

checkPageStatus();
