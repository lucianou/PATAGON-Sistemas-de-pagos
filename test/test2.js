const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

// Función para ejecutar la prueba
async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://146.83.216.166:4003/');
        await driver.wait(until.elementLocated(By.id('email')), 10000); 

        
        let emailField = await driver.findElement(By.id('email'));
        await emailField.sendKeys('adminpatagon2024@uach.cl');

       
        let passwordField = await driver.findElement(By.id('password'));
        await passwordField.sendKeys('patagon1234');

       
        let loginButton = await driver.findElement(By.xpath('//button[text()="Ingresar"]'));
        await loginButton.click();

        await driver.sleep(2000); 
        await driver.get('http://146.83.216.166:4003/admin/dashboard-roles');
        
    
        await driver.sleep(3000);
        let currentUrl = await driver.getCurrentUrl();
        console.log('URL actual después de redirigir:', currentUrl);

        let createAdminButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Crear administrador')]")), 10000);
        await createAdminButton.click();

        await driver.sleep(1000); 

        let nombreField = await driver.findElement(By.name('nombre'));
        await nombreField.sendKeys('Nuevo Administrador');

        let emailAdminField = await driver.findElement(By.name('email'));
        await emailAdminField.sendKeys('nuevo.admin@patagon.com');

        let passwordField1 = await driver.findElement(By.name('password'));
        await passwordField1.sendKeys('ContraseñaSegura123');

        let rolSelect = await driver.findElement(By.name('rol'));
        await rolSelect.sendKeys('Admin');

    
        let acceptButton = await driver.findElement(By.xpath("//button[contains(., 'Aceptar')]"));
        await acceptButton.click();

        await driver.sleep(3000); 
        console.log("Administrador creado exitosamente");

    } catch (error) {
        console.error('Error en la prueba:', error);
    } finally {
        await driver.quit();
    }
}

// Ejecutar la prueba
runTest().catch(console.error);
