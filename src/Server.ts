import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/mongoose";
import {config, rootDir} from "./config";
import { IndexCtrl } from "./controllers/pages/IndexController";


@Configuration({
  ...config,
  mongoose: [
    {
      id: "default",
      url: "mongodb://localhost:27017/alko",
      connectionOptions: {}
    }
  ],
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 3000,
  httpsPort: false, // CHANGE
  mount: {
    "/api/v1/": `${rootDir}/controllers/v1/*.ts`,
    "/api/": `${rootDir}/controllers/*.ts`,
    "/doc/": {
      IndexCtrl
    }
  },
  swagger: [
    {
      path: "/v2/docs",
      specVersion: "2.0"
    },
    {
      path: "/v3/docs",
      specVersion: "3.0.1"
    }
  ],
  views: {
    root: `${rootDir}/views`,
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
