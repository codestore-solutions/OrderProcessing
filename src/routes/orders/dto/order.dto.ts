export class OrderEntityDto {
    id: number;
    vendorId: number;
    customerId: number;
    deliveryAgentId: number | null;
    orderStatusId: number;
}
