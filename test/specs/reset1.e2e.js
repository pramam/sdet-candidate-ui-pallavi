const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const LoginData = require('../../data/logindata');

describe('UserStory: Reset Cart State', () => {

    //TODO: Investigate: Running all the tests together is causing second test to fail
    //      Do I need to logout after one test?
    // State machine info:
    // X 1 A 2 2 15 A
    it('Reset_1: should be able to add two items to cart and zero it out by Reset App State from burger menu on the Inventory Page', async()=> {
        let stepnum = 0;
        await LoginPage.open();
        await LoginPage.login(LoginData.userName, LoginData.password);

        await InventoryPage.ensureOnPage();
        stepnum += 3;
        console.log(`Reset_1: S${stepnum} Logged in`)
 
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-backpack');
        await CartPage.addItemToCart('#add-to-cart-sauce-labs-bike-light');
        stepnum += 2;
        console.log(`Reset_1: S${stepnum} Added 2 items to cart`);
 
        // This is done on Inventory page
        await CartPage.checkNumCartItems(2);
        stepnum += 1;
        // const elMenuButton = await $('#react-burger-menu-btn')
        // await elMenuButton.click();
        // await browser.pause(5000);
        // const elLogoutLink = await $('#logout_sidebar_link')
        // TODO: Getting: Request failed with status 400 element not interactable
        // await elLogoutLink.click();
        // await LoginPage.logout();
        await LoginPage.resetAppState();
        stepnum += 1;
        console.log(`Reset_1: S${stepnum} resetAppState from Inventory page`);

        await CartPage.checkNumCartItems(0);
        stepnum += 1;
        console.log(`Reset_1: S${stepnum} Confirmed number of items in cart is 0`);
        // Ensure on same page
        await InventoryPage.ensureOnPage();
        stepnum += 1;
        console.log(`Reset_1: S${stepnum} END`);
    })

});


