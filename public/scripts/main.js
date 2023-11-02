// Rest API //
const url = 'http://localhost:8081/api/gift';

console.log("Here in Javascript!")

async function getAllGifts() {
    const response = await fetch(url);
    console.log(`Response:`, response)
    if (response.ok) {
        const data = await response.json(); // JSON-ify the data
        console.log(`Data:`, data); //!
        // await addQuote(data);
    }
}

getAllGifts()
console.log("Bottom of Javascript")