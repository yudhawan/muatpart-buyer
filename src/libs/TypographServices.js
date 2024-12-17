export const hightlightText = (val,text)=>{
    const result = text.replace(new RegExp(val,'gi'),"<b>$&</b>")
    return result
}