const starsEl = document.querySelector('.stars');


// a starsCount az üzenetek többszöröse lehet!!!!
const starsCount = 5;
messages = ["We're sorry to hear that you had a bad eyperience. We would like to learn more about what happened and how we can make things right.", "We apologize for the inconvenience you experienced. We appreciater your feedback and would like to work with you to address any issues. ", "Thank you for your feedback. We're sorry to hear that your experience wasn't perfect. We wuld love to hear more about your concerns to see how we can improve ", "Thank you for your positive feedback! We're glad to know that you had a great eperience and we appreciate your support. ",
    "Excellent! We're thrilled to hear you had such a positive exprience. Thank you for choosing our platrofm "];
//ezt akár elmenthetjük localStorage-ba


let ratings = JSON.parse(localStorage.getItem('ratings'));

function renderRating() {
    let sum = 0;

    ratings.forEach(item => {
        // console.log(item, ratings.length)
        sum += Number.parseInt(item);
    });

    sum = sum / ratings.length;


    // console.log('kererkitett' + Math.floor(sum), ratings, sum);
    starsEl.innerHTML = '';
    for (i = 0; i < starsCount; i++) {

        //starsEl.innerHTML += '<i class="fa-regular fa-star"></i>'

        const starElement = document.createElement('i');
        if (i == Math.floor(sum)) {
            if (sum - i != 0) {
                starElement.classList.add('fa-star-half-stroke', 'fa-regular');
            } else {
                starElement.classList.add('fa-regular', 'fa-star');
            }
        }
        else if (sum < i) {
            starElement.classList.add('fa-regular', 'fa-star');
        }
        else {
            starElement.classList.add('fa-solid', 'fa-star');
        }



        starElement.setAttribute('data-rating-value', i + 1);
        starElement.addEventListener('click', sendFeedback)
        starsEl.appendChild(starElement)
    }

}



//beküldjük a ratinget
function sendFeedback(event) {
    const value = event.target.getAttribute('data-rating-value');
    ratings.push(value);
    localStorage.setItem('ratings', JSON.stringify(ratings));



    let ratio = starsCount / messages.length //ez
    messageIndex = Math.ceil(value / ratio)
    //console.log(starsCount, messages.length, ratio, 'index: ' + messageIndex)
    const ratingMessage = document.querySelector('.rating-footer p');
    ratingMessage.innerText = messages[messageIndex - 1];


    renderRating();
}



renderRating();
