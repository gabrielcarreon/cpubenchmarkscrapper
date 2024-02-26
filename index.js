import puppeteer from "puppeteer"
import fs from "node:fs"

(async() => {
  const browser = await puppeteer.launch({ headless: false})
  const page = await browser.newPage()
  const regex = /^https:\/\/www\.cpubenchmark\.net\/data\/\?.*$/;
  await page.goto('https://www.cpubenchmark.net/CPU_mega_page.html')

  await page.on('response',  async (response)=> {
    if(regex.test(response.url())){
      console.log("MATCH")
      const result = await response.text()
      await fs.writeFile('output/cpu.json', result, (err) => {
        if(err) throw err
      })
      console.log('Kapag naaalala ko ang mga araw na magkasama tayong dalawaa')
    }
  })

})()