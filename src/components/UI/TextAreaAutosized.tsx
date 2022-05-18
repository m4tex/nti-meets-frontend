import React, {ForwardedRef, MutableRefObject, useEffect, useState} from "react";
import styled from "styled-components";

const StyledTA = styled.textarea`
  border-radius: 8px;
  border: 1px solid #a9a9a9;
  padding: 8px;
`

const TextAreaAutosized = React.forwardRef<HTMLTextAreaElement, {name:string, id?:string, placeholder?:string, className?:string, required?:boolean, value?:string, onChange?:(val:string)=>void}>(function(props, ref) {
    const [textValue, setTextValue] = useState<string>('');

    //I love typescript (no) (took 45 minutes of my life)
    function isRef(ref: ForwardedRef<HTMLTextAreaElement>) : ref is MutableRefObject<HTMLTextAreaElement> {
        return (ref as MutableRefObject<HTMLTextAreaElement>).current !== undefined;
    }

    useEffect(() => {
        if (ref && isRef(ref)) {
            ref.current!.style.height = 'inherit';
            ref.current!.style.height = `${ref.current!.scrollHeight}px`;
        }
    }, [textValue]);

    return (
        <StyledTA name={props.name} id={props.id} placeholder={props.placeholder} className={props.className} ref={ref} value={props.value === undefined ? textValue : props.value}
                  onChange={props.value === undefined ? e => setTextValue(e.target.value) : e => (props.onChange as (val:string) => void)(e.target.value) } style={{resize:"none"}} required={props.required} />
    )
});

export default TextAreaAutosized;