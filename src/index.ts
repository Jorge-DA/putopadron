/**
 * #  ██████╗███████╗████████╗██████╗ ██╗ ██████╗ ██████╗    ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
 * # ██╔════╝██╔════╝╚══██╔══╝██╔══██╗██║██╔════╝██╔═══██╗   ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
 * # ██║     █████╗     ██║   ██████╔╝██║██║     ██║   ██║   ██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
 * # ██║     ██╔══╝     ██║   ██╔══██╗╚═╝██║     ██║   ██║   ██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
 * # ╚██████╗███████╗   ██║   ██║  ██║██╗╚██████╗╚██████╔╝██╗██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
 * #  ╚═════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 */

import dotenv from 'dotenv';
import fs from 'fs-extra'
import path from "path";
const fmt = require('fmt');

dotenv.config();

import './database';
import app from './app';

(async () => {
  const simba = await fs.readFileSync(path.join(__dirname, '../assets/Simba-ASCII-78-black.ans'));
  const server = await app.listen(app.get('port'));
  console.log(simba.toString('utf8'));
  fmt.sep();
  fmt.title(`{${app.get('pkg').name}} - ${app.get('pkg').description}`);
  fmt.field('\x1b[37mServer', `\x1b[33m${app.get('port')}\x1b[0m`);
  fmt.field('\x1b[37mStatus', `\x1b[33m${app.get('env')}\x1b[0m`);
})();