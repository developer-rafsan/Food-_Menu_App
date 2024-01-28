// card data link
const BASH_LINK = "./foodData.json";

// food data store
let foodData,
// food item
  filterText = ["all", "breakfast", "lunch", "dinner"];

// food fetch data
const dataFetch = async () => {
  try {
    const respond = await fetch(BASH_LINK);
    foodData = await respond.json();
  } catch (error) {
    document.querySelector(".errorText").style.display = "flex";
  }
};

await dataFetch();

const card_group = document.querySelector(".card-group"),
  filter_food = document.querySelector(".filter_food"),
  search_box = document.querySelector("#search_box");

// filter food & search function add or card display
const filterFood = (filter_text) => {
  card_group.innerHTML = "";
  foodData?.forEach((card) => {
    if (
      card.type === filter_text ||
      filter_text === "all" ||
      card.name.toLowerCase().indexOf(filter_text) > -1 ||
      card.name.toLowerCase() === filter_text
    ) {
      const div_card = `
        <div class="card">
          <img src=${card.image}>
          <div class="content">
            <h1>${card.name}</h1>
            <p>${card.text}</p>
          </div>
          <button>$ ${card.price}.00</button>
        </div>`;
      card_group.innerHTML += div_card;
    }
  });
};

filterFood("all");

// filter button display
filterText.forEach((text) => {
  const filter_button = `<li class="filterButton" id=${text}>${text}</li>`;
  filter_food.innerHTML += filter_button;
});

// filter button functionalty
const filterButton = document.querySelectorAll(".filterButton");
filterButton.forEach((button) => {
  button.addEventListener("click", () => {
    filterFood(button.id.toLowerCase());
  });
});

// incloud a search functinalty
search_box.addEventListener("input", (e) => {
  let user_value = e.target.value;
  filterFood(user_value.toLowerCase());
});
