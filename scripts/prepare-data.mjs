import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

const inputFile = path.join(process.cwd(), 'public', 'N01-07L-2K_Road.shp.geojson.gz');
const outputFile = path.join(process.cwd(), 'public', 'N01-07L-2K_Road.shp.geojson');

async function decompress() {
  // 出力ファイルが既に存在する場合は何もしない（開発中の再起動高速化のため）
  // ただし、CI/CDやDockerビルドでは確実に実行されるようにしたい場合はこのチェックを外すか、
  // 環境変数で制御する。今回はシンプルに、圧縮ファイルの方が新しければ解凍するロジックにする。
  
  if (fs.existsSync(outputFile)) {
    const inputStat = fs.statSync(inputFile);
    const outputStat = fs.statSync(outputFile);
    
    if (outputStat.mtime > inputStat.mtime) {
      console.log('GeoJSON is up to date.');
      return;
    }
  }

  if (!fs.existsSync(inputFile)) {
    console.error('Error: Compressed file not found:', inputFile);
    process.exit(1);
  }

  console.log('Decompressing GeoJSON data...');
  const input = fs.createReadStream(inputFile);
  const output = fs.createWriteStream(outputFile);
  const unzip = zlib.createGunzip();

  try {
    await pipeline(input, unzip, output);
    console.log('Decompression complete:', outputFile);
  } catch (err) {
    console.error('Decompression failed:', err);
    process.exit(1);
  }
}

decompress();
