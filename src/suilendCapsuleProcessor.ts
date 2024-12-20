import { capsule } from "./types/sui/0xf4e0686b311e9b9d6da7e61fc42dae4254828f5ee3ded8ab5480ecd27e46ff08.js";
import { suilend_capsule } from "./types/sui/0x008a7e85138643db888096f2db04766d549ca496583e41c3a683c6e1539a64ac.js";
import { SuiObjectContext, SuiObjectTypeProcessor } from "@sentio/sdk/sui";
import { MoveValue } from '@mysten/sui/client';
import util from 'util'; // Import util for detailed logging
// Define the new object ID

export function initSuilendCapsuleProcessor() {
    console.log('Initializing capsule processor');
    try {
        SuiObjectTypeProcessor.bind({
            objectType: suilend_capsule.SuilendCapsule.type()
            // startCheckpoint: 35718750n
        })
        .onCheckpointInterval(async (self, _, ctx) => {
            try {
                console.log('Starting checkpoint interval processing');
                console.log('Processing SuilendCapsule object:', util.inspect(self, { depth: null }));
                console.log('Object type:', suilend_capsule.SuilendCapsule.type());
                console.log('Context:', util.inspect(ctx, { depth: null }));
                
                ctx.eventLogger.emit("suilend_capsule_objects", {
                    id: self.data_decoded.id,
                    rarity: self.data_decoded.rarity
                });
                
                console.log('Event emitted for capsule ID:', self.data_decoded.id);
            } catch (error) {
                console.error('Error in checkpoint interval handler:', error);
            }
        });
        
        console.log('SuilendCapsule processor bound successfully');
    } catch (error) {
        console.error('Error binding SuilendCapsule processor:', error);
    }
}