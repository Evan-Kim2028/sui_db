import { egg } from "../types/sui/aftermath_egg_nft.js";
import { SuiObjectChangeContext, SuiObjectTypeProcessor } from "@sentio/sdk/sui"
import { SuiObjectChange } from '@mysten/sui/client'
import { processObjectChanges } from "../utils/objectChangeProcessor.js";


export function initAfEggProcessor() {
    // get all egg ids
    SuiObjectTypeProcessor.bind({
      objectType: egg.AfEgg.type(),
      startCheckpoint: 24018000n
    })
    .onTimeInterval(async (self, _, ctx) => {
      // get the object static fields for the object type
      ctx.eventLogger.emit("aftermath_egg_objectids", {
        id: self.data_decoded.id
      })
    }, undefined, 4800)
    .onObjectChange((changes: SuiObjectChange[], ctx: SuiObjectChangeContext) => {
      processObjectChanges(changes, ctx);
    });
  }
  