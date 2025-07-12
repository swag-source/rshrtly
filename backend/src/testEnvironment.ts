import { encode } from "./helper/generateHash";
import { listShortUrlsController } from "./controllers/listGeneratedUrlsController";

console.log('Testing function...')
listShortUrlsController({}, {});
