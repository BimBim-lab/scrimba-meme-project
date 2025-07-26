import {catsData} from './data.js';
const getImageBtn = document.getElementById('get-image-btn')
const emotionRadios = document.getElementById('emotion-radios')
const gifOnlyOption = document.getElementById('gifs-only-option')
const memesContainer = document.getElementById('meme-modal-inner')
const closeModalBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', headlightSelectedEmotion)
getImageBtn.addEventListener('click', renderImageToDOM)
closeModalBtn.addEventListener('click', closeModal)



function getEmotionsArray(cats){
    const emotionArray=[]
    cats.forEach(function(cat){
        cat.emotionTags.forEach(function(emotion){
            if(!emotionArray.includes(emotion)){
                emotionArray.push(emotion)
            }
        })

    })
    return emotionArray
}


function renderEmotionCat(cats){
    const emotionArray = getEmotionsArray(cats)
    emotionArray.forEach(function(emotion){
        emotionRadios.innerHTML += `
        <div class="radio">
            <label for="${emotion}-option">${emotion}</label>
            <input type="radio" name="emotion" value="${emotion}" id="${emotion}-option">
        </div>`
    })

}

renderEmotionCat(catsData)


function headlightSelectedEmotion(e){
    const allEmotions = document.querySelectorAll('.radio input')
    allEmotions.forEach(function(emotion){
        document.getElementById(emotion.id).parentElement.classList.remove('highlight')
    })
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}


function getEmotionImages (){
    const selectedEmotion = document.querySelector('input[name="emotion"]:checked')
    if (!selectedEmotion) {
        return;
    }
    const selectedCatsArray = catsData.filter(function(cat){
        if (gifOnlyOption.checked) {
            return cat.emotionTags.includes(selectedEmotion.value) && cat.isGif;
        }
        return cat.emotionTags.includes(selectedEmotion.value);
    })
    return selectedCatsArray;

}
 
function getRandomImage(){
    const catArray = getEmotionImages()
    if (catArray.length === 0) {
        return;
    }
    else {
        const randomIndex = Math.floor(Math.random() * catArray.length)
        return catArray[randomIndex]
    }

}

function renderImageToDOM(){
    const randomCat = getRandomImage()
    document.getElementById('meme-modal').style.display = 'flex';
    if (!randomCat) {
        memesContainer.innerHTML = `<p>No images found for this emotion.</p>`;
        return;
    }
    memesContainer.innerHTML = `
        <img src="images/${randomCat.image}" alt="${randomCat.alt}">
    `;

}

function closeModal() {
    document.getElementById('meme-modal').style.display = 'none';
    memesContainer.innerHTML = '';
}



