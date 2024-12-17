export const numberFormatMoney = (val)=>{
    let currency = new Intl.NumberFormat('id-ID',{
        style:'currency',
        currency:'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(val)
    currency = currency.replace(/\s/g, '')
    return currency
}

export const thousandSeparator=(x)=> {
    const val= x.toLocaleString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
    const lastIdx = val.lastIndexOf('.')
    const string = val.toString().slice(0,lastIdx) + ','+val.slice(lastIdx+1)
    return string
}