
const API = "https://api.jikan.moe/v4";

const app = document.getElementById("anime-list");
const search = document.getElementById("search");

let searchTimer;

async function loadAnime(query = "") {
  if (!app) return;

  app.innerHTML = "<p>⏳ Animelar yuklanmoqda...</p>";

  try {
    const endpoint = query
      ? `${API}/anime?q=${encodeURIComponent(query)}&limit=20`
      : `${API}/top/anime?limit=20`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("API xatosi: " + response.status);
    }

    const result = await response.json();

    app.innerHTML = "";

    if (!result.data || result.data.length === 0) {
      app.innerHTML = "<p>😔 Anime topilmadi.</p>";
      return;
    }

    result.data.forEach(anime => {
      const card = document.createElement("article");
      card.className = "anime-card";

      const image = document.createElement("img");
      image.src = anime.images?.jpg?.large_image_url ||
                  anime.images?.jpg?.image_url || "";
      image.alt = anime.title;
      image.loading = "lazy";

      const info = document.createElement("div");
      info.className = "anime-info";

      const title = document.createElement("h3");
      title.textContent = anime.title;

      const year = document.createElement("p");
      year.textContent = "📅 " + (anime.year || "Noma'lum");

      const score = document.createElement("p");
      score.textContent = "⭐ " + (anime.score || "Baholanmagan");

      info.append(title, year, score);
      card.append(image, info);
      app.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    app.innerHTML =
      "<p>⚠️ Animelar yuklanmadi. Internetni tekshiring va qayta urinib ko‘ring.</p>";
  }
}

if (search) {
  search.addEventListener("input", () => {
    clearTimeout(searchTimer);

    searchTimer = setTimeout(() => {
      loadAnime(search.value.trim());
    }, 600);
  });
}

loadAnime();
