import React, { useState } from 'react';
import './ReactiveInput.css'
export default function ReactiveInput() {
    const [underline, setunderline] = useState(false);
    const [background, setBackground] = useState('');
    const [active, setActive] = useState(false);
    const landLineTest = /^[0][9|3|2|4|8]*$/;
    const cellTest = /^[0][5]*$/;
    
    ////////////////////////////functions//////////////////////////
    function checkValue(element) {
        if (!/^-?\d*$/.test(element.value)) {
            element.value = element.value.replace(/[^\d.-]/g, '');
        }
        if (element.value.length >= 2) {
            console.log(underline);
            if (landLineTest.test(element.value.substring(0, 2))) {
                console.log(element.value.replace(/_/g, '').length)
                console.log(underline);
                if (element.value.replace(/_/g, '').length >= 10) {
                    setBackground('');
                } else {
                    setBackground('#fcc');
                }
                if (!underline) {
                    setBackground('#fcc');
                    element.value = `${element.value}-`
                }
                setunderline(true);
                underlineGen(element.value, element, false)
            } else if (cellTest.test(element.value.substring(0, 2))) {
                if (element.value.replace(/_/g, '').length >= 11) {
                    setBackground('');
                } else {
                    setBackground('#fcc');
                }
                if (!underline) {
                    setBackground('#fcc');
                    element.value = `${element.value}_-`
                }

                setunderline(true);
                underlineGen(element.value, element, true)
            }
        } else {
            setunderline(false);
            setBackground('');
        }
    }
    /////////////////////

    let underlineGen = (string, input, bool) => {
        if (bool) {
            input.maxLength = 12;
        } else {
            input.maxLength = 11;
        }
        let x = string;
        let y = "";
        let l = (bool) ? 11 : 10;
        for (let i = 0; i < l; i++) {
            if (x[i] === undefined || x[i] === " ") {
                y += "_";
            } else {
                y += x[i];
            }
        }
        input.value = y;
        console.log(string.indexOf('_'));
        if (string.indexOf('_') === 2) {
            moveCaret(input, y.replace(/_/g, '').length - 1)
        } else {
            moveCaret(input, y.replace(/_/g, '').length)
        }

        if (string.replace(/_/g, '') > 4) {

            input.value = input.value.replace(/_/g, '');
        }
    }

    let moveCaret = (input, distance) => {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(distance, distance);
        } else if (input.createTextRange) {
            let range = input.createTextRange();
            range.collapse(true);
            range.moveEnd(distance);
            range.moveStart(distance);
            range.select();
        }
    }

    let handleFocus = () =>{
        setActive(true);
    }
    let handleBlur = (value) =>{
        if (value === '') {
            setActive(false);
        }
    }

    return (
        <div style={{width: 'fit-content', height: 'fit-content'}}>
           <label
     className={active ? "field-active" : ""}
     >Phone</label>
            <input
                className={'ReactiveInput'}
                style={{
                    backgroundColor: background,
                }}
                onInput={(e) => checkValue(e.target)}
                onFocus={()=>handleFocus()}
                onBlur={(e)=>handleBlur(e.target.value)}
            />
        </div>
    );
}