async function start() {
  const users = await fetchUsers();
  renderFilteredUsers(users);
}

async function fetchUsers() {
  const resource = await fetch('http://localhost:3001/users');
  const json = await resource.json();
  const allUsers = json.map(user => {
    const { name, picture, dob, gender } = user;

    return {
      name: name.first + " " + name.last,
      profile: picture.medium,
      age: dob.age,
      gender: gender
    };
  });

  return allUsers;
}

function renderFilteredUsers(users) {
  const filteredSectionHTML = document.querySelector("#filtered-users");
  let filteredUsersHTML = '<div>';
  const mainText = document.querySelector(".main-text");
  const subMainText = document.querySelector(".submain-text");
  const input = document.querySelector("#search");
  const status = document.querySelector(".status");
  let count = 0;
  let femaleCount = 0;
  let maleCount = 0;
  let ageTotal = 0;
  let ageAverage = 0;

  input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      users.forEach(user => {
        if (user.name.toLowerCase().includes(input.value.toLowerCase())) {
          const userHTML = ` 
          <div class = "user">
            <div class = "profile-image">
            <img class="rounded-full flex-1" src="${user.profile}" alt="${user.name}">
            </div>
            <div> ${user.name}, ${user.age} anos </div>
          </div>
          `;
          filteredUsersHTML += userHTML;
          count++;
          subMainText.innerHTML = "Estatisticas";
          if (user.gender === "female") {
            femaleCount++;
          } else {
            maleCount++;
          }
          ageTotal += user.age;
        }
      });
      ageAverage = ageTotal / count;
      const statistics = `
      <p>Sexo masculino: ${maleCount} </p>
      <p>Sexo feminino: ${femaleCount} </p>
      <p>Soma das idades: ${ageTotal} </p>
      <p>Média das idades: ${ageAverage} </p>
      `;
      status.innerHTML = statistics;
      mainText.innerHTML = `${count} usuário(s) filtrado(s)`;
      filteredUsersHTML += '</div>';
      filteredSectionHTML.innerHTML = filteredUsersHTML;
      filteredUsersHTML = '<div>';
      count = 0;
      ageAverage = 0;
      ageTotal = 0;
      femaleCount = 0;
      maleCount = 0;
    }
  });
}
start();
