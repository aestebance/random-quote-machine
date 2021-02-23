import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.scss';

const API = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'];

function App() {
    const [quotes, setQuotes] = useState("");
    const [quote, setQuote] = useState({
        quote: "Life isn’t about getting and having, it’s about giving and being.",
        Author: "Kevin Kruse"
    });
    const [color, setColor] = useState("#16a085");

    const tweetURL = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
        + quote.quote + " - " + quote.author;

    useEffect(() => {
        axios.get(API)
            .then((res) => {
                if (res.status === 200) {
                    setQuotes(res.data.quotes);
                }
            }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        getRandomQuote();
    }, [quotes]);

    const getRandomQuote = () => {
        if (quotes.length > 0) {
            const index = Math.floor(Math.random() * quotes.length);
            setQuote({
                quote: quotes[index].quote,
                author: quotes[index].author
            });
            getRandomColor();
        }
    }

    const getRandomColor = () => {
        if (colors.length > 0) {
            const index = Math.floor(Math.random() * color.length);
            setColor(colors[index]);
        }
    }

    return (
        <div style={{backgroundColor: color}} className="wrapper d-flex vh-100">
            <div id="quote-box" className="box cl-xs-12 col-6 box p-4 rounded">
                <div className="quote-text">
                    <i style={{color: color}} className="fa fa-2x fa-quote-left quote"/>
                    <span className="b-text" style={{color: color}} id="text"> {quote.quote}</span>
                </div>
                <div className="quote-author">
                    <span style={{color: color}} id="author">- {quote.author}</span>
                </div>
                <div className="b-button__container d-flex justify-content-between">
                    <a id="tweet-quote" style={{backgroundColor: color}} href={tweetURL} className="btn b-button__text" target="_blank">
                        <i className="fa fa-lg fa-twitter"/>
                    </a>
                    <button id="new-quote" style={{backgroundColor: color}} className="btn b-button__text" onClick={getRandomQuote}>New quote</button>
                </div>
            </div>
        </div>
    );
}

export default App;
