import { SuiObjectChangeContext, SuiObjectContext, SuiObjectProcessor } from "@sentio/sdk/sui"
import { MoveValue, SuiObjectChange } from '@mysten/sui/client'
const suilendMdrop = '0xef40b6d070de0c55dcb12775e4c438b1d83e0b5f445e95875f46eb2742a5549c'


export function initSuilendMdropProcessor() {
    SuiObjectProcessor.bind({
    objectId: suilendMdrop
  })
  .onTimeInterval(async (self, dynamicFieldObjects, ctx: SuiObjectContext) => {
    dynamicFieldObjects.forEach(field => {
      if (field.dataType === 'moveObject' && 'fields' in field.fields) {
        const fields = field.fields.fields as { [key: string]: MoveValue };
        const serializedFields = JSON.stringify(fields);
  
        ctx.eventLogger.emit("DynamicFieldSnapshot", {
          type: field.type,
          fields: serializedFields
        });
      }
    });
  });
}

