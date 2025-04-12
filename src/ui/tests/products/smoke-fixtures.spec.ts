import { test } from '../../../fixtures/services.fixture';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { PRODUCTS_TOAST_MESSAGE } from '../../../data/types/productsToastMessage.types.js';

test.describe('[UI] [Product] Smoke Create -Verify - Delete', async function () {
  test.beforeEach(async function ({ signInPageService }) {
    await signInPageService.openSalesPortal();
  });

  test('Test', async ({ homePageService, productsPageService, addNewProductPageService, salesPortalService }) => {
    const product = generateNewProduct();        
    await homePageService.openProductsPage();
    await productsPageService.openAddNewProductPage();
    await addNewProductPageService.create(product);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.CREATE_SUCCESS);
    await productsPageService.checkProductByModalData(product);
    await productsPageService.deleteCreatedProduct(product.name);
    await salesPortalService.verifyNotification(PRODUCTS_TOAST_MESSAGE.DELETE_SUCCESS);
  });
});
