/**
 * Endpoint URLs for Delivery Management service
 */
const deliveryManagementEndpoint = {
    getDeliveryAgents: "v1/personal-details/getMultipleAgent", // Endpoint for retrieving delivery agents
};

/**
 * Endpoint URLs for Ordering and booking service
 */
export const orderingEndpoint = {
    getOrders: "v1/order/listOfOrders"
}


/**
 * Endpoint URLs for Vendor Management service
 */
const vendorManagementEndpoint = {
    getVendors: "v1/vendors/getVendorListByIds", // Endpoint for retrieving vendors
};


/**
 * Endpoint URLs for Address Management service
 */
const addressManagementEndpoint = {
    getAddresses: "v1/address/getMultipleAddress", // Endpoint for retrieving addresses
};


/**
 * Endpoint URLs for Customer Management service
 */
const customerManagementEndpoint = {
    getCustomers: "customers", // Endpoint for retrieving customers
};


export { customerManagementEndpoint, vendorManagementEndpoint,
    addressManagementEndpoint, deliveryManagementEndpoint}