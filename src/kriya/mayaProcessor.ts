import { actions } from "../types/sui/maya_burn.js";

export function initMayaProcessor() {
    actions.bind({})
    .onEventClaimEvent((event, ctx) => {
        ctx.eventLogger.emit("maya_claimed", {
            pfp_id: event.data_decoded.pfp_id,
            pfp_number: event.data_decoded.pfp_number,
            minted_by: event.data_decoded.minted_by,
            net_maya_burnt: event.data_decoded.net_maya_burnt,
            boost_amount: event.data_decoded.boost_amount,
            old_rank: event.data_decoded.old_rank,
            new_rank: event.data_decoded.new_rank,
            timestamp: event.data_decoded.timestamp
        });
    })
    .onEventMintEvent((event, ctx) => {
        ctx.eventLogger.emit("maya_minted", {
            pfp_id: event.data_decoded.pfp_id,
            pfp_number: event.data_decoded.pfp_number,
            minted_by: event.data_decoded.minted_by,
            payment: event.data_decoded.payment,
            referral_code: event.data_decoded.referral_code
        });
    });
}