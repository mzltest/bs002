const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})
let fetch = require('node-fetch')
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function downloadFile(url, dest) {
  const response = await fetch(url, { agent });
  const buffer = await response.buffer();
  await fs.promises.writeFile(dest, buffer);
}

async function mp4link2gif(url) {
  const mp4File = '/tmp/video.mp4';
  const gifFile = '/tmp/video.gif';

  await downloadFile(url, mp4File);

  const { stdout, stderr } = await exec(`./ffmpeg -i ${mp4File} -pix_fmt rgb24 -f gif ${gifFile}`);


  const gifData = await fs.readFile(gifFile);
  const gifBase64 = gifData.toString('base64');

  return { statusCode: 200, headers: { 'Content-Type': 'image/gif' }, body: gifBase64 ,isBase64Encoded:true};
}

exports.handler = async function http(request) {

  if ('queryStringParameters' in request && 'url' in request.queryStringParameters && request.queryStringParameters.url != null) {
    url = request.queryStringParameters.url
  }
  else {
    return { statusCode: 400, json: { 'error': 'no vurl' } }
  }

  return await mp4link2gif(url)

}