const express = require("express")
const app = express()



async function fetchFunction(url){    
    try {
        const response = await fetch(url);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { fetchFunction }