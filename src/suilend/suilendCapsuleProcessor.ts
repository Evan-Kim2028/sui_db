import { capsule } from "../types/sui/suilend_capsule_processor.js";
import { suilend_capsule } from "../types/sui/suilend_capsule_object.js";
import {SuiObjectTypeProcessor} from "@sentio/sdk/sui";
import util from 'util'; // Import util for detailed logging
// Define the new object ID

import {MoveFetchConfig } from '@sentio/protos'

const fetchConfig: MoveFetchConfig = {
  resourceChanges: true,
  allEvents: true,
  inputs: true
}

export function initSuilendCapsuleProcessor() {
    capsule.bind()
    .onEventBurnEvent((event, ctx) => {
        ctx.eventLogger.emit("suilend_capsule_burn", {
            claim_amount: event.data_decoded.claim_amount.toString(),
            rarity: event.data_decoded.rarity,
            manager_id: event.data_decoded.manager_id,
            sender: event.sender,
            object_id: event.transactionModule,
            // Access the gas effects for storage + computation costs
            storage_cost: ctx.transaction.effects?.gasUsed.storageCost,
            gas_computation: ctx.transaction.effects?.gasUsed.computationCost,
            nonrefundable_storage_fee: ctx.transaction.effects?.gasUsed.nonRefundableStorageFee,
            storage_rebate: ctx.transaction.effects?.gasUsed.storageRebate
        });
    })
    .onEventAmounts((event, ctx) => {
        ctx.eventLogger.emit("suilend_capsule_amounts", {
            common: event.data_decoded.common.toString(),
            uncommon: event.data_decoded.uncommon.toString(),
            rare: event.data_decoded.rare.toString(),
            gas_payment: ctx.transaction.transaction?.data.gasData.payment,
            // Access the gas effects for storage + computation costs
            storage_cost: ctx.transaction.effects?.gasUsed.storageCost,
            gas_computation: ctx.transaction.effects?.gasUsed.computationCost,
            nonrefundable_storage_fee: ctx.transaction.effects?.gasUsed.nonRefundableStorageFee,
            storage_rebate: ctx.transaction.effects?.gasUsed.storageRebate

        });
    }, fetchConfig)

    SuiObjectTypeProcessor.bind({
        objectType: suilend_capsule.SuilendCapsule.type(),
        startCheckpoint: 35728750n
    })
    .onCheckpointInterval(async (self, _, ctx) => {
        // console.log('Processing SuilendCapsule object:', util.inspect(self, { depth: null }));
        // console.log('Object type:', suilend_capsule.SuilendCapsule.type());
        // console.log('Context:', util.inspect(ctx, { depth: null }));
        
        ctx.eventLogger.emit("suilend_capsule_objects", {
            id: self.data_decoded.id,
            rarity: self.data_decoded.rarity
        });
        
        console.log('Event emitted for capsule ID:', self.data_decoded.id);
    })
}