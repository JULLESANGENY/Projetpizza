export function handleAdminLogin(e) {
  e.preventDefault();
  const ADMIN_EMAIL = "admin@pizza.fr";
  const ADMIN_PASSWORD = "admin123";
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true");
    window.location.href = "admin.html";
  } else {
    document.getElementById("login-error").style.display = "block";
  }
}


// Gestion des commandes
export function adminCommandes() {
  if (localStorage.getItem("isAdmin") !== "true") {
    window.location.href = "admin-login.html";
    return;
  }

  const commandes = JSON.parse(localStorage.getItem("commandes")) || [
    { id: 1, client: "Filipe", pizzas: ["Reine", "Margherita"], statut: "En cours" },
    { id: 2, client: "Léa", pizzas: ["4 Fromages"], statut: "En cours" }
  ];

  const liste = document.getElementById("liste-commandes");

  function render() {
    liste.innerHTML = "";
    commandes.forEach(cmd => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Commande #${cmd.id}</strong> – Client : ${cmd.client}<br>
        Pizzas : ${cmd.pizzas.join(", ")}<br>
        Statut : <span>${cmd.statut}</span>
        ${cmd.statut !== "Prête" ? `<button class="validate-btn" onclick="markReady(${cmd.id})">Pizza prête</button>` : ""}
      `;
      liste.appendChild(li);
    });
  }

  window.markReady = function(id) {
    const cmd = commandes.find(c => c.id === id);
    if (cmd) cmd.statut = "Prête";
    localStorage.setItem("commandes", JSON.stringify(commandes));
    render();
  };

  render();
}

export function adminPizzas() {
  if (localStorage.getItem("isAdmin") !== "true") {
    window.location.href = "admin-login.html";
    return;
  }

  let pizzas = JSON.parse(localStorage.getItem('pizzas')) || [
    { id: 1, nom: 'Reine', description: 'Tomate, mozzarella, jambon, champignons', prix: 12.90 },
    { id: 2, nom: 'Margherita', description: 'Tomate, mozzarella, basilic', prix: 10.50 }
  ];

  const liste = document.getElementById('liste-pizzas');

  function render() {
    liste.innerHTML = '';
    pizzas.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${p.nom}</strong> – ${p.description} – <span>${p.prix.toFixed(2)}€</span><br>
        <button class="remove-btn" onclick="deletePizza(${p.id})">Supprimer</button>
      `;
      liste.appendChild(li);
    });
  }

  window.deletePizza = function(id) {
    pizzas = pizzas.filter(p => p.id !== id);
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
    render();
  };

  window.ajouterPizza = function (event) {
    event.preventDefault();
    const nom = document.getElementById('nom').value;
    const description = document.getElementById('description').value;
    const prix = parseFloat(document.getElementById('prix').value);

    const nouvelle = { id: Date.now(), nom, description, prix };
    pizzas.push(nouvelle);
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
    event.target.reset();
    render();
  };

  render();
}
