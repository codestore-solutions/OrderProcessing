import { Product } from "src/database/entities/product.entity";
import { constants } from "../../assets/constants";
import { Address } from "src/database/entities/address.entity";
import { ProductAttributes } from "src/database/entities/product-attributes.entity";
import { ProductInventory } from "src/database/entities/product-inventory.entity";
import { Payment } from "src/database/entities/payment.entity";
import { User } from "src/database/entities/user.entity";
import { Order } from "src/database/entities/order.entity";


export const orderProviders = [
    {
        provide: constants.ORDER_REPOSITORY,
        useValue: Order,
    },

    {
        provide: constants.PRODUCT_REPOSITORY,
        useValue: Product,
    },

    {
        provide: constants.ADDRESS_REPOSITORY,
        useValue: Address,
    },

    {
        provide: constants.PRODUCT_SPECIFICATION_REPOSITORY,
        useValue: ProductAttributes,
    },

    {
        provide: constants.PRODUCT_INVENTORY_REPOSITORY,
        useValue: ProductInventory,
    },

    {
        provide: constants.PAYMENT_REPOSITORY,
        useValue: Payment,
    },

    {
        provide: constants.USER_REPOSITORY,
        useValue: User,
    }
];
