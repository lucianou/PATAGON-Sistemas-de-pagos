const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://146.83.216.166:4003/');
        await driver.wait(until.elementLocated(By.id('email')), 10000); 

        let emailField = await driver.findElement(By.id('email'));
        await emailField.sendKeys('userpatagon2024@uach.cl');

        let passwordField = await driver.findElement(By.id('password'));
        await passwordField.sendKeys('patagon1234');

        let loginButton = await driver.findElement(By.xpath('//button[text()="Ingresar"]'));
        await loginButton.click();

        await driver.sleep(2000); 

        await driver.get('http://146.83.216.166:4003/account/purchase-history');
        
        await driver.sleep(2000); 

        let currentUrl = await driver.getCurrentUrl();
        console.log('URL actual después de redirigir:', currentUrl);

        let downloadButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(), "Descargar Cartola de Compras")]')), 10000);
        
        await downloadButton.click();

        await driver.sleep(10000);

        console.log("Botón de descarga PDF presionado.");

    } finally {
        await driver.quit();
    }
}

// Ejecutar la prueba
runTest().catch(console.error);
