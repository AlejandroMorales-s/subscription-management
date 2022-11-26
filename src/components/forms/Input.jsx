import {Field} from "formik"
import { useState } from "react"
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

export default function Input({type,name, placeholder, label}) {
    const [isVisible, setIsVisible] = useState(false)
    let typeHandler = 'password'
    
    const showPassword = () => setIsVisible(!isVisible)

    if(isVisible) typeHandler = 'text' 
    else typeHandler = 'password'

    return (
        <div className="input-form-container">
            <label>{label}</label>
            <Field type={type === 'password' ? typeHandler : type} name={name} placeholder={placeholder}/>
            {isVisible && type === 'password' && <AiOutlineEyeInvisible className="password-icon" onClick={showPassword}/>}
            {!isVisible && type === 'password' && <AiOutlineEye className="password-icon" onClick={showPassword}/>}
        </div>
    )
}
