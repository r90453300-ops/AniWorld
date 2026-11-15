
const API = "https://api.jikan.moe/v4";

const app = document.getElementById("anime-list");
const search = document.getElementById("search");

async function loadAnime(query = "") {
  if (!app) return;

  app.innerHTML = "<p>Animelar yuklanmoqda...</p>";

  try {
    const url = query
      ? `${API}/anime?q=${encodeURIComponent(query)}&limit=20`
      : `${API}/top/anime?limit=20`;

    const response = await fetch(url);
    const result = await response.json();

    app.innerHTML = "";

    result.data.forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";

      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="">
        <h3></h3>
        <p>${anime.year || "Yili noma'lum"}</p>
      `;

      card.querySelector("h3").textContent = anime.title;
      app.appendChild(card);
    });
  } catch (error) {
    app.innerHTML = "<p>Yuklashda xatolik. Qayta urinib ko‘ring.</p>";
  }
}

if (search) {
  search.addEventListener("input", () => {
    loadAnime(search.value.trim());
  });
}

loadAnime();
