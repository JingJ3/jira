import { useEffect,useState } from "react"

export const isFalsy = (value:unknown) => value ===0? false:!value

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object:object) =>{
    const result = {...object}
    Object.keys(result).forEach(key=>{
        //@ts-ignore
        const value = result[key]
        if(isFalsy(value)){
            //@ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback:()=>void)=>{
    useEffect(()=>{
        callback()
    },[])
}
//后面用泛型来规范类型
export const useDebounce = <V>(value:V,delay?:number) => {
    const [debouncedValue,setDebouncedValue] = useState(value)

    useEffect(()=>{
        //每次在value变化以后，设置一个定时器
        const timeout = setTimeout(()=>setDebouncedValue(value),delay);
        //useEffect的return执行时间：上一次的useEffect处理完之后
        return ()=>clearTimeout(timeout)
    },[value,delay])

    return debouncedValue
}