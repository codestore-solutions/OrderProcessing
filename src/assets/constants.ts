export const constants = {
    SEQUELIZE: 'SEQUELIZE',

    ORDER_REPOSITORY: 'ORDER_REPOSITORY',
    ORDER_ITEM_REPOSITORY: 'ORDER_ITEM_REPOSITORY',
    ORDER_DETAIL_REPOSITORY: 'ORDER_DETAIL_REPOSITORY',

    PRODUCT_REPOSITORY: 'PRODUCT_REPOSITORY',
    PRODUCT_SPECIFICATION_REPOSITORY: 'PRODUCT_SPECIFICATION_REPOSITORY',

    ADDRESS_REPOSITORY: 'ADDRESS_REPOSITORY',

    PRODUCT_INVENTORY_REPOSITORY: "PRODUCT_INVENTORY_REPOSITORY",

    PAYMENT_REPOSITORY: "PAYMENT_REPOSITORY",

    USER_REPOSITORY: "USER_REPOSITORY",


    LOCAL_GUARD: 'local',
    MAIL_LOCAL_GUARD: 'mailLocal',
    APIS_PREFIX: 'api',
};


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


export const orderStatus = ['pending', 'cancel', 'processing', 'packing_completed', 
    'agent_assigned', 'picked_up', 'delivered', 'return', 'exchanged', 
    'payment_failed', 'issue']


export const paymentStatus = [
    "PENDING",
    "CAPTURED",
    "REFUNDED",
    "PARTIALLY_REFUNDED",
    "FAILED",
]

export const roles = [
    "ADMIN",
    "GUEST",
    "DELIVERY_AGENT",
    "BUSINESS_ADMIN",
    "SELLER",
    "CUSTOMER"
]

export const deliveryModes = [
    'PERSONAL_DELIVERY_AGENT',
    'THIRD_PARTY_SHIPPMENT'
]

export enum OrderStatusEnum {
    Pending = 'pending',
    Cancel = 'cancel',
    Processing = 'processing',
    PackingCompleted = 'packing_completed',
    AgentAssigned = 'agent_assigned',
    PickedUp = 'picked_up',
    Delivered = 'delivered',
    Return = 'return',
    Exchanged = 'exchanged',
    PaymentFailed = 'payment_failed',
    Issue = 'issue'
}

export const sellerOrderState = ['processing', 'shipping']

export const persona = ['superadmin', 'customer', 'store']

export enum PaymentMode {
    CASH_ON_DELIVERY = 'cash on delivery',
    CREDIT_CARD = 'credit Card',
    DEBIT_CARD = 'debit Card',
    PAYPAL = 'paypal',
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