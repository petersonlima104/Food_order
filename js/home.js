//Função para exibir a contagem de itens no carrinho
function updateCartItemCount() {
  var cartItemsText = localStorage.getItem("cartItems");
  var cartItemsArray = JSON.parse(cartItemsText);
  var cartItemCount = cartItemsArray ? cartItemsArray.length : 0;

  // Atualize a contagem de itens no ícone do carrinho em todas as páginas
  var cartItemCountElements =
    document.getElementsByClassName("cart-item-count");
  for (var i = 0; i < cartItemCountElements.length; i++) {
    cartItemCountElements[i].textContent = cartItemCount.toString();
  }
}

updateCartItemCount();

// Atualize a contagem de itens no ícone do carrinho quando a página for carregada
document.addEventListener("DOMContentLoaded", updateCartItemCount);
