export const constants = {
    LOCAL_GUARD: 'local',
    MAIL_LOCAL_GUARD: 'mailLocal',
    APIS_PREFIX: 'api',
    PRISMA_CLIENT: 'PrismaClient'
};


export enum OrderStatusEnum {
    NEW = 1,
    CANCEL = 2,
    PACKING = 3,
    PACKING_COMPLETED = 4,
    AGENT_ASSIGNED = 5,
    ACCEPTED_BY_AGENT= 6,
    RE_ASSIGNING = 7,
    PICKED_UP = 8,
    REACHED_DESTINATION = 9,
    NOT_ACCEPTED_BY_CUSTOMER = 10,
    DELIVERED = 11,
    RETURN = 12,
    EXCHANGED = 13,
    PAYMENT_FAILED = 14,
    CANCELLED_BY_SELLER = 15,
    CANCELLED_BY_CUSTOMER = 16,
}


export const order_status = [
    { id: OrderStatusEnum.NEW, name: 'new' },
    { id: OrderStatusEnum.CANCEL, name: 'cancel' },
    { id: OrderStatusEnum.PACKING, name: 'packing' },
    { id: OrderStatusEnum.PACKING_COMPLETED, name: 'packing_completed' },
    { id: OrderStatusEnum.AGENT_ASSIGNED, name: 'agent_assigned' },
    { id: OrderStatusEnum.ACCEPTED_BY_AGENT, name: 'accepted_by_agent' },
    { id: OrderStatusEnum.RE_ASSIGNING, name: 'agent_re_assigning' },
    { id: OrderStatusEnum.PICKED_UP, name: 'picked_up' },
    { id: OrderStatusEnum.REACHED_DESTINATION, name: 'reached_destination' },
    { id: OrderStatusEnum.NOT_ACCEPTED_BY_CUSTOMER, name: 'not_accepted_by_customer' },
    { id: OrderStatusEnum.DELIVERED, name: 'delivered' },
    { id: OrderStatusEnum.RETURN, name: 'return' },
    { id: OrderStatusEnum.EXCHANGED, name: 'exchanged' },
    { id: OrderStatusEnum.PAYMENT_FAILED, name: 'payment_failed' },
    { id: OrderStatusEnum.CANCELLED_BY_SELLER, name: 'cancelled_by_seller' },
    { id: OrderStatusEnum.CANCELLED_BY_CUSTOMER, name: 'cancelled_by_customer' },
];

export const updateStatusSuccessMessage = `Order status updated successfully`


export const tableNameConstants = {
    ORDER: 'orders',
    ORDERED_ITEM: 'order_item',
    ORDER_STATUS: 'order_status',
    BOOKING: 'bookings',
    USER: 'users',
    PAYMENT: 'payments',
    ADDRESS: 'address',
    PRODUCT: 'products',
    PRODUCT_INVENTORY: 'product_inventory',
    ATTRIBUTE: 'attribues',
    PRODUCT_ATTIBUTES: 'product_attributes'

};


export enum PaymentStatusEnum {
    PENDING = 'PENDING',
    CAPTURED = 'CAPTURED',
    REFUNDED = 'REFUNDED',
    PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
    FAILED = 'FAILED',
}


export const paymentStatus = [
    "PENDING",
    "CAPTURED",
    "REFUNDED",
    "PARTIALLY_REFUNDED",
    "FAILED",
]

export const roles = [
    "admin",
    "guest",
    "delivery_agent",
    "business_admin",
    "seller",
    "customer"
]

export enum rolesEnum {
    Admin = 1,
    BusinessAdmin = 2,
    Seller = 3,
    Customer = 4,
    DeliveryAgent = 5
}

export const deliveryModes = [
    'PERSONAL_DELIVERY_AGENT',
    'THIRD_PARTY_SHIPPMENT'
]


export const orderStatus = ['not_processed', 'pending', 'cancel', 'packing', 'packing_completed',
    'agent_assigned', 'agent_re_assigned', 'reached_destination', 'picked_up',
    'delivered', 'return', 'exchanged', 'not_accepted_by_customer',
    'payment_failed',]



export const sellerOrderState = ['processing', 'shipping']

export const persona = ['superadmin', 'customer', 'store']

export enum PaymentMode {
    CASH_ON_DELIVERY = 'cash on delivery',
    ONLINE = 'online'
}

export const swaggerConstants = {
    SWAGGER_TITLE: 'Order processing module',
    SWAGGER_DESCRIPTION: 'Order processing module APIs description',
    SWAGGER_VERSION: '1.0',
}

export const errorMessages = {
    RECORDS_NOT_FOUND: 'No Record is Present in Database',
    ID_NOT_FOUND: 'No Record found with given id',

    USER_ID_NOT_FOUND: `The User Id doesn't exist`,
    USER_TYPE_ID_NOT_FOUND: `The User Type Id doesn't exist`,

    NO_USER_PRESENT_IN_DB: `No User is present in DB`,
    NO_USER_TYPE_EXIST_IN_DB: `No User type Exists in DB`,

    NO_ID_TYPE_EXIST_IN_DB: `No Id Type Exists in DB`,
    ID_TYPE_NOT_FOUND: `Id Type Not Found`,
};