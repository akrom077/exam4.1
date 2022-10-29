let elGrote = document.querySelector("#box");
const elForm = document.querySelector(".js-form");
const elInput = elForm.querySelector(".js-input")


function fetching (e) {
  e.preventDefault()
  const inputValue = elInput.value.trim().toLowerCase()
  console.log(inputValue);

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
  .then((res) => res.json())
  .then(res2 => renderData(res2[0]))
}

function renderData (data) {
  console.log(data.phonetics[0].text );
  elGrote.innerHTML = `
      <h2 class="word">
        <span>${data.word}</span>-<span>${data.phonetics[0].text === undefined ? data.phonetics[1].text : ""}</span>
      </h2>
      <ul class="meneger">
      ${
        data.meanings.map(el => (
          `
          <li class="li"> 
              <h3 class="h3">${el.partOfSpeech}</h3>
              ${
                el.definitions.map(tex => (
                `
                <div class="text-box">
                  <p>${tex.definition}</p>
                  <i>
                  ${tex.example === undefined ? "" : tex.example}
                  </i>
                </div>

                `
              ))
            }
          
            </li>

          `
        ))
      } 
      </ul>
      <p class="text"></p>
      <p class="text2"></p>
      <audio class="audio" controls muted>
        <source src="horse.ogg" type="audio/ogg">
        <source src="${data.phonetics[0].audio}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
  `
}



elForm.addEventListener("submit", fetching)


