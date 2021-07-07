import React, {ReactNode} from "react";
import {ButtonContainer} from "./styles";
import Link from 'next/link'

interface IButton {
    type: 'primary' | 'secondary' | 'icon',
    text: string;
    onClick?: () => void;
    link?: string;
    icon? : ReactNode
}


export function Button({type, text, onClick, link, icon}: IButton) {
    /* if(type === 'primary'){
         return <ButtonPrimary>{text}</ButtonPrimary>
     }

     if(type === 'secondary'){
         return <ButtonPrimary>{text}</ButtonPrimary>
     }*/
    return (
        <ButtonContainer onClick={onClick} className={type}>
            {icon} Texto
        </ButtonContainer>
    )
}