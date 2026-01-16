const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const topBtn = document.getElementById("topBtn");

const mImg = document.getElementById("mImg");
const mName = document.getElementById("mName");
const mCat = document.getElementById("mCat");
const mDesc = document.getElementById("mDesc");
const mPrice = document.getElementById("mPrice");

let data = [];
let currentFilter = "all";

const labelCat = (c) => ({
  signature: "Signature",
  classics: "Classics",
  seasonal: "Seasonal"
}[c] || c);

function render(){
  grid.innerHTML = "";
  const items = data.filter(d => currentFilter === "all" ? true : d.category === currentFilter);

  items.forEach(d => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
  <div class="iconWrap">
    <img src="${d.icon}" alt="" class="icon">
  </div>
  <div class="card__body">
    <h3 class="card__name">${d.name}</h3>
    <p class="card__desc">${d.description}</p>
    <div class="card__row">
      <span class="badge">${labelCat(d.category)}</span>
      <span class="price">${d.price}</span>
    </div>
  </div>
`;
    card.addEventListener("click", () => openModal(d));
    grid.appendChild(card);
  });
}

function openModal(d){
  mImg.src = d.image;
  mImg.alt = d.name;
  mName.textContent = d.name;
  mCat.textContent = labelCat(d.category);
  mDesc.textContent = d.description;
  mPrice.textContent = d.price;
  modal.showModal();
}

closeBtn.addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const isInside = rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right;
  if (!isInside) modal.close();
});

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

fetch("menu.json")
  .then(r => r.json())
  .then(json => { data = json; render(); })
  .catch(() => {
    grid.innerHTML = "<p>Errore caricamento menu.</p>";
  });
