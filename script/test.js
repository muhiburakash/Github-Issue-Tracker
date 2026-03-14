const loadWordDetails = async (id) => {
  const url = (`https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}`)
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data)
}


const displayWordDetails = (word) => {
  console.log(word)
  const detailsBox = document.getElementById('details-continar');
  detailsBox.innerHTML = `<div>
          <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
        </div>
        <div class="space-y-1">
          <p class="font-medium text-xl">Meaning</p>
          <p class="bangla-font font-medium text-xl">${word.meaning}</p>
        </div>
        <div class="space-y-1">
          <p class="font-medium text-xl">Example</p>
          <p class="text-lg">${word.sentence}</p>
        </div>
        <div class="space-y-1">
          <p class="font-medium text-xl bangla-font">সমার্থক শব্দ গুলো</p>
          <div class=" ">
          ${createElement(word.synonyms)}
          </div>
        </div>`
  document.getElementById('word_modal').showModal()
}