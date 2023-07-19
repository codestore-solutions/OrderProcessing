import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "../https.service";
import {
    vendorManagementEndpoint, deliveryManagementEndpoint,
    customerManagementEndpoint, addressManagementEndpoint, orderingEndpoint
} from "../end-points";
import AxiosService from "src/utils/axios/axiosService";
import { UserRole, users } from "src/assets/users";
import { stringify } from "qs";


@Injectable()
export class DataManagementService {
    constructor(private configService: ConfigService) { }

    /**
     * Retrieves order data from the order management service.
     * @param orderIds Array of order IDs to retrieve.
     * @returns Promise that resolves to the order data.
     */
    async getOrders(orderIds: number[]) {
        const baseUrl = this.configService.get("ORDER_MANAGEMENT_SERVICE");
        const trailingUrl = orderingEndpoint.getOrders;
        const url = AxiosService.urlBuilder(baseUrl, trailingUrl);

        const params = { orderIds };
        const encodedParams = stringify(params, { arrayFormat: 'repeat' });
        const finalUrl = `${url}?${encodedParams}`;

        return await HttpService.get(finalUrl);
    }

    /**
     * Retrieves vendor data from the vendor management service.
     * @param vendorIds Array of vendor IDs to retrieve.
     * @returns Promise that resolves to the vendor data.
     */
    async getVendors(vendorIds: number[]) {
        const baseUrl = this.configService.get("VENDOR_MANAGEMENT_SERVICE");
        const trailingUrl = vendorManagementEndpoint.getVendors;
        const url = AxiosService.urlBuilder(baseUrl, trailingUrl);

        const params = { vendorId: vendorIds };

        return await HttpService.get(url, params);
    }

    /**
     * Retrieves delivery agent data from the delivery management service.
     * @param deliveryAgentIds Array of delivery agent IDs to retrieve.
     * @returns Promise that resolves to the delivery agent data.
     */
    async getDeliveryAgents(deliveryAgentIds: number[]) {
        // const baseUrl = this.configService.get("DELIVERY_MANAGEMENT_SERVICE");
        // const trailingUrl = deliveryManagementEndpoint.getDeliveryAgents;
        // const url = AxiosService.urlBuilder(baseUrl, trailingUrl);

        // const params = { deliveryAgentIds };
        // const encodedParams = stringify(params, { arrayFormat: 'repeat' });
        // const finalUrl = `${url}?${encodedParams}`;
        // console.log(finalUrl)
        // if (deliveryAgentIds.length > 0) return await HttpService.get(finalUrl);
        return null;
    }

    /**
     * Retrieves customer data from the customer management service.
     * @param customerIds Array of customer IDs to retrieve.
     * @returns Promise that resolves to the customer data.
     */
    async getCustomers(customerIds: number[]) {
        // const baseUrl = this.configService.get("CUSTOMER_MANAGEMENT_SERVICE");
        // const trailingUrl = customerManagementEndpoint.getCustomers;
        // const url = AxiosService.urlBuilder(baseUrl, trailingUrl);
        // const params = { customerId: customerIds };
        // return await HttpService.get(url, params );

        const customers = users.filter(user => user.role === UserRole.Customer
            && customerIds.includes(user.id));
        return customers;
    }

    /**
     * Retrieves address data from the address management service.
     * @param addressIds Array of address IDs to retrieve.
     * @returns Promise that resolves to the address data.
     */
    async getAddresses(addressIds: number[]) {
        const baseUrl = this.configService.get("ORDER_MANAGEMENT_SERVICE");
        const trailingUrl = addressManagementEndpoint.getAddresses;
        const url = AxiosService.urlBuilder(baseUrl, trailingUrl);

        const params = { shippingAddressIds: addressIds };

        const encodedParams = stringify(params, { arrayFormat: 'repeat' });
        const finalUrl = `${url}?${encodedParams}`;

        return await HttpService.get(finalUrl);
    }
}
