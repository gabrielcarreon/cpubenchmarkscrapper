import {scrap} from "./scrap.js";
import {scrapObj} from "./scrapObj.js";

if (process.argv.length <= 2){
  throw 'flag missing, try -cpu or -gpu'
}
const flag = process.argv[2]
scrap({ flag: scrapObj[flag]}).then()