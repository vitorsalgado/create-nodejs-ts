import Fs from 'fs'
import Path from 'path'
import { register } from 'tsconfig-paths'

const dist: boolean = process.env.DIST_MODE === '1'
let TsConfig

if (dist) {
  TsConfig = {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@app/*': ['./dist/*']
      }
    }
  }
} else if (Fs.existsSync(Path.join(process.cwd(), 'tsconfig.json'))) {
  TsConfig = JSON.parse(Fs.readFileSync(Path.join(process.cwd(), 'tsconfig.json')).toString())
} else {
  TsConfig = {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@app/*': ['./src/*']
      }
    }
  }
}

register({
  baseUrl: TsConfig.compilerOptions.baseUrl,
  paths: TsConfig.compilerOptions.paths
})
