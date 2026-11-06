import { Prisma } from "@prisma/client";

export type LedgerEntryType =
  | "INITIAL_GRANT"
  | "STOCK_BUY"
  | "STOCK_SELL"
  | "MF_BUY"
  | "MF_SELL"
  | "SIP_INSTALLMENT"
  | "RESET"
  | "TOP_UP";

export interface RecordTransactionParams {
  walletId: string;
  amount: number; // positive for credit, negative for debit
  type: LedgerEntryType;
  description: string;
  referenceId?: string;
}

/**
 * Executes a ledger transaction inside an atomic Prisma transaction.
 * Invariant: VirtualWallet.balance must equal the cumulative sum of WalletLedger.amount.
 * Cash balance cannot drop below 0.
 */
export async function recordTransaction(
  tx: Prisma.TransactionClient,
  params: RecordTransactionParams
) {
  const { walletId, amount, type, description, referenceId } = params;

  // Retrieve current wallet projection
  const wallet = await tx.virtualWallet.findUnique({
    where: { id: walletId },
  });

  if (!wallet) {
    throw new Error(`Wallet not found: ${walletId}`);
  }

  const nextBalance = Number((wallet.balance + amount).toFixed(2));

  if (nextBalance < 0) {
    throw new Error(
      `Insufficient funds! Current balance: ₹${wallet.balance.toLocaleString(
        "en-IN"
      )}, attempted debit: ₹${Math.abs(amount).toLocaleString("en-IN")}`
    );
  }

  // Create immutable ledger record
  const ledgerEntry = await tx.walletLedger.create({
    data: {
      walletId,
      amount,
      balanceAfter: nextBalance,
      type,
      description,
      referenceId: referenceId || null,
    },
  });

  // Update cached wallet projection
  const updatedWallet = await tx.virtualWallet.update({
    where: { id: walletId },
    data: {
      balance: nextBalance,
    },
  });

  return {
    wallet: updatedWallet,
    ledgerEntry,
  };
}
