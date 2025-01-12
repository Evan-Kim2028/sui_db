import { mtoken } from "../types/sui/mtoken.js";

export function initSuilendMdropPackageProcessor() {
    mtoken.bind({})
    .onEventMintMTokensEvent((event, ctx) => {
        ctx.eventLogger.emit("mdrop_mintMtokens", {
            mtoken_minted: event.data_decoded.mtoken_minted.toString(),
            mtoken_type: event.data_decoded.mtoken_type,
            vesting_type: event.data_decoded.vesting_type,
            penalty_type: event.data_decoded.penalty_type
        });
    })
    .onEventPenaltyCollectedEvent((event, ctx) => {
        ctx.eventLogger.emit("mdrop_penaltyCollected", {
            amount_collected: event.data_decoded.amount_collected.toString(),
            mtoken_type: event.data_decoded.mtoken_type,
            vesting_type: event.data_decoded.vesting_type,
            penalty_type: event.data_decoded.penalty_type
        });
    })
    .onEventRedeemMTokensEvent((event, ctx) => {
        ctx.eventLogger.emit("mdrop_redeemMtokens", {
            penalty_amount: event.data_decoded.penalty_amount.toString(),
            mtoken_type: event.data_decoded.mtoken_type,
            vesting_type: event.data_decoded.vesting_type,
            penalty_type: event.data_decoded.penalty_type,
            withdraw_amount: event.data_decoded.withdraw_amount.toString(),
        });
    })
}