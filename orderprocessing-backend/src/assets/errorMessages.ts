export const ErrorMessages = {
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
    NOT_MODIFIED: {
        code: 'NOT_MODIFIED',
        message: 'Data Not Updated'
    },
    ACTIVE_BOOKING_FOUND: {
        code: 'ACTIVE_BOOKING_FOUND',
        message: 'You have a Booking in Progress'
    },
    PARKING_IS_FULL: {
        code: 'PARKING_IS_FULL',
        message: 'Parking is Full',
    },
    INVALID_QR_SCANNED: {
        code: 'INVALID_QR_SCANNED',
        message: 'Invalid QR Code Scanned',
    },
    NO_OF_FILES_EXCEEDED: {
        code: 'NO_OF_FILES_EXCEEDED',
        message: 'No Of Files Exceeded. Maximum Limit is 5.',
    },
    EMAIL_ALREADY_EXISTS: {
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'Email Already Exists',
    },
    EMAIL_ALREADY_EXISTS_PLEASE_SIGN_IN: {
        code: 'EMAIL_ALREADY_EXISTS_PLEASE_SIGN_IN',
        message: 'Email Id Already Exists. If you are a user, Please Try Signing In.',
    },
    OPERATOR_INVALID_USER_TYPE_ID: {
        code: 'OPERATOR_INVALID_USER_TYPE_ID',
        message: 'Invalid User Type Id',
    },
    PROFILE_IMAGE_ALREADY_EXISTS: {
        code: 'PROFILE_IMAGE_ALREADY_EXISTS',
        message: 'Profile Image Already Exists',
    },

    EMAIL_NOT_REGISTERED: {
        code: 'EMAIL_NOT_REGISTERED',
        message: 'Email Is Not Registered',
    },

    MAIL_SENT_SUCCESSFULLY: {
        code: 'MAIL_SENT_SUCCESSFULLY',
        message: 'Mail Sent Successfully',
    },
    INVALID_USER_TYPE_ID: {
        code: 'INVALID_USER_TYPE_ID',
        message: 'Invalid User Type Id',
    },

    // BAD REQUEST
    BAD_REQUEST: {
        code: 'BAD_REQUEST',
        message: 'Invalid Request',
    },
    BOOKING_ALREADY_HANDLED: {
        code: 'BOOKING_ALREADY_HANDLED',
        message: 'Booking is already handled',
    },

    // NOT FOUND
    ID_NOT_FOUND: {
        code: 'ID_NOT_FOUND',
        message: 'Id Not Found',
    },
    ID_TYPE_NOT_FOUND: {
        code: 'ID_TYPE_NOT_FOUND',
        message: 'Id Type Not Found'
    },
    OPERATING_SYSTEM_NOT_FOUND: {
        code: 'OPERATING_SYSTEM_NOT_FOUND',
        message: 'Operating System Not Found',
    },
    BIKE_NOT_FOUND: {
        code: 'BIKE_NOT_FOUND',
        message: 'Bike Not Found',
    },
    IMAGE_NOT_FOUND: {
        code: 'IMAGE_NOT_FOUND',
        message: 'Image Not Found',
    },
    BIKE_TYPE_NOT_FOUND: {
        code: 'BIKE_TYPE_NOT_FOUND',
        message: 'Bike Type Not Found',
    },
    BLOOD_TYPE_NOT_FOUND: {
        code: 'BLOOD_TYPE_NOT_FOUND',
        message: 'Blood Type Not Found',
    },
    ESTABLISHMENT_TYPE_NOT_FOUND: {
        code: 'ESTABLISHMENT_TYPE_NOT_FOUND',
        message: 'Establishment Type Not Found'
    },
    ESTABLISHMENT_NOT_FOUND: {
        code: 'ESTABLISHMENT_NOT_FOUND',
        message: 'Establishment Not Found'
    },
    NO_SELECTED_ESTABLISHMENT_FOUND: {
        code: 'NO_SELECTED_ESTABLISHMENT_FOUND',
        message: 'No Selected Establishment Found'
    },
    ESTABLISHMENT_IMAGE_NOT_FOUND: {
        code: 'ESTABLISHMENT_IMAGE_NOT_FOUND',
        message: 'Establishment Image Not Found',
    },
    BOOKING_NOT_FOUND: {
        code: 'BOOKING_NOT_FOUND',
        message: 'Booking Not Found',
    },
    DEVICE_INFO_NOT_FOUND: {
        code: 'DEVICE_INFO_NOT_FOUND',
        message: 'Device Info Not Found',
    },
    ID_DETAILS_NOT_FOUND: {
        code: 'ID_DETAILS_NOT_FOUND',
        message: 'Id Details Not Found',
    },
    OPERATOR_NOT_FOUND: {
        code: 'OPERATOR_NOT_FOUND',
        message: 'Operator Not Found',
    },
    PROFILE_IMAGE_NOT_FOUND: {
        code: 'PROFILE_IMAGE_NOT_FOUND',
        message: 'Profile Image Not Found',
    },
    USER_NOT_FOUND: {
        code: 'USER_NOT_FOUND',
        message: 'User Not Found',
    },
    USER_TYPE_NOT_FOUND: {
        code: 'USER_TYPE_NOT_FOUND',
        message: 'User Type Not Found',
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