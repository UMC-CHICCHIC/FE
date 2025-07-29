import { ChangeEvent, useEffect, useState } from "react";

interface useFormProps<T> {
    initialValues: T;
    validate: (values: T) => Record<keyof T, string>; //값이 올바른지 확인하는 함수
}

function useForm<T>({ initialValues, validate }: useFormProps<T>) {
    const [values, setValues] = useState(initialValues) //초기값을 설정하는 useState
    const [touched, setTouched] = useState<Record<string, boolean>>()
    const [errors, setErrors] = useState<Record<keyof T, string>>() //에러를 설정하는 useState

    const handleChange = (name:keyof T, text:string) => {
        setValues({
            ...values, //기존의 값 유지
            [name]: text
        })
    }

    const handleBlur = (name:keyof T) => {
        setTouched({
            ...touched, //기존의 값 유지
            [name]: true //이름에 해당하는 값을 true로 설정
        })
    }

    const getInputProps = (name:keyof T) => {
        const value = values[name] //이름에 해당하는 값을 가져옴
        const onChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => 
            handleChange(name, e.target.value) //이름에 해당하는 값을 변경
        const onBlur= () => handleBlur(name) //이름에 해당하는 값을 블러 처리

        return {value, onChange, onBlur} 
    }
    useEffect(() => {
        const newErrors = validate(values) //값을 검증하는 함수
        setErrors(newErrors) //검증된 값을 에러에 설정
    },[validate,values])

    return {values,errors,touched,getInputProps} //값을 반환
}

export default useForm