const URL = "https://type.fit/api/quotes"

fetch(URL)
    .then(res => res.json())
    .then(data => {
        handleSetup(data)
    })
    .catch(error => console.log(error))

const quoteList = document.querySelector('#quote-list')
let allQuotes = []

function handleSetup(quotes) {
    allQuotes = quotes

    document.querySelector('#search-quote').addEventListener('input', (e) => {
        const filteredQuotes = quotes.filter(quote => {
            if (!quote.author) return false
            
            return quote.author.toLowerCase().includes(e.target.value.toLowerCase())
        })

        quoteList.innerHTML = ''
        filteredQuotes.forEach(quote => {
            displayQuote(quote)
        })
        
    })

    document.querySelector('#random-quote-button').addEventListener('click', () => {
        getRandomQuote()
    })

    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault()
        
        const quoteTextInput = document.querySelector('#submit-quote-text')
        const quoteAuthorInput = document.querySelector('#submit-quote-author')

        if (quoteTextInput.value.length == 0 || quoteAuthorInput.value.length == 0) {
            alert('Missing Field')
            return
        }

        allQuotes.push({'text': quoteTextInput.value, 'author': quoteAuthorInput.value})

        quoteTextInput.value = ''
        quoteAuthorInput.value = ''
    })
}

function displayQuote(quote) {
    const quoteLi = document.createElement('li')
    quoteLi.classList.add('quote')
    const quoteText = document.createElement('div')
    quoteText.innerText = `"${quote.text}"`
    const quoteAuthor = document.createElement('div')
    quoteAuthor.innerText = `-${quote.author}`
    quoteLi.append(quoteText, quoteAuthor)
    quoteList.append(quoteLi)
}

function getRandomQuote() {
    const randomNum = Math.floor(Math.random() * allQuotes.length)

    document.querySelector('#quote-list').innerHTML = ''
    displayQuote(allQuotes[randomNum])
}