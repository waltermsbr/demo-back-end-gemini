import fetchImages from "./fetchApis";

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const idText = document.getElementById("id");
const altText = document.getElementById("alt");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
modal.style.display = "none";

const imageGrid = document.querySelector(".image-grid");

// Função para buscar e exibir os dados do endpoint
async function displayImages() {
  const data = await fetchImages();
  try {
    const postsList = data.map(item => {
      return `
            <article data-description="${item.descricao}">
              <figure>
                <img src="${item.imgUrl}" alt="${item.alt}" id="${item._id}" onmouseover="this.style.cursor='pointer';" />
              </figure>
            </article>
          `
    }).join('');
    imageGrid.insertAdjacentHTML('beforeend', postsList)

    // Adicionando eventos de clique para cada imagem carregada
    addImageClickEvents();
  } catch (error) {
    console.error("Erro ao popular página", error);
  }
}

// Função para adicionar os eventos de clique às imagens
function addImageClickEvents() {
  const images = document.querySelectorAll(".image-grid img");
  images.forEach(img => {
    img.addEventListener("click", function () {
      captionText.textContent = "";
      modal.style.display = "block";
      modalImg.src = this.src;

      const article = this.closest("article");
      const description = article ? article.dataset.description : '';
      const caption = description || this.alt;

      captionText.innerHTML = `<p>${caption}</p>`;

      altText.innerHTML = `<p>${this.alt}</p>`

      idText.innerHTML = `<p>${this.id}</p>`

      console.log(this)
    });
  });
}

// Evento de fechar o modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Fechar o modal clicando fora dele
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Chamar a função para buscar e exibir as imagens ao carregar a página
document.addEventListener("DOMContentLoaded", displayImages);
