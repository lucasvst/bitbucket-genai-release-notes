import puppeteer  from 'puppeteer';

export default async function (htmlContent: string, outputPath: string) {
  const style = `
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 16px;
      }
      h1 {
        font-size: 24px;
        margin-bottom: 8px;
      }
      p {
        font-size: 16px;
        margin-bottom: 8px;
      }
      ul {
        list-style-type: disc;
        margin-left: 20px;
      }
      li {
        margin-bottom: 4px;
      }
      a {
        color: blue;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
`
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(`${style}${htmlContent}`);
  await page.pdf({ path: outputPath, format: 'A4' });
  await browser.close();
}