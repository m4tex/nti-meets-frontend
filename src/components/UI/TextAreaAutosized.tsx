import React, {ForwardedRef, MutableRefObject, useEffect, useRef, useState} from "react";
import styled from "styled-components";

const StyledTA = styled.textarea`
  border-radius: 8px;
  border: 1px solid #a9a9a9;
  padding: 8px;
`

function TextAreaAutosized(props: { name: string, id?: string, placeholder?: string, className?: string, required?: boolean, value?: string, onChange?: (val: string) => void }) {
    const [textValue, setTextValue] = useState<string>('');
    const iref = useRef<HTMLTextAreaElement>(null);
    //I love typescript (no) (took 45 minutes of my life)

    useEffect(() => {
        iref.current!.style.height = 'inherit';
        iref.current!.style.height = `${iref.current!.scrollHeight}px`;
    }, [props.value]);

    return (
        <StyledTA name={props.name} id={props.id} placeholder={props.placeholder} className={props.className} ref={iref}
                  value={props.value === undefined ? textValue : props.value}
                  onChange={props.value === undefined ? e => setTextValue(e.target.value) : e => (props.onChange as (val: string) => void)(e.target.value)}
                  style={{resize: "none"}} required={props.required}/>
    )
}

export default TextAreaAutosized;