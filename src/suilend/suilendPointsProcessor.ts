import { points } from "../types/sui/suilend_capsule_processor.js";

export function initSuilendPointsProcessor() {
    points.bind()
    .onEventBurnEvent((event, ctx) => {
        ctx.eventLogger.emit("suilend_points_burn", {
            amount: event.data_decoded.claim_amount.toString(),
            sender: event.sender,
            points_burned: event.data_decoded.points_burned.toString()
        });
    })
    .onEventRatio((event, ctx) => {
        ctx.eventLogger.emit("suilend_points_ratio", {
            denominator: event.data_decoded.denominator.toString(),
            numerator: event.data_decoded.numerator.toString()
        });
    })
}