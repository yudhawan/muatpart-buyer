import VoucherSlider from "./VoucherSlider";

function VoucherList({ vouchers, onClaimVoucher, onShowVoucherInfo }) {
  const handleClaimVoucher = (voucherId) => {
    if (onClaimVoucher) {
      onClaimVoucher(voucherId);
    }
  };

  return (
    <div className="w-full mt-4">
      <VoucherSlider 
        vouchers={vouchers.map(voucher => ({
          ...voucher,
          onClaim: () => handleClaimVoucher(voucher.id)
        }))} 
        onShowVoucherInfo={onShowVoucherInfo}
      />
    </div>
  );
}

export default VoucherList;