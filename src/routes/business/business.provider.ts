import { constants } from "../../assets/constants";
import { Order } from "src/database/entities/order.entity";
import { OrderItem } from "src/database/entities/ordered_product";


export const businessProviders = [
    {
        provide: constants.ORDER_REPOSITORY,
        useValue: Order,
    },

    {
        provide: constants.ORDER_ITEM_REPOSITORY,
        useValue: OrderItem,
    },
];
