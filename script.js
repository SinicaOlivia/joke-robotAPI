const button = document.getElementById("push-button")
const teller = document.getElementById("speaking")

function renderJoke(joke) {
    teller.textContent = joke
}

async function getJokes() {
    const url = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit"

    let joke = ''

    try {
        const response = await fetch(url)  //folosim operatii asincrone; se va face un request dupa care prelucram raspunsul json care se retuneaza sa il avem intr-un format de tip obiect ca sa putem lucra cu el in functia asincrona.

        const data = await response.json()

        if (data.setup) {
            joke = '?🤔?'.split('thinking')  //'${data.setup} ... ${data.delivery}'
        }
        else {
            joke = data.joke
        }
        //console.log(data)
        // console.log(joke)
    }
    catch (e) {
        console.log(e)
    }

    renderJoke(joke) 

    tellMeAJoke(joke)
}

function tellMeAJoke(joke) {
    VoiceRSS.speech({
        key: '5ff4b1b6ab8143f488a977bc3a2f2a9c',
        src: joke,
        hl: 'en-us',
        v: 'John',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

button.addEventListener('click', getJokes) //evenimentul + functia pe care vrem sa o apelam