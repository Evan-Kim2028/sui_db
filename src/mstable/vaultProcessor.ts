import { events } from "../types/sui/mstable_vault.js";

export function initMstableVaultProcessor() {
    events.bind({startCheckpoint: 100631242n})
    .onEventEvent((event, ctx) => {
        if (event.type_arguments[0] !== "0xca653d2fac70a49549c7ff8792027fa4fa418fd6619954ea0f45d6fd0d081b8e::events::DepositEvent") {
            return;
        }
        
        let coinInType = '';
        let metaCoinType = '';
        
        try {
            coinInType = '0x' + (Array.isArray(event.data_decoded.pos0.coin_in_type) 
                ? event.data_decoded.pos0.coin_in_type.map((x: number) => String.fromCharCode(x)).join('')
                : String(event.data_decoded.pos0.coin_in_type));
            
            metaCoinType = '0x' + (Array.isArray(event.data_decoded.pos0.meta_coin_type)
                ? event.data_decoded.pos0.meta_coin_type.map((x: number) => String.fromCharCode(x)).join('')
                : String(event.data_decoded.pos0.meta_coin_type));
        } catch (error) {
            ctx.eventLogger.emit("mstable_vault_deposit_error", {
                error: error.message,
                checkpoint: ctx.checkpoint
            });
            return;
        }

        ctx.eventLogger.emit("mstable_vault_deposit", {
            vault_id: event.data_decoded.pos0.vault_id,
            meta_coin_type: metaCoinType,
            meta_coin_amount_minted: event.data_decoded.pos0.meta_coin_amount_minted,
            meta_coin_amount_total_supply: event.data_decoded.pos0.meta_coin_amount_total_supply,
            coin_in_type: coinInType,
            coin_in_amount_deposited: event.data_decoded.pos0.coin_in_amount_deposited,
            coin_in_amount_in_vault: event.data_decoded.pos0.coin_in_amount_in_vault,
            exchange_rate_meta_coin_to_coin_in: event.data_decoded.pos0.exchange_rate_meta_coin_to_coin_in
        });
    })
    .onEventEvent((event, ctx) => {
        if (event.type_arguments[0] !== "0xca653d2fac70a49549c7ff8792027fa4fa418fd6619954ea0f45d6fd0d081b8e::events::WithdrawEvent") {
            return;
        }
        
        let coinOutType = '';
        let metaCoinType = '';
        
        try {
            coinOutType = '0x' + (Array.isArray(event.data_decoded.pos0.coin_out_type)
                ? event.data_decoded.pos0.coin_out_type.map((x: number) => String.fromCharCode(x)).join('')
                : String(event.data_decoded.pos0.coin_out_type));
            
            metaCoinType = '0x' + (Array.isArray(event.data_decoded.pos0.meta_coin_type)
                ? event.data_decoded.pos0.meta_coin_type.map((x: number) => String.fromCharCode(x)).join('')
                : String(event.data_decoded.pos0.meta_coin_type));
        } catch (error) {
            ctx.eventLogger.emit("mstable_vault_withdraw_error", {
                error: error.message,
                checkpoint: ctx.checkpoint
            });
            return;
        }

        ctx.eventLogger.emit("mstable_vault_withdraw", {
            vault_id: event.data_decoded.pos0.vault_id,
            meta_coin_type: metaCoinType,
            meta_coin_amount_burned: event.data_decoded.pos0.meta_coin_amount_burned,
            meta_coin_amount_total_supply: event.data_decoded.pos0.meta_coin_amount_total_supply,
            coin_out_type: coinOutType,
            coin_out_amount_withdrawn: event.data_decoded.pos0.coin_out_amount_withdrawn,
            coin_out_amount_in_vault: event.data_decoded.pos0.coin_out_amount_in_vault,
            fee_coin_amount: event.data_decoded.pos0.fee_coin_amount,
            exchange_rate_meta_coin_to_coin_out: event.data_decoded.pos0.exchange_rate_meta_coin_to_coin_out
        });
    })
    .onEventEvent((event, ctx) => {
        if (event.type_arguments[0] !== "0xca653d2fac70a49549c7ff8792027fa4fa418fd6619954ea0f45d6fd0d081b8e::events::SwapEvent") {
            return;
        }

        let coinInType = '';
        let coinOutType = '';
        
        try {
            coinInType = '0x' + (Array.isArray(event.data_decoded.pos0.coin_in_type)
                ? event.data_decoded.pos0.coin_in_type.map((x: number) => String.fromCharCode(x)).join('')
                : String(event.data_decoded.pos0.coin_in_type));
            
            coinOutType = '0x' + (Array.isArray(event.data_decoded.pos0.coin_out_type)
                ? event.data_decoded.pos0.coin_out_type.map((x: number) => String.fromCharCode(x)).join('')
                : String(event.data_decoded.pos0.coin_out_type));
        } catch (error) {
            ctx.eventLogger.emit("mstable_vault_swap_error", {
                error: error.message,
                checkpoint: ctx.checkpoint
            });
            return;
        }

        ctx.eventLogger.emit("mstable_vault_swap", {
            vault_id: event.data_decoded.pos0.vault_id,
            coin_in_type: coinInType,
            coin_in_amount_deposited: event.data_decoded.pos0.coin_in_amount_deposited,
            coin_in_amount_in_vault: event.data_decoded.pos0.coin_in_amount_in_vault,
            coin_out_type: coinOutType,
            coin_out_amount_withdrawn: event.data_decoded.pos0.coin_out_amount_withdrawn,
            coin_out_amount_in_vault: event.data_decoded.pos0.coin_out_amount_in_vault,
            fee_coin_amount: event.data_decoded.pos0.fee_coin_amount,
            exchange_rate_meta_coin_to_coin_in: event.data_decoded.pos0.exchange_rate_meta_coin_to_coin_in,
            exchange_rate_meta_coin_to_coin_out: event.data_decoded.pos0.exchange_rate_meta_coin_to_coin_out
        });
    })
}