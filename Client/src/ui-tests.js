const { Builder, By } = require('selenium-webdriver');

// UI TEST #1
async function siteLoad() {
    const driver = await new Builder().forBrowser('chrome').build();

    await driver.get('localhost:4500');
    await driver.getTitle().then(function (title) {
        setTimeout(function () {
            console.log(title)
            driver.quit()
        }, 5000)
    });
}

// UI TEST #2
async function redirectToGraph() {
    const driver = await new Builder().forBrowser('chrome').build();

    await driver.get('localhost:4500').then(function () {
        driver.findElement(By.className('MuiIconButton-edgeStart')).click().then(function () {
            driver.findElement(By.id('graph-id')).click().then(function () {
                driver.findElement(By.className('MuiIconButton-root')).click().then(function () {
                    driver.findElement(By.className('MuiButton-textPrimary')).click().then(function () {
                        setTimeout(function () {
                            console.log("Graph loaded successfully");
                            driver.quit();
                        }, 5000)
                    })
                })
            })
        })
    })
}

siteLoad()
redirectToGraph()