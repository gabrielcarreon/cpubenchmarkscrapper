import puppeteer from "puppeteer"
import fs from "node:fs"

let tries = 0

const cpuScrap = () => (async() => {
  const browser = await puppeteer.launch({ headless: true})
  const page = await browser.newPage()
  const regex = /^https:\/\/www\.cpubenchmark\.net\/data\/\?.*$/;
  await page.goto('https://www.cpubenchmark.net/CPU_mega_page.html')

  await page.on('response',  async (response)=> {
    console.log("running scrapper")
    if(regex.test(response.url())){
      console.log("saving data to out/cpu.json")
      const result = await response.text()
      if(!fs.existsSync(`./out`)) fs.mkdirSync('./out')
      await fs.writeFile('out/cpu.json', result, (err) => {
        if(err) throw err
        tries++
        if(tries < 3) cpuScrap()
      })
      console.log('Kapag naaalala ko ang mga araw na magkasama tayong dalawaa')
      await page.close()
      process.exit()
    }
  })

})()

cpuScrap()

