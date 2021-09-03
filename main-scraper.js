const puppeteer = require('puppeteer');

async function scrape(url_1, url_2) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url_1);
    
    //gets values for cryptocurrencies
    const result = await page.evaluate(() => {
        
        let info = Array.from(document.querySelectorAll('td.cmc-table__cell a')).map((partner) => partner.innerText);
        let topTeninfo = info.slice(0,30);
         
        return topTeninfo;
    });
    //gets urls for crypto images
    const result2 = await page.evaluate(() => {
       
        let img = Array.from(document.querySelectorAll('td.cmc-table__cell img')).map((partner) => partner.src);
        
        let topTenimg = img.slice(0,30); 
        return topTenimg;
    });


    await page.goto(url_2);
    //gets values for normal currencies
    const result3 = await page.evaluate(() => {
        let tablefromWeb2 = document.querySelectorAll("tr");
        const contentsList2 = [...tablefromWeb2];
        return (contentsList2.map(tr => tr.innerText)).slice(0,90);
        
    });
    
    

    browser.close();

    console.log(result,result2,result3);
}

scrape('https://coinmarketcap.com/all/views/all/', "https://www.exchange-rates.org/MajorRates.aspx");  



