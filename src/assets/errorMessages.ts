export const ErrorMessages = {

    INVALID_PACKING_COMPLETE_UPDATE: {
        code: 'INVALID_PACKING_COMPLETE_UPDATE',
        message: 'Packing is not yet started',
    },

    INVALID_PACKING_UPDATE: {
        code: 'INVALID_PACKING_UPDATE',
        message: 'Only new order can be packed'
    },

    INVALID_PAGINATON_INPUT: {
        code: 'INVALID_PAGINATON_INPUT',
        message: 'Both pageSize and pageNumber must be provided together'
    },

    INVALID_VALUE: {
        code: 'INVALID_VALUE',
        message: 'value is not valid, retry'
    },

    INVALID_NEGATIVE_VALUE: {
        code: "INVALID_NEGATIVE_VALUE",
        message: "negative value is not allowed"
    },
    
    INVALID_NOT_ACCEPTED_CUSTOMER_UPDATE: {
        code: 'INVALID_NOT_ACCEPTED_CUSTOMER_UPDATE',
        message: 'Order is not reached at destination'
    },

    INVALID_DELIVERED_UPDATE: {
        code: 'INVALID_DELIVERED_UPDATE',
        message: 'Order is not reached at destination'
    },

    INTERNAL_SERVER_ERROR: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error"
    },

    INVALID_REACHED_DESINATION_UPDATE: {
        code: 'INVALID_REACHED_DESINATION_UPDATE',
        message: 'Orders are not yet picked up'
    },

    INVALID_PICKUP: {
        code: 'INVALID_PICKUP',
        message: 'Orders are not assigned to current delivery agent'
    },

    NOT_AUTHORIZED: {
        code: 'NOT_AUTHORIZED.',
        message: 'Author is not authorized to update this status'
    },

    INVALID_RE_ASSIGNING: {
        code : 'INVALID_RE_ASSIGNING',
        message: 'Only assigned orders can be re-assigned to delivery agent'

    },

    INVALID_ASSIGNING: {
        code : 'INVALID_ASSIGNING',
        message: 'Only packed orders can be assigned to delivery agent'
    },

    AGENT_ID_REQUIRED: {
        code: 'AGENT_ID_REQUIRED',
        message: 'Delivery agent id required for assigning order'
    },

    CANNOT_EXCHANGE_ORDER_INVENTORY: {
        code: 'CANNOT_EXCHANGE_ORDER_INVENTORY',
        message: 'Cannot exchange the order as per product inventory'
    },

    CANNOT_RETURN_ORDER_INVENTORY: {
        code: 'CANNOT_RETURN_ORDER_INVENTORY',
        message: 'Cannot return the order as per product inventory'
    },

    CANNOT_CANCEL_ORDER_INVENTORY: {
        code: 'CANNOT_CANCEL_ORDER_INVENTORY',
        message: 'Cannot cancel the order as per product inventory'
    },

    TIMEFRAME_VALIDATION_ERROR: {
        code: 'TIMEFRAME_VALIDATION_ERROR',
        message: 'Order cannot be returned or exchanged after 14 days of ordering'
    },

    CANNOT_CANCEL_ORDER: {
        code: 'CANNOT_CANCEL_ORDER',
        message: 'Order cannot be cancelled in the current status'
    },

    CANNOT_RETURN_AND_EXCHANGE_ORDER: {
        code: 'CANNOT_RETURN_AND_EXCHANGE_ORDER',
        message: 'Order cannot be returned or exchanged in the current status'
    },

    ORDER_NOT_FOUND: {
        code: 'ORDER_NOT_FOUND',
        message: 'Order not found'
    },

    PAYMENT_IS_PARTIALLY_DONE: {
        code: 'PAYMENT_IS_PARTIALLY_DONE',
        mesage: 'Payment is done partially'
    },

    PAYMENT_NOT_DONE: {
        code: 'PAYMENT_NOT_DONE',
        mesage: 'Payment not done'
    },

    ADDRESS_NOT_FOUND: {
        code: 'ADDRESS_NOT_FOUND',
        mesage: 'Address not found'
    },

    PRODUCT_NOT_FOUND: {
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
    },

    PRODUCT_VARIANT_NOT_AVAILABLE: {
        code: 'PRODUCT_VARIANT_NOT_AVAILABLE',
        message: 'Product variant not available in store',
    },

    PRODUCT_OUT_OF_STOCK: {
        code: 'PRODUCT_OUT_OF_STOCK',
        message: 'Product is out of stock',
    },

    SOME_ERROR_OCCURED: {
        code: 'SOME_ERROR_OCCURED',
        message: 'Some Error Occured',
    },
    SESSION_TIMEOUT_SEND_MAIL: {
        code: 'SESSION_TIMEOUT_SEND_MAIL',
        message: 'Session timeout. Request again to get a mail'
    },
    SESSION_EXPIRED: {
        code: 'SESSION_EXPIRED',
        message: 'Session Expired. Login again to continue.'
    },
    INVALID_USERNAME_OR_PASSWORD: {
        code: 'INVALID_USERNAME_OR_PASSWORD',
        message: 'Invalid Username Or Password',
    },
    MAIL_NOT_SENT: {
        code: 'MAIL_NOT_SENT',
        message: 'Mail Not Sent',
    },
    NOT_IMPLEMENTED: {
        code: 'NOT_IMPLEMENTED',
        message: 'Not Implemented',
    },

    EMAIL_NOT_FOUND: {
        code: 'EMAIL_NOT_FOUND',
        message: 'Email Not Found',
    },
    USER_IS_ALREADY_VERIFIED: {
        code: 'USER_IS_ALREADY_VERIFIED',
        message: 'User is verified already',
    },
};