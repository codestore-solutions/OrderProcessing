

// // Usage example
// const stores: MappingData[] = [
//     {
//         id: 1,
//         name: 'AXY Store',
//         address: '123 Main St',
//     },
//     // Add more store objects
// ];

// const customers: MappingData[] = [
//     {
//         id: 2,
//         name: 'Amit',
//         address: '456 Elm St',
//     },
//     // Add more customer objects
// ];

// const deliveries: MappingData[] = [
//     {
//         id: 1,
//         name: 'Delivery 1',
//         address: '789 Oak St',
//     },
//     // Add more delivery objects
// ];

// const data: DataObject[] = [
//     {
//         storeId: 1,
//         customerId: 2,
//         deliveryId: 1,
//     },
//     // Add more data objects
// ];

// const fieldMappings: Record<keyof DataObject, FieldMapping<DataObject, MappingData>> = {
//     store: {
//         idField: 'storeId',
//         map: new Map(stores.map(store => [store.id, store])),
//         selectedFields: ['name', 'address'],
//     },
//     customer: {
//         idField: 'customerId',
//         map: new Map(customers.map(customer => [customer.id, customer])),
//         selectedFields: ['name'],
//     },
//     delivery: {
//         idField: 'deliveryId',
//         map: new Map(deliveries.map(delivery => [delivery.id, delivery])),
//         selectedFields: ['address'],
//     },
//     // Add more field mappings as needed
// };

// const replacedData = replaceIdsWithData(data, fieldMappings);
// console.log(replacedData);