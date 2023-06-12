import { constants } from "../../assets/constants";
import { Order } from "src/database/entities/order.entity";
import { OrderItem } from "src/database/entities/ordered_product";
import { OrderStatusEntity } from "src/database/entities/order_status.entity";


export const orderProviders = [
    {
        provide: constants.ORDER_REPOSITORY,
        useValue: Order,
    },

    {
        provide: constants.ORDER_ITEM_REPOSITORY,
        useValue: OrderItem,
    },

    {
        provide: constants.ORDER_STATUS_REPOSITORY,
        useValue: OrderStatusEntity,
    },
];
