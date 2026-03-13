const pinGrid = document.getElementById("pinGrid");
const categoryRow = document.getElementById("categoryRow");
const searchInput = document.getElementById("searchInput");
const createModal = document.getElementById("createModal");
const detailModal = document.getElementById("detailModal");
const createForm = document.getElementById("createForm");
const openCreate = document.getElementById("openCreate");
const heroCreate = document.getElementById("heroCreate");
const closeCreate = document.getElementById("closeCreate");
const cancelCreate = document.getElementById("cancelCreate");
const closeDetail = document.getElementById("closeDetail");
const toast = document.getElementById("toast");

const detailImage = document.getElementById("detailImage");
const detailCategory = document.getElementById("detailCategory");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const detailTags = document.getElementById("detailTags");
const detailAuthor = document.getElementById("detailAuthor");

const pins = [
  {
    title: "Soft morning studio",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    category: "Interior",
    tags: ["minimal", "beige", "sunlight"],
    description: "Textured walls, natural light, and linen upholstery.",
    author: "Nila Carver"
  },
  {
    title: "Street fashion drop",
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    tags: ["monochrome", "street", "editorial"],
    description: "Layered neutrals with a crisp black accent.",
    author: "Jae Kim"
  },
  {
    title: "Calm coastline",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    category: "Travel",
    tags: ["ocean", "pastel", "sunrise"],
    description: "Gentle gradient skies over quiet water.",
    author: "Aria Bloom"
  },
  {
    title: "Product desk light",
    image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80",
    category: "Product",
    tags: ["desk", "hardware", "ambient"],
    description: "Understated aluminum with soft back glow.",
    author: "Milo Hart"
  },
  {
    title: "Bold color blocking",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    category: "Graphic",
    tags: ["print", "vibrant", "poster"],
    description: "High contrast palette for launch campaigns.",
    author: "Sana Duarte"
  },
  {
    title: "Cafe corner",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
    category: "Interior",
    tags: ["warm", "coffee", "plants"],
    description: "Terracotta tones and greenery for cozy nooks.",
    author: "Leo Finch"
  },
  {
    title: "Outdoor essentials",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    category: "Product",
    tags: ["pack", "gear", "utility"],
    description: "Compact kit for fast trips and weekend hikes.",
    author: "Tessa Roy"
  },
  {
    title: "Muted fashion set",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    tags: ["runway", "muted", "editorial"],
    description: "Sculptural silhouettes with soft tailoring.",
    author: "Rin Ocampo"
  },
  {
    title: "Nordic living",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    category: "Interior",
    tags: ["scandi", "light wood", "calm"],
    description: "Light oak, white walls, and olive accents.",
    author: "Sara Nordin"
  },
  {
    title: "Citrus gradient",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    category: "Graphic",
    tags: ["gradient", "poster", "sunset"],
    description: "Punchy oranges and soft magenta fade.",
    author: "Ivy Cho"
  },
  {
    title: "Night lights",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    category: "Travel",
    tags: ["city", "bokeh", "noir"],
    description: "Downtown blues with neon reflections.",
    author: "Kai Moreno"
  },
  {
    title: "Studio shelfie",
    image: "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=900&q=80",
    category: "Product",
    tags: ["shelf", "arrangement", "neutral"],
    description: "Textured ceramics and stacked books.",
    author: "Pia Ortega"
  }
];

let activeCategory = "All";

const categories = ["All", ...Array.from(new Set(pins.map(p => p.category)))];

function renderCategories() {
  categoryRow.innerHTML = "";
  categories.forEach(cat => {
    const pill = document.createElement("button");
    pill.className = "pill" + (cat === activeCategory ? " active" : "");
    pill.textContent = cat;
    pill.onclick = () => {
      activeCategory = cat;
      renderPins();
    };
    categoryRow.appendChild(pill);
  });
}

function createPinCard(pin, index) {
  const card = document.createElement("article");
  card.className = "pin";
  card.dataset.index = index;

  const img = document.createElement("img");
  img.src = pin.image;
  img.alt = pin.title;
  card.appendChild(img);

  const body = document.createElement("div");
  body.className = "pin-body";

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = pin.title;
  body.appendChild(title);

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = pin.description;
  body.appendChild(desc);

  const chips = document.createElement("div");
  chips.className = "chips";
  pin.tags.forEach(tag => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = tag;
    chips.appendChild(chip);
  });
  body.appendChild(chips);

  card.appendChild(body);
  card.onclick = () => openDetail(pin);
  return card;
}

function renderPins() {
  const term = searchInput.value.trim().toLowerCase();
  pinGrid.innerHTML = "";
  const filtered = pins.filter(p => {
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const haystack = [p.title, p.description, p.tags.join(" "), p.category].join(" ").toLowerCase();
    const matchSearch = !term || haystack.includes(term);
    return matchCategory && matchSearch;
  });
  filtered.forEach((pin, idx) => pinGrid.appendChild(createPinCard(pin, idx)));
}

function openDetail(pin) {
  detailImage.src = pin.image;
  detailImage.alt = pin.title;
  detailCategory.textContent = pin.category;
  detailTitle.textContent = pin.title;
  detailDescription.textContent = pin.description;
  detailTags.innerHTML = "";
  pin.tags.forEach(tag => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = tag;
    detailTags.appendChild(chip);
  });
  detailAuthor.textContent = `Saved by ${pin.author}`;
  detailModal.classList.remove("hidden");
}

function closeDetailModal() {
  detailModal.classList.add("hidden");
}

function openCreateModal() {
  createModal.classList.remove("hidden");
}

function closeCreateModal() {
  createModal.classList.add("hidden");
  createForm.reset();
}

function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(createForm);
  const newPin = {
    title: formData.get("title"),
    image: formData.get("image"),
    tags: (formData.get("tags") || "").split(",").map(t => t.trim()).filter(Boolean),
    description: formData.get("description") || "Shared via Printest.",
    category: "Custom",
    author: "You"
  };
  pins.unshift(newPin);
  if (!categories.includes("Custom")) {
    categories.push("Custom");
    renderCategories();
  }
  renderPins();
  closeCreateModal();
  showToast();
});

searchInput.addEventListener("input", renderPins);
openCreate.addEventListener("click", openCreateModal);
heroCreate.addEventListener("click", openCreateModal);
closeCreate.addEventListener("click", closeCreateModal);
cancelCreate.addEventListener("click", closeCreateModal);
closeDetail.addEventListener("click", closeDetailModal);
detailModal.addEventListener("click", (e) => { if (e.target === detailModal) closeDetailModal(); });
createModal.addEventListener("click", (e) => { if (e.target === createModal) closeCreateModal(); });

renderCategories();
renderPins();
