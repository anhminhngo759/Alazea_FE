import { request } from "../utils/useRequestHelper.js";
const userInfo = JSON.parse(localStorage.getItem("userInfo"))


const cartIcon = document.getElementById("cart_link")
const loginIcon = document.getElementById("login_link")
const profileIcon = document.getElementById("profile_link")

profileIcon.innerHTML = userInfo.id ? `
  <i class="fas fa-user"></i>
  ${userInfo.name}
  ` : ""

cartIcon.style.display = userInfo.id ? "inline-block" : "none" 
loginIcon.style.display = userInfo.id ? "none" : "inline-block"
profileIcon.style.display = userInfo.id ? "inline-block" : "none" 


window.addEventListener('scroll', function () {
  const navbar = document.querySelector('#navbar');
  const scrollTop = window.scrollY;

  if (scrollTop > 0) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
});




var Product = [
  {
    id: 1,
    name: "Tranh đông hồ",
    code: "TC01345",
    price: "250.000",
    image: "https://amia.com.vn/wp-content/uploads/2022/05/tranh-treo-tuong-truu-tuong-dai-lua-sac-mau-amia-2275.jpg",
  },
  {
    id: 2,
    name: "Tranh nghệ thuật",
    code: "TC013442",
    price: "550.000",
    image: "https://leovietnam.vn/wp-content/uploads/2018/12/wide-1.jpg",
  },
  {
    id: 3,
    name: "Tranh biển cả",
    code: "TC0134342",
    price: "130.000",
    image: "https://furnibuy.com/wp-content/uploads/2020/10/tranh-thuyen-buom-kho-ngang-treo-tuong-dep-hien-dai.jpg",
  },
  {
    id: 4,
    name: "Tranh bình yên",
    code: "TC013324",
    price: "250.000",
    image: "https://amia.com.vn/wp-content/uploads/2021/07/tranh-treo-tuong-kho-ngang-amia-1115.jpg",
  },
  {
    id: 5,
    name: 'Tranh mảnh hổ ',
    code: 'MVN05',
    price: "250.000",
    image: "https://tranhsondauthaison.com.vn/wp-content/uploads/2020/12/tranh-phong-canh-22-12-5.jpg",
  },
  {
    id: 6,
    name: 'Tranh gió trời',
    code: 'MVN06',
    price: "250.000",
    image: "https://i.pinimg.com/736x/59/e7/04/59e704ea3175d2f3b977f5b9e8b5fdb9.jpg",
  },

  {
    id: 7,
    name: 'Tranh nghệ thuật',
    code: 'MVN03',
    price: "250.000",
    image: "https://i.pinimg.com/736x/d1/11/33/d11133c4112c3db472726e33d0bc3e63.jpg",
  },
  {
    id: 8,
    name: 'Tranh mặt trời',
    code: 'MVN04',
    price: "250.000",
    image: "https://tranhsondauthaison.com.vn/wp-content/uploads/2021/03/tranh-phong-canh-bien-1-e1615877133272.jpg",
  },
];

function ShowProducts() {
  for (let i = 0; i <= Product.length - 1; i++) {
    var demo = '<div class="col-3">';
    demo += '<a href="/detail/detail.html">';
    demo += '<div class="card" style="width: 18rem; border: none">';
    demo += '<img src="' + Product[i].image + '" class="card-img-top" style="height: 170px; width: 270px; border: none;">';
    demo += '<div class="card-body">';
    demo += '</div>';
    demo += '</a>';
    demo += '</div>';
    console.log(demo);
    document.getElementById("picture").innerHTML += demo;
  }
}

function listProducts() {
  for (let i = 0; i <= 3; i++) {
    var demo = '<div class="col-3">';
    demo += '<div class="card" style="width: 18rem; border:  none">';
    demo += '<img src="' + Product[i].image + '" class="card-img-top" style="height: 170px; width: 270px; border: none;">';
    // Đặt kích thước ảnh là 100% chiều rộng và 400px chiều cao
    demo += '<div class="card-body">';
    demo += '<h5 class="card-title">' + Product[i].name + '</h5>';
    demo += '<p class="card-text price-red">' + Product[i].price + 'VNĐ</p>';
    demo += '</div>';
    demo += '</div>';
    demo += '</div>';
    console.log(demo);
    document.getElementById("sanphammoi").innerHTML += demo;
  }
}

function loadproduct() {
  ShowProducts();
  listProducts()
}

const getCategories = async () => {
  const res = await request({ url: "categories", method: "GET" })
  const listCate = document.getElementById("list_categories")

  res.data.forEach((category) => {
    const divTag = document.createElement("div")
    divTag.classList.add("cate_item")
    divTag.textContent = category.name
    listCate.appendChild(divTag)
  })

}

getCategories()