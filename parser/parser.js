import puppeteer from "puppeteer";
import mongoose from "mongoose";
import New from "../models/New.js";

const scrape = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ria.ru/lenta/');
    await page.waitForSelector('.list-item__title');
    await page.waitForSelector('.list-item__image');
    const result = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('.list-item');
        for (let elemtnt of elements) {
            data.push({ title: elemtnt.querySelector('.list-item__title').innerText, image: elemtnt.querySelector('img').getAttribute('src') });
        }
        return data;
    });
    return result;
};

export default scrape;