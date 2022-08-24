import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import puppeteer from "puppeteer";
import scrape from "./parser/parser.js";
import New from "./models/New.js";


const app = express();

const PORT = 5000;

const router = express.Router();
const __dirname = path.resolve();


router.get('/api/data', async (req, res) => {
    const news = await New.find()
    res.json(news)
})


async function start() {
    try {
        await mongoose.connect(`mongodb+srv://rubenTNC:rubenTNC2014@cluster0.qrfssa6.mongodb.net/?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log("все гуд"));
        app.use(express.static(path.resolve(__dirname, 'client')));
        app.use(router);

    } catch (error) {
        console.log(error);
    }
}
start();
async function getNews () {
    let data = await scrape();
    for (let elem of data) {
        let news = new New({
            title: elem.title,
            src: elem.image
        });
        let isNews = await New.findOne({ title: elem.title });
        if (!isNews) {
            await news.save();
        }
    }
}

getNews ();
setInterval(getNews, 300000);






