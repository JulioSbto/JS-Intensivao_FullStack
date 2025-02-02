const productsByRestaurant = {
  restaurant1: [
    {
      id: 1,
      image:
        "https://lh3.googleusercontent.com/p/AF1QipPfblgkBB_TCNNg2U_ejvA3_XKZmnvbYK9W-vQy=s1360-w1360-h1020",
      name: "J-Mega Burguer Deluxe",
      description:
        "Contém dois pedaços de carne bovina, queijo cheddar, cebola caramelizada e molho especial da casa.",
      price: 19.99,
    },
    {
      id: 2,
      image:
        "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/103eca6a504379a0df6f55155b8d607d.webp?itok=0iu1IWt6",
      name: "Pizza Portuguesa - G",
      description:
        "Pizza grande de massa artesanal com presunto de Parma, ovos, mussarela, azeitona, tomate e cebola.",
      price: 38.5,
    },
    {
      id: 3,
      image:
        "https://us.123rf.com/450wm/tiverylucky/tiverylucky1405/tiverylucky140500100/28577226-bangkok-tailndia-8-de-maio-de-2014-lata-de-coca-cola-deitado-no-gelo-coca-cola-%C3%A9-um-dos.jpg",
      name: "Coca-Cola Original 350ml",
      description: "Coca-Cola em Lata - 350ml.",
      price: 5.0,
    },
  ],
  restaurant2: [
    {
      id: 4,
      image:
        "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/748820d3f99bb30d57f7b187c555f974.webp?itok=-EVtEHcV",
      name: "Macarrão Bechamel",
      description: "Clássico macarrão tipo penne com molho branco cremoso.",
      price: 22.9,
    },
    {
      id: 5,
      image:
        "https://www.receiteria.com.br/wp-content/uploads/espaguete-a-carbonara-730x480.jpeg",
      name: "Espaguete à carbonara",
      description: "Macarrão com gema de ovo, bacon e queijo minas",
      price: 37.9,
    },
    {
      id: 6,
      image:
        "https://www.receiteria.com.br/wp-content/uploads/lasanha-de-frango-730x480.jpeg",
      name: "Lasanha de Frango",
      description: "Lasanha de frango com molho branco - 900g.",
      price: 65.9,
    },
  ],
  restaurant3: [
    {
      id: 7,
      image:
        "https://clubedereceitas.com.br/wp-content/webp-express/webp-images/uploads/2019/08/costela-de-porco-ao-molho-barbecue.jpg.webp",
      name: "Costela de Porco",
      description: "Costela de porco com molho barbecue acompanhada de arroz, feijão tropeiro e macaxeira frita, serve 2 pessoas.",
      price: 64.98,
    },
    {
      id: 8,
      image:
        "https://portal6.com.br/wp-content/uploads/2022/09/picanha-e1662730930221.jpg",
      name: "Picanha Argentina",
      description: "Picanha Argentina acompanhada de arroz, feijão tropeiro, vinagrete e batata frita, serve 3 pessoas.",
      price: 150.0,
    },
    {
      id: 9,
      image:
        "https://www.minhareceita.com.br/app/uploads/2020/09/Medalhao-de-frango-com-bacon-e-molho-madeira-desktop.jpg",
      name: "Medalhão de Frango",
      description: "Três medalhões de frango com bacon",
      price: 9.99,
    },
  ],
};

let cart = Array.isArray(JSON.parse(localStorage.getItem("cart")))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
let discount = 0;
let currentRestaurant = "restaurant1";

const switchRestaurant = (restaurant, element) => {
  currentRestaurant = restaurant;

  const allCards = document.querySelectorAll(".restaurant-card");
  allCards.forEach((card) => card.classList.remove("selected"));

  element.classList.add("selected");

  renderProducts();
};

const renderProducts = () => {
  const productList = document.getElementById("product-list");
  const products = productsByRestaurant[currentRestaurant];
  productList.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">R$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${
                  product.id
                })">Adicionar ao carrinho</button>
            </div>
        </div>
    `
    )
    .join("");
};

const addToCart = (productId) => {
  const product = productsByRestaurant[currentRestaurant].find(
    (p) => p.id === productId
  );

  if (product) {
    cart.push(product);
    renderCart();
  }
};

const renderCart = () => {
  const cartItems = document.getElementById("cart-items");
  const subtotalElem = document.getElementById("subtotal");
  const discountElem = document.getElementById("discount");
  const totalElem = document.getElementById("total");

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
    subtotalElem.textContent = `R$0.00`;
    totalElem.textContent = `R$0.00`;
    return;
  }

  let subtotal = 0;
  cartItems.innerHTML = cart
    .map((item, index) => {
      subtotal += item.price;
      return `
        <div class="cart-item">
          <span>${item.name}</span>
          <span>R$${item.price.toFixed(2)}</span>
          <button class="remove-button" onclick="removeFromCart(${index})">Remover</button>
        </div>
      `;
    })
    .join("");

  const total = subtotal - (subtotal * discount) / 100;

  subtotalElem.textContent = `R$${subtotal.toFixed(2)}`;
  discountElem.textContent = `${discount}%`;
  totalElem.textContent = `R$${total.toFixed(2)}`;

  saveCartToLocalStorage();
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  renderCart();
};

const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const applyCoupon = () => {
  const couponInput = document.getElementById("coupon-code");
  const applyButton = document.querySelector(".coupon button");

  if (applyButton.classList.contains("applied")) {
    alert("O Cupom já foi aplicado.");
    return;
  }

  switch (couponInput.value.trim().toUpperCase()) {
    case "DESCONTO10":
      discount = 10;
      break;

    case "DESCONTO20":
      discount = 20;
      break;

    default:
      alert("Cupom inválido.");
      discount = 0;
      applyButton.classList.remove("applied");
      applyButton.textContent = "Aplicar Cupom";

      return;
  }

  applyButton.classList.add("applied");
  applyButton.textContent = "Cupom Aplicado";
  couponInput.value = "";

  renderCart();
};

renderProducts();
renderCart();
