import { rootlet } from "../types/sui/rootlet.js";
import { SuiObjectChangeContext, SuiObjectTypeProcessor } from "@sentio/sdk/sui"
import { SuiObjectChange } from '@mysten/sui/client'
import { MoveAccountFetchConfig } from '@sentio/protos'
import { processObjectChanges } from "../utils/objectChangeProcessor.js";

const fetchConfig: MoveAccountFetchConfig = {
    owned: true
  }

export function initRootletProcessor() {
    SuiObjectTypeProcessor.bind({
    objectType: rootlet.Rootlet.type()
    })
    .onTimeInterval(async (self, _, ctx) => {
      // get the object static fields for the object type
      ctx.eventLogger.emit("rootlet_static_fields", {
        id: self.data_decoded.id,
        attributes: JSON.stringify(self.data_decoded.attributes),
        description: self.data_decoded.description,
        image_url: self.data_decoded.image_url,
        number: self.data_decoded.number,
        some_address: ctx.address
      })
    }, undefined, 4800, fetchConfig)
    // get object changes for rootlets for mutation and transfers
    .onObjectChange((changes: SuiObjectChange[], ctx: SuiObjectChangeContext) => {
      processObjectChanges(changes, ctx);
    });
  }
  


// import { SuiObjectContext, SuiObjectProcessor } from "@sentio/sdk/sui";
// import { MoveValue} from '@mysten/sui/client';
// import util from 'util'; // Import util for detailed logging


// // this method only works for a single object
// const rootlet = '0x8f74a7d632191e29956df3843404f22d27bd84d92cca1b1abde621d033098769::rootlet::Rootlet';

// export function initRootletProcessor() {
//     SuiObjectProcessor.bind({
//         objectId: rootlet
//         // You can uncomment and set a specific checkpoint if needed
//         // startCheckpoint: 6684000n
//     })
//     .onTimeInterval(async (self, dynamicFieldObjects, ctx: SuiObjectContext) => {
//         console.log("onTimeInterval handler triggered");

//         // Log the entire self object using util.inspect for detailed inspection
//         console.log("Self object:", util.inspect(self, { depth: null, colors: true }));

//         // Log dataType and type for verification
//         console.log("Self object dataType:", self.dataType);
//         console.log("Self object type:", self.type);

//         // Corrected condition: Check if self.fields exists
//         if (self.dataType === 'moveObject' && self.fields) {
//             try {
//                 // Access the fields directly
//                 const fields = self.fields as { [key: string]: MoveValue };
//                 const serializedFields = JSON.stringify(fields);

//                 // console.log("Serialized Static Fields:", serializedFields);

//                 // Emit the event with serialized fields
//                 ctx.eventLogger.emit("rootlet_object", {
//                     type: self.type,
//                     fields: serializedFields
//                 });

//                 console.log("Event 'rootlet_object' emitted successfully");
//             } catch (error) {
//                 console.error("Error processing static fields:", error);
//             }
//         } else {
//             console.log("Self object is not a moveObject or lacks 'fields'");
//         }

//         // Optionally, log dynamic fields if needed
//         if (dynamicFieldObjects.length > 0) {
//             console.log(`Found ${dynamicFieldObjects.length} dynamic field objects`);
//             dynamicFieldObjects.forEach((field, index) => {
//                 console.log(`Dynamic Field ${index + 1}:`, JSON.stringify(field, null, 2));
//             });
//         } else {
//             console.log("No dynamic field objects found");
//         }
//     })
// }