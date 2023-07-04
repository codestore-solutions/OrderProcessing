import { Injectable } from '@nestjs/common';
import { FieldMapping } from './field-mapping.interface';

// Define the types and functions here...

@Injectable()
export class DataMappingService {

    replaceIdsWithData<T extends Record<string, any>, U>(
        data: T[],
        fieldMappings: Record<keyof T, FieldMapping<T, U>>,
    ) {
        return data.reduce((transformedData, order) => {
            const transformedOrder: Partial<Record<keyof T, U>> = {};

            for (const field in fieldMappings) {
                const fieldMapping = fieldMappings[field];
                const id = order[fieldMapping.idField];

                if (id && fieldMapping.map.has(id)) {
                    const mappedObject = fieldMapping.map.get(id);
                    const selectedFields = fieldMapping.selectedFields;

                    if (fieldMapping.__all__ === true) {
                        transformedOrder[field] = mappedObject;
                    } else {
                        transformedOrder[field] =
                            this.pickSelectedFields(mappedObject, selectedFields) as U;
                    }
                }
            }
            return [ ...transformedData, 
                { 
                    paymentId: order.paymentId,
                    orderStatus: order.orderStatusId, 
                    paymentMode: order.paymentMode,
                    productCount: order.productCount,
                    deliveryCharges: order.deliveryCharges,
                    createdAt: order.createdDate,
                    paymentStatus: order.paymentStatus,
                     ...transformedOrder 
                }];
        }, []);
    }


    pickSelectedFields<T>(obj: T, selectedFields: (keyof T)[]): Partial<T> {
        const pickedObj: Partial<T> = {};

        for (const field of selectedFields) {
            if (obj.hasOwnProperty(field)) {
                pickedObj[field] = obj[field];
            }
        }
        return pickedObj;
    }
}
