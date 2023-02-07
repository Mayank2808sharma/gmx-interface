import { t } from "@lingui/macro";
import StatsTooltipRow from "components/StatsTooltip/StatsTooltipRow";
import Tooltip from "components/Tooltip/Tooltip";
import { BigNumberish } from "ethers";
import { USD_DECIMALS } from "lib/legacy";
import { formatAmount } from "lib/numbers";

type Props = {
  position: {
    collateral: BigNumberish;
    deltaBeforeFeesStr: string;
    deltaAfterFeesStr: string;
    deltaAfterFeesPercentageStr: string;
    fundingFee: BigNumberish;
    closingFee: BigNumberish;
    netValue: BigNumberish;
  };
  showPnlAfterFees: boolean;
  isMobile?: boolean;
};

export default function NetValueTooltip({ position, isMobile, showPnlAfterFees }: Props) {
  return (
    <Tooltip
      handle={`$${formatAmount(position.netValue, USD_DECIMALS, 2, true)}`}
      position={isMobile ? "right-bottom" : "left-bottom"}
      handleClassName="plain"
      renderContent={() => {
        return (
          <>
            {showPnlAfterFees
              ? t`Net Value: Initial Collateral + PnL - Borrow Fee - Close Fee`
              : t`Net Value: Initial Collateral + PnL - Borrow Fee`}
            <br />
            <br />
            <StatsTooltipRow
              label={t`Initial Collateral`}
              value={formatAmount(position.collateral, USD_DECIMALS, 2, true)}
            />
            <StatsTooltipRow label={t`PnL`} value={position.deltaBeforeFeesStr} showDollar={false} />
            <StatsTooltipRow
              label={t`Borrow Fee`}
              showDollar={false}
              value={`-$${formatAmount(position.fundingFee, USD_DECIMALS, 2, true)}`}
            />
            <StatsTooltipRow
              label={t`Open Fee`}
              showDollar={false}
              value={`-$${formatAmount(position.closingFee, USD_DECIMALS, 2, true)}`}
            />
            <StatsTooltipRow
              label={t`Close Fee`}
              showDollar={false}
              value={`-$${formatAmount(position.closingFee, USD_DECIMALS, 2, true)}`}
            />
            <br />
            <StatsTooltipRow
              label={t`PnL After Fees`}
              value={[position.deltaAfterFeesStr, `(${position.deltaAfterFeesPercentageStr})`]}
              showDollar={false}
            />
          </>
        );
      }}
    />
  );
}
