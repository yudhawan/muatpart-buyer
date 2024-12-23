import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input'
import ModalComponent from '@/components/Modals/ModalComponent';
import RadioButton from '@/components/Radio/RadioButton'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const list_periode=[
    {
        name:'Semua Periode (Default)',
        value:'',
        format:'day'
    },
    {
        name:'Hari Ini',
        value:0,
        format:'day'
    },
    {
        name:'1 Minggu Terakhir',
        value:7,
        format:'day'
    },
    {
        name:'30 Hari Terakhir',
        value:30,
        format:'month'
    },
    {
        name:'90 Hari Terakhir',
        value:90,
        format:'month'
    },
    {
        name:'1 Tahun Terakhir',
        value:1,
        format:'year'
    },
    {
        name:'Pilih Periode',
        value:'custom',
        format:'year'
    },
    
]
function ModalPeriode({onSelected=()=>{},defaultValue,onClose}) {
    const [selected,setSelected]=useState(list_periode[0])
    const [focusCustom,setFocusCustom]=useState('')
    const [getCustom,setCustom]=useState({
        start:null,
        end:null
    })
    const [validation,setValidation]=useState([])
    function onSelectedCustom(val,label) {
        const tmp = getCustom
        const revalidate = validation.filter(val=>val!==label)
        setValidation(revalidate)
        tmp[label]=clasifyformatdate.getClasifyPeriodeByRange(val)
        setCustom(tmp)
    }
    function handleTerapkan(){
        if(selected.value==='custom'){
            if(!getCustom.start) {
                setValidation(a=>([...a,'start']))
                return
            }
            if(!getCustom.end) {
                setValidation(a=>([...a,'end']))
                return
            }
            onSelected(getCustom)
        }
        else onSelected(clasifyformatdate.getClasifyPeriode(selected.value,selected.format))
        onClose()
    }
    useEffect(()=>{
        if(defaultValue) setSelected(defaultValue)
    },[defaultValue])
  return (
    <div className='px-4 pt-6 flex flex-col gap-4 overflow-y-auto max-h-[386px] pb-4'>
        <ModalComponent hideHeader showButtonClose={false} isOpen={focusCustom==='start'||focusCustom==='end'} setClose={()=>setFocusCustom('')}>
            <div className='flex justify-center'>
                <Calendar className={'rounded-md'} onChange={date=>{
                    onSelectedCustom(date,focusCustom)
                    setFocusCustom('')
                }} />
            </div>
        </ModalComponent>
        {list_periode.map(val=><div key={val.name} className='flex justify-between w-full pb-4 border-b border-neutral-400 select-none' onClick={()=>{
            setSelected(val)
        }}>
            <span className='semi-sm'>{val.name}</span>
            <RadioButton label={''} checked={val.name===selected?.name}  />
        </div>)}
        <div className='flex items-center gap-2 justify-between'>
            <div className='relative'>
                <Input value={getCustom.start} focusEvent={()=>setFocusCustom('start')} disabled={selected?.value!=='custom'} classname={`!w-full ${validation.includes('start')?'input-error':''}`} classInput={'!w-full'} placeholder='Periode Awal' icon={{left:'/icons/calendar.svg'}} />
                {validation.includes('start')?<span className='medium-xs text-error-400 absolute -bottom-6'>Periode awal harus diisi</span>:''}
            </div>
            <span className='semi-xs text-[#676767]'>s/d</span>
            <div className='relative'>
                <Input value={getCustom.end} focusEvent={()=>setFocusCustom('end')} disabled={selected?.value!=='custom'} classname={`!w-full ${validation.includes('end')?'input-error':''}`} classInput={'!w-full'} placeholder='Periode Akhir' icon={{left:'/icons/calendar.svg'}} />
                {validation.includes('end')?<span className='medium-xs text-error-400 absolute -bottom-6'>Periode akhir harus diisi</span>:''}
            </div>
        </div>
        <Button Class='!w-full !max-w-full h-10 mt-4' onClick={handleTerapkan}>Terapkan</Button>
    </div>
  )
}

export default ModalPeriode

class ClasifyDate {
    constructor() {
        const currentDate = new Date()
        this.date = currentDate.getDate()
        this.month=currentDate.getMonth()+1
        this.year=currentDate.getFullYear()
    }
    getClasifyPeriode(val,format){
        if(format==='month') return `${this.year}-${this.month-val}-${this.date}`
        if(format==='year') return `${this.year-val}-${this.month}-${this.date}`
        return `${this.year}-${this.month}-${this.date-val}`
    }
    getClasifyPeriodeByRange(value){
        const newDate = new Date(value)
        let date = newDate.getDate()
        let month=newDate.getMonth()+1
        let year=newDate.getFullYear()
        return `${year}-${month}-${date}`
    }
}
const clasifyformatdate= new ClasifyDate()