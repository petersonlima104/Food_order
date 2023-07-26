$(document).ready(function () {
  $("#successModal").on("hidden.bs.modal", function () {
    window.location.href = "/html/produtos.html";
    //location.reload();
    //$("html, body").animate({ scrollTop: 0 }, "slow");
  });
});

document
  .getElementById("pizzaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var pizzaSize = document.querySelector(
      'input[name="pizzaSize"]:checked'
    ).value;
    var pizzaFlavors = Array.from(
      document.querySelectorAll('input[name="pizzaFlavor"]:checked')
    ).map((option) => option.value);

    var drinks = Array.from(
      document.querySelectorAll('input[name="drinks"]:checked')
    ).map((option) => option.value);

    var pizza = {
      size: pizzaSize,
      flavors: pizzaFlavors,
      drinks: drinks,
    };

    addToCart(pizza); // Salvando os dados da pizza no carrinho
  });

var checkboxes = document.querySelectorAll('input[name="pizzaFlavor"]');
var maxAllowed = 4;

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    var checkedCount = document.querySelectorAll(
      'input[name="pizzaFlavor"]:checked'
    ).length;

    if (checkedCount > maxAllowed) {
      this.checked = false;
    }
  });
});

function addToCart(pizza) {
  var cartItems = localStorage.getItem("cartItems");
  var cartItemsArray = cartItems ? JSON.parse(cartItems) : [];

  // Verifica se foram selecionados elementos de cada subgrupo
  if (
    !pizza.size ||
    !Array.isArray(pizza.flavors) ||
    pizza.flavors.length === 0 ||
    !Array.isArray(pizza.drinks) ||
    pizza.drinks.length === 0
  ) {
    // Se algum subgrupo não tiver sido selecionado, exibe o modal de aviso
    $("#warningModal").modal("show");
    return;
  }

  cartItemsArray.push(pizza);
  localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

  updateCartItemCount();

  // Exibe o modal de sucesso após adicionar o item ao carrinho
  $("#successModal").modal("show");
}

function updateCartItemCount() {
  var cartItemsText = localStorage.getItem("cartItems");
  var cartItemsArray = cartItemsText ? JSON.parse(cartItemsText) : [];

  var cartItemCountElement = document.getElementById("cart-item-count");
  cartItemCountElement.textContent = cartItemsArray.length.toString();
}

function selectedSizePizza() {
  // Verifica se nenhum elemento de tamanho da pizza foi selecionado
  var pizzaSizeInputs = document.querySelectorAll('input[name="pizzaSize"]');
  var noPizzaSizeSelected = true;

  pizzaSizeInputs.forEach(function (input) {
    if (input.checked) {
      noPizzaSizeSelected = false;
    }
  });

  // Se nenhum elemento de tamanho da pizza foi selecionado, seleciona o primeiro por padrão
  if (noPizzaSizeSelected && pizzaSizeInputs.length > 0) {
    pizzaSizeInputs[2].checked = true;
  }
}

selectedSizePizza();
updateCartItemCount();
