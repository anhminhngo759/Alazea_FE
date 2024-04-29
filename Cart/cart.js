import { request, requestWithToken } from "../utils/useRequestHelper.js"

// tạo thanh nav cố định khi di chuỷen khỏi trang đầu
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('#navbar');
  const scrollTop = window.scrollY;

  if (scrollTop > 0) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
});

const userInfo = JSON.parse(localStorage.getItem("userInfo"))

if (!userInfo.id) {
  document.location = "/login/login.html"
}

const loginIcon = document.getElementById("login_link")
const profileIcon = document.getElementById("profile_link")

profileIcon.innerHTML = `
    <i class="fas fa-user"></i>
    ${userInfo.name}
    `
loginIcon.style.display = "none"
profileIcon.style.display = "inline-block"

const handleGetCart = async () => {
  const products = []

  const userCartRes = await requestWithToken({
    url: "cart",
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken")
  })

  userCartRes.data.products?.forEach(product => {
    const foundProduct = products.find(prod => prod.id === product._id)
    if (!foundProduct) {
      const newProduct = {
        id: product._id,
        name: product.name,
        price: product.price - ((product.price * product.discount) / 100),
        quantity: 1,
        image: product.image
      }
      products.push(newProduct)
    } else {
      foundProduct.quantity += 1
    }
  })

  var tbody = document.querySelector('#cartTable tbody');
  tbody.innerHTML = '';

  products.forEach(function (product) {
    var row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}" width="150"></td>
      <td class="decrease-increase">
        <button class="decrease" onclick="handleRemoveProduct('${product.id}')">-</button>
        <span class="quantity">${product.quantity}</span>
        <button class="increase" onclick="handleAddProduct('${product.id}')">+</button>
      </td>
      <td>${product.price}</td>
      <td class="total">${product.price * product.quantity}</td>
      <td><button class="deleteItem" onclick="handleDeleteProduct('${product.id}')"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.appendChild(row);
  });
}

const handleAddProduct = async (productId) => {
  const userCart = await requestWithToken({
    url: "cart",
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken")
  })

  const cartProduct = userCart.data.products
  let newCartProducts = cartProduct.map(product => product._id)
  newCartProducts.push(productId)

  const res = await requestWithToken({
    url: `cart`,
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken"),
    method: "PATCH",
    body: JSON.stringify(newCartProducts)
  })

  console.log({res});
  handleGetCart()

}

const handleRemoveProduct = async (productId) => {
  const userCart = await requestWithToken({
    url: "cart",
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken")
  })

  const cartProduct = userCart.data.products
  const removeIndex = cartProduct.findIndex(prod => prod._id === productId)
  cartProduct.splice(removeIndex, 1);
  
  const newCartProducts = cartProduct.map(product => product._id)

  const res = await requestWithToken({
    url: `cart`,
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken"),
    method: "PATCH",
    body: JSON.stringify(newCartProducts)
  })
  console.log({res});
  handleGetCart()
}

const handleDeleteProduct = async (productId) => {
  const userCart = await requestWithToken({
    url: "cart",
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken")
  })

  const cartProduct = userCart.data.products
  const newCartProducts = cartProduct.filter(prod => prod._id !== productId)

  const res = await requestWithToken({
    url: `cart`,
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken"),
    method: "PATCH",
    body: JSON.stringify(newCartProducts)
  })

  console.log({res});
  handleGetCart()
}

handleGetCart()

document.handleAddProduct = handleAddProduct
document.handleRemoveProduct = handleRemoveProduct
document.handleDeleteProduct = handleDeleteProduct

// console.log({ products });
// function ShowProducts() {

// }

// ShowProducts()

