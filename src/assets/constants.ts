export const constants = {
    SEQUELIZE: 'SEQUELIZE',

    ORDER_REPOSITORY: 'ORDER_REPOSITORY',
    ORDER_ITEM_REPOSITORY: 'ORDER_ITEM_REPOSITORY',
    ORDER_DETAIL_REPOSITORY: 'ORDER_DETAIL_REPOSITORY',

    ORDER_STATUS_REPOSITORY: 'ORDER_STATUS_REPOSITORY',

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

export const updateStatusSuccess = (status: string) => 
    `order status updated successfully`


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
    ADMIN = 'admin',
    GUEST = 'guest',
    DELIVERY_AGENT = 'delivery_agent',
    BUSINESS_ADMIN = 'business_admin',
    SELLER = 'seller',
    CUSTOMER = 'customer',
}

export const deliveryModes = [
    'PERSONAL_DELIVERY_AGENT',
    'THIRD_PARTY_SHIPPMENT'
]


export const orderStatus = ['pending', 'cancel', 'packing', 'packing_completed',
    'agent_assigned', 'agent_re_assigned', 'reached_destination', 'picked_up', 
    'delivered', 'return', 'exchanged', 'not_accepted_by_customer',
    'payment_failed',]


export enum OrderStatusEnum {
    Pending = 'pending',
    Cancel = 'cancel',
    Packing = 'packing',
    PackingCompleted = 'packing_completed',

    AgentAssigned = 'agent_assigned',
    ReAssigning = 'agent_re_assigned',
    PickedUp = 'picked_up',
    ReachedDesination = 'reached_destination',
    NotAcceptedByCustomer = 'not_accepted_by_customer',
    Delivered = 'delivered',

    Return = 'return',
    Exchanged = 'exchanged',
    PaymentFailed = 'payment_failed',

    CancelledBySeller = 'cancelled_by_seller',
    CancelledByCustomer = 'cancelled_by_customer',
}

export const sellerOrderState = ['processing', 'shipping']

export const persona = ['superadmin', 'customer', 'store']

export enum PaymentMode {
    CASH_ON_DELIVERY = 'cash on delivery',
    CREDIT_CARD = 'credit card',
    DEBIT_CARD = 'debit card',
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