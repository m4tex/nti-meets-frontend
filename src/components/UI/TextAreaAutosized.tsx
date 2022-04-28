import React, {ForwardedRef, MutableRefObject, useEffect, useState} from "react";
import styled from "styled-components";

const StyledTA = styled.textarea`
  border-radius: 8px;
  border: 1px solid #a9a9a9;
  padding: 5px;
`

const TextAreaAutosized = React.forwardRef<HTMLTextAreaElement, {name:string, id?:string, placeholder?:string, className?:string}>(function(props, ref) {
    const [textValue, setTextValue] = useState<string>('');

    //I love typescript (no)
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
        <StyledTA {...props} ref={ref} value={textValue} onChange={e => setTextValue(e.target.value)} style={{resize:"none"}} />
    )
});

export default TextAreaAutosized;