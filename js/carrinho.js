// Preços dos sabores e bebidas
var flavorPrices = {
  Margherita: 0.0,
  Calabresa: 0.0,
  "Quatro Queijos": 0.0,
  Portuguesa: 0.0,
  "Frango com Catupiry": 0.0,
  Muçarela: 0.0,
  Mexicana: 0.0,
  "Filé com Fritas": 0.0,
  Coração: 0.0,
  "Filé com Palha": 0.0,
  Camarão: 0.0,
  "Chocolate Preto": 0.0,
  Brigadeiro: 0.0,
  "Chocolate Branco": 0.0,
};

var drinkPrices = {
  Sem_bebida: 0.0,
  "Coca-cola 2 litros": 12.0,
  "Graraná Antartica 2 litros": 10.0,
  "Fanta Laranja 2 litros": 10.0,
};

function loadCartFromLocalStorage() {
  var cartItems = document.getElementById("cartItems");
  var cartItemsText = localStorage.getItem("cartItems");

  if (cartItemsText) {
    renderCartItems(JSON.parse(cartItemsText));
  }
}

function removeItemFromCart(item) {
  var cartItemsText = localStorage.getItem("cartItems");
  var cartItemsArray = JSON.parse(cartItemsText);

  // Procurar o item no array e remover pelo índice
  var itemIndex = cartItemsArray.findIndex((cartItem) => {
    return (
      cartItem.size === item.size &&
      arraysEqual(cartItem.flavors, item.flavors) &&
      arraysEqual(cartItem.drinks, item.drinks)
    );
  });

  if (itemIndex !== -1) {
    cartItemsArray.splice(itemIndex, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
    updateCartItemCount();
    renderCartItems(cartItemsArray); // Atualiza a lista de itens no carrinho após a remoção
  }
}

function renderCartItems(items) {
  var cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = ""; // Limpa os itens atuais no carrinho

  items.forEach((item) => {
    var listItem = document.createElement("div");
    listItem.className = "cart-item";

    var itemContent = document.createElement("div");
    itemContent.className = "cart-item-content";

    var pizzaSize = document.createElement("p");
    pizzaSize.textContent = "Tamanho: " + item.size;
    itemContent.appendChild(pizzaSize);

    var pizzaFlavors = document.createElement("p");
    pizzaFlavors.textContent =
      "Sabores: " + (item.flavors ? item.flavors.join(", ") : "N/A");
    itemContent.appendChild(pizzaFlavors);

    var drinks = document.createElement("p");
    drinks.textContent =
      "Bebidas: " + (item.drinks ? item.drinks.join(", ") : "N/A");
    itemContent.appendChild(drinks);

    var total = document.createElement("p");
    total.textContent =
      "Valor Total: R$" + calculateTotalPrice(item).toFixed(2);
    itemContent.appendChild(total);

    listItem.appendChild(itemContent);

    var removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", function () {
      removeItemFromCart(item);
      updateTotalPrice();
    });

    listItem.appendChild(removeButton);
    cartItemsDiv.appendChild(listItem);
  });
}

function calculateTotalPrice(item) {
  var totalPrice = 0;

  if (item.flavors) {
    item.flavors.forEach(function (flavor) {
      totalPrice += flavorPrices[flavor];
    });
  }

  if (item.drinks) {
    item.drinks.forEach(function (drink) {
      totalPrice += drinkPrices[drink];
    });
  }

  // Adicionando o preço do tamanho da pizza diretamente na função
  if (item.size === "Pequena") {
    totalPrice += 30.0;
  } else if (item.size === "Media") {
    totalPrice += 50.0;
  } else if (item.size === "Grande") {
    totalPrice += 80.0;
  }

  return totalPrice;
}

function arraysEqual(a, b) {
  // Função para verificar se dois arrays são iguais
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

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

function createWhatsAppMessage(cartItemsArray, totalPrice) {
  var message = "Olá, gostaria de fazer o pedido com os seguintes itens:\n";

  cartItemsArray.forEach(function (item, index) {
    var itemText =
      "Item " +
      (index + 1) +
      ": Tamanho: " +
      item.size +
      ", Sabores: " +
      (item.flavors ? item.flavors.join(", ") : "N/A") +
      ", Bebidas: " +
      (item.drinks ? item.drinks.join(", ") : "N/A") +
      ", Valor Total: R$" +
      calculateTotalPrice(item).toFixed(2) +
      "\n";
    message += itemText;
  });

  message += "\nPreço Total: R$" + totalPrice;

  return encodeURIComponent(message);
}

function calculateTotalPriceForCart(cartItems) {
  var totalPrice = 0;
  cartItems.forEach(function (item) {
    totalPrice += calculateTotalPrice(item);
  });
  return totalPrice;
}

function updateTotalPrice() {
  var cartItemsText = localStorage.getItem("cartItems");
  var cartItemsArray = cartItemsText ? JSON.parse(cartItemsText) : [];
  var totalPrice = calculateTotalPriceForCart(cartItemsArray);
  document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}

function openWhatsAppWithMessage(message) {
  // Substitua "seu_numero" pelo número de telefone que receberá a mensagem
  var phoneNumber = "5551980533399";
  // Monta o link com o número e a mensagem
  var url =
    "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + message;

  window.open(url, "_blank");
}

// checando se o carrinho esta vazio
function checkCartNotEmpty() {
  var cartItemsText = localStorage.getItem("cartItems");
  var cartItemsArray = cartItemsText ? JSON.parse(cartItemsText) : [];

  if (cartItemsArray.length === 0) {
    $("#emptyCartModal").modal("show"); // Abrindo mensagem modal
    return false;
  }

  return true;
}

document
  .getElementById("finalizarCompraBtn")
  .addEventListener("click", function () {
    if (checkCartNotEmpty()) {
      var cartItemsText = localStorage.getItem("cartItems");
      var cartItemsArray = cartItemsText ? JSON.parse(cartItemsText) : [];
      var totalPrice = calculateTotalPriceForCart(cartItemsArray);

      // Cria a mensagem a ser enviada no WhatsApp
      var whatsappMessage = createWhatsAppMessage(cartItemsArray, totalPrice);

      // Abre o WhatsApp com a mensagem pronta para envio
      openWhatsAppWithMessage(whatsappMessage);

      // Limpar o carrinho após a compra
      localStorage.removeItem("cartItems");
      updateCartItemCount();
      updateTotalPrice();
      renderCartItems([]); // Limpa a lista de itens no carrinho após a compra
    }
  });

// Atualize o preço total quando a página for carregada
document.addEventListener("DOMContentLoaded", function () {
  updateTotalPrice();
});

// Atualize a contagem de itens no ícone do carrinho quando a página for carregada
document.addEventListener("DOMContentLoaded", function () {
  updateCartItemCount();
  loadCartFromLocalStorage();
});