// var Product = [
//   {
//     id: 1,
//     name: "Tranh đông hồ",
//     code: "TC01345",
//     price: "250.000",
//     image: "https://amia.com.vn/wp-content/uploads/2022/05/tranh-treo-tuong-truu-tuong-dai-lua-sac-mau-amia-2275.jpg",
//   },
//   {
//     id: 2,
//     name: "Tranh nghệ thuật",
//     code: "TC013442",
//     price: "550.000",
//     image: "https://leovietnam.vn/wp-content/uploads/2018/12/wide-1.jpg",
//   },
//   {
//     id: 3,
//     name: "Tranh biển cả",
//     code: "TC0134342",
//     price: "130.000",
//     image: "https://furnibuy.com/wp-content/uploads/2020/10/tranh-thuyen-buom-kho-ngang-treo-tuong-dep-hien-dai.jpg",
//   },
//   {
//     id: 4,
//     name: "Tranh bình yên",
//     code: "TC013324",
//     price: "250.000",
//     image: "https://amia.com.vn/wp-content/uploads/2021/07/tranh-treo-tuong-kho-ngang-amia-1115.jpg",
//   },
//   {
//     id: 5,
//     name: 'Tranh mảnh hổ ',
//     code: 'MVN05',
//     price: "250.000",
//     image: "https://tranhsondauthaison.com.vn/wp-content/uploads/2020/12/tranh-phong-canh-22-12-5.jpg",
//   },
//   {
//     id: 6,
//     name: 'Tranh gió trời',
//     code: 'MVN06',
//     price: "250.000",
//     image: "https://i.pinimg.com/736x/59/e7/04/59e704ea3175d2f3b977f5b9e8b5fdb9.jpg",
//   },

//   {
//     id: 7,
//     name: 'Tranh nghệ thuật',
//     code: 'MVN03',
//     price: "250.000",
//     image: "https://i.pinimg.com/736x/d1/11/33/d11133c4112c3db472726e33d0bc3e63.jpg",
//   },
//   {
//     id: 8,
//     name: 'Tranh mặt trời',
//     code: 'MVN04',
//     price: "250.000",
//     image: "https://tranhsondauthaison.com.vn/wp-content/uploads/2021/03/tranh-phong-canh-bien-1-e1615877133272.jpg",
//   },
// ];

// function ShowProducts() {
//   var tbody = document.querySelector('#cartTable tbody');
//   tbody.innerHTML = '';

//   Product.forEach(function (product) {
//     var row = document.createElement('tr');
//     row.innerHTML = `
//       <td><img src="${product.image}" alt="${product.name}" width="150"></td>
//       <td class = "decrease-increase">
//         <button class="decrease">-</button>
//         <input type="text" class="quantity" value="1" min="1">
//         <button class="increase">+</button>
//       </td>
//       <td>${product.price}</td>
//       <td class="total">${product.price}</td>
//       <td><button class="deleteItem" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i></button></td>
//     `;
//     tbody.appendChild(row);
//   });
// }

// function deleteProduct(productId) {
//   var index = Product.findIndex(function (product) {
//     return product.id === productId;
//   });

//   if (index !== -1) {
//     Product.splice(index, 1);
//   }

//   ShowProducts();
//   updateTotalPrice();
// }

// function updateTotalPrice() {
//   var rows = document.querySelectorAll('#cartTable tbody tr');

//   rows.forEach(function (row) {
//     var quantity = parseInt(row.querySelector('.quantity').value);
//     var price = parseFloat(row.querySelector('td:nth-child(3)').innerText);
//     var totalCell = row.querySelector('.total');
//     var totalPrice = quantity * price;
//     totalCell.innerText = totalPrice.toFixed(3);
//   });
// }

// document.querySelector('#cartTable tbody').addEventListener('input', function (event) {
//   if (event.target.classList.contains('quantity')) {
//     updateTotalPrice();
//   }
// });

// document.querySelector('#cartTable tbody').addEventListener('click', function (event) {
//   var target = event.target;
//   if (target.classList.contains('increase')) {
//     var quantityInput = target.parentElement.querySelector('.quantity');
//     quantityInput.value = parseInt(quantityInput.value) + 1;
//     updateTotalPrice();
//   } else if (target.classList.contains('decrease')) {
//     var quantityInput = target.parentElement.querySelector('.quantity');
//     var newValue = parseInt(quantityInput.value) - 1;
//     if (newValue >= 1) {
//       quantityInput.value = newValue;
//       updateTotalPrice();
//     }
//   }
// });

// document.addEventListener('DOMContentLoaded', function () {
//   ShowProducts();
//   updateTotalPrice();
// });



// function loadproduct() {
//   ShowProducts();
//   // listProducts()
// }
