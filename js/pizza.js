// Chargement des données de la pizza depuis sessionStorage
const data = JSON.parse(sessionStorage.getItem("pizza"));

if (data) {
  const img = document.getElementById("pizza-img");
  const name = document.getElementById("pizza-name");
  const desc = document.getElementById("pizza-desc");
  const price = document.getElementById("pizza-price");

  img.src = "img/" + data.image;
  img.alt = data.nom;
  name.textContent = data.nom;

  if (data.nom === 'Pizza Reine') {
    desc.innerHTML = `
      Sauce tomate, mozzarella, jambon, champignons de Paris.<br><br>
      <strong>INFORMATIONS NUTRITIONNELLES & ALLERGÈNES</strong><br>
      Pour vous, nous avons évalué les calories et les valeurs nutritionnelles de nos produits sur la base d'une portion de 100g. Mais malgré l’attention portée à la répartition équilibrée des ingrédients sur cette portion, il se peut que ces valeurs varient légèrement.
      <div class="nutrition">
        <table>
          <tr><th>Énergie</th><td>987 kJ / 235 kcal</td></tr>
          <tr><th>Matières grasses</th><td>7,3 g</td></tr>
          <tr><th>Dont acides gras saturés</th><td>3,6 g</td></tr>
          <tr><th>Glucides</th><td>30 g</td></tr>
          <tr><th>Dont sucres</th><td>2,5 g</td></tr>
          <tr><th>Fibres</th><td>2,3 g</td></tr>
          <tr><th>Protéines</th><td>11 g</td></tr>
          <tr><th>Sel</th><td>1,3 g</td></tr>
          <tr><th>Allergènes</th><td>Gluten, Lait</td></tr>
        </table>
      </div>
    `;
  } else if (data.nom === 'Pizza Margherita') {
    desc.innerHTML = `
      Sauce tomate, mozzarella, basilic frais.<br><br>
      <strong>INFORMATIONS NUTRITIONNELLES & ALLERGÈNES</strong><br>
      Simples et authentiques, les ingrédients de notre Margherita font ressortir le vrai goût italien.
      <div class="nutrition">
        <table>
          <tr><th>Énergie</th><td>1020 kJ / 244 kcal</td></tr>
          <tr><th>Matières grasses</th><td>8,0 g</td></tr>
          <tr><th>Dont acides gras saturés</th><td>3,8 g</td></tr>
          <tr><th>Glucides</th><td>31 g</td></tr>
          <tr><th>Dont sucres</th><td>2,2 g</td></tr>
          <tr><th>Fibres</th><td>2,5 g</td></tr>
          <tr><th>Protéines</th><td>10 g</td></tr>
          <tr><th>Sel</th><td>1,1 g</td></tr>
          <tr><th>Allergènes</th><td>Gluten, Lait</td></tr>
        </table>
      </div>
    `;
  } else if (data.nom === 'Pizza 4 Fromages') {
    desc.innerHTML = `
      Sauce tomate, mozzarella, bleu, chèvre, emmental.<br><br>
      <strong>INFORMATIONS NUTRITIONNELLES & ALLERGÈNES</strong><br>
      Un mélange onctueux de quatre fromages fondus, pour les vrais amateurs de fromage !
      <div class="nutrition">
        <table>
          <tr><th>Énergie</th><td>1100 kJ / 263 kcal</td></tr>
          <tr><th>Matières grasses</th><td>10,5 g</td></tr>
          <tr><th>Dont acides gras saturés</th><td>5,1 g</td></tr>
          <tr><th>Glucides</th><td>29 g</td></tr>
          <tr><th>Dont sucres</th><td>2,7 g</td></tr>
          <tr><th>Fibres</th><td>2,6 g</td></tr>
          <tr><th>Protéines</th><td>13 g</td></tr>
          <tr><th>Sel</th><td>1,5 g</td></tr>
          <tr><th>Allergènes</th><td>Gluten, Lait</td></tr>
        </table>
      </div>
    `;
  } else {
    desc.textContent = data.description;
  }

  price.textContent = data.prix.toFixed(2) + "€";
}

// Fonction pour ajouter au panier
function ajouterAuPanier() {
  const panier = JSON.parse(sessionStorage.getItem("panier")) || [];
  const existante = panier.find(p => p.nom === data.nom);
  if (existante) {
    existante.qty += 1;
  } else {
    panier.push({ nom: data.nom, prix: data.prix, qty: 1 });
  }
  sessionStorage.setItem("panier", JSON.stringify(panier));
  alert(`🍕 ${data.nom} ajoutée au panier !`);
}
