const{Builder, By, Key, util} = require("selenium-webdriver");

async function test()
{
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("localhost:4500"); //frontend
}

test();
