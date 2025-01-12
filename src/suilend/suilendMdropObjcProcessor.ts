import { SuiObjectContext, SuiObjectProcessor } from "@sentio/sdk/sui";
import { MoveValue} from '@mysten/sui/client';
import util from 'util'; // Import util for detailed logging

// msend treasury object
const suilendMdrop = '0xef40b6d070de0c55dcb12775e4c438b1d83e0b5f445e95875f46eb2742a5549c';

export function initSuilendMdropProcessor() {
    SuiObjectProcessor.bind({
        objectId: suilendMdrop
        // You can uncomment and set a specific checkpoint if needed
        // startCheckpoint: 6684000n
    })
    .onTimeInterval(async (self, dynamicFieldObjects, ctx: SuiObjectContext) => {
        // console.log("onTimeInterval handler triggered");

        // // Log the entire self object using util.inspect for detailed inspection
        // console.log("Self object:", util.inspect(self, { depth: null, colors: true }));

        // // Log dataType and type for verification
        // console.log("Self object dataType:", self.dataType);
        // console.log("Self object type:", self.type);

        // Corrected condition: Check if self.fields exists
        if (self.dataType === 'moveObject' && self.fields) {
            try {
                // Access the fields directly
                const fields = self.fields as { [key: string]: MoveValue };
                const serializedFields = JSON.stringify(fields);

                // console.log("Serialized Static Fields:", serializedFields);

                // Emit the event with serialized fields
                ctx.eventLogger.emit("suilend_mdrop", {
                    type: self.type,
                    fields: serializedFields
                });

                console.log("Event 'suilend_mdrop' emitted successfully");
            } catch (error) {
                console.error("Error processing static fields:", error);
            }
        } else {
            console.log("Self object is not a moveObject or lacks 'fields'");
        }

        // // Optionally, log dynamic fields if needed
        // if (dynamicFieldObjects.length > 0) {
        //     console.log(`Found ${dynamicFieldObjects.length} dynamic field objects`);
        //     dynamicFieldObjects.forEach((field, index) => {
        //         console.log(`Dynamic Field ${index + 1}:`, JSON.stringify(field, null, 2));
        //     });
        // } else {
        //     console.log("No dynamic field objects found");
        // }
    })
}





// example to log all dynamic fields in the suilend mdrop. NOT IN USE 12/15/24 
// export function initSuilendMdropProcessor() {
//     SuiObjectProcessor.bind({
//     objectId: suilendMdrop
//     // startCheckpoint: 6684000n
//   })
//   .onTimeInterval(async (self, dynamicFieldObjects, ctx: SuiObjectContext) => {
//     dynamicFieldObjects.forEach(field => {
//       if (field.dataType === 'moveObject' && 'fields' in field.fields) {
//         const fields = field.fields.fields as { [key: string]: MoveValue };
//         const serializedFields = JSON.stringify(fields);
  
//         ctx.eventLogger.emit("DynamicFieldSnapshot", {
//           type: field.type,
//           fields: serializedFields
//         });
//       }
//     });
//   });
// }

