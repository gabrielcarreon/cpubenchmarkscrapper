import puppeteer from "puppeteer";
import fs from "node:fs";
import {scrapObj} from "./scrapObj.js";

let tries = 0
export const scrap = ({ flag }) => (async() => {
  const { link, out, regex } = {...flag}
  const browser = await puppeteer.launch({ headless: true})
  const page = await browser.newPage()
  await page.goto(link)
  await page.on('response',  async (response)=> {
    console.log("running scrapper")
    if(regex.test(response.url())){
      console.log(`saving data to out/${out}`)
      const result = await response.text()
      if(!fs.existsSync(`./out`)) fs.mkdirSync('./out')
      await fs.writeFile(`out/${out}`, result, (err) => {
        if(err) throw err
        tries++
        if(tries < 3) scrap({ flag: flag})
      })
      console.log('scrapping done')
      await page.close()
      process.exit()
    }
  })
})()
