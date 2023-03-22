import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import './PasswordGenerator.css'


const PasswordGenerator = () => {
    const lowerCaseList = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersList = "1234567890";
    const symbolsList = "!@#$%^&*()-_~/?><"

    const [password, setPassword] = useState('');
    const [lowerCase, setLowerCase] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [passwordLength, setpasswordLength] = useState(8);

    useEffect(() => {
        passwordGeneratorHandler();
    }, [passwordLength])

    const setLowerCaseHandler = () => {
        setLowerCase(!lowerCase)
    }
    const setUpperCaseHandler = () => {
        setUpperCase(!upperCase)
    }
    const setNumbersCaseHandler = () => {
        setNumbers(!numbers)
    }
    const setSymbolsCaseHandler = () => {
        setSymbols(!symbols)
    }
    const rangeChangeHandler = (event) => {
        setpasswordLength(event.target.value)
    }

    const passwordGeneratorHandler = () => {
        let passWithAllCheck = '';
        if (lowerCase) {
            passWithAllCheck += lowerCaseList;
        }
        if (upperCase) {
            passWithAllCheck += upperCaseList;
        }
        if (numbers) {
            passWithAllCheck += numbersList;
        }
        if (symbols) {
            passWithAllCheck += symbolsList;
        }
        let finalPassword = '';
        const passWithAllCheckLength = passWithAllCheck.length;
        for (let i = 0; i < passwordLength; i++) {
            const charIndex = Math.round(Math.random() * passWithAllCheckLength)
            finalPassword += passWithAllCheck.charAt(charIndex);
        }
        setPassword(finalPassword);
    }

    const copiedPassword = async () => {
        const copiedText = await navigator.clipboard.readText();
        if (password.length !== 0 && copiedText !== password) {
            navigator.clipboard.writeText(password);
            toast.success('Copied Successfully!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (password.length === 0) {
            toast.warn('Please Select atleast 1 checkbox!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className="container">
                <div className="box">
                    <h1>Password Generator</h1>
                    <p>Customize Your Password</p>
                    <div className="match">
                        <div className="pass-display">
                            <div className="text-area">
                                <input type="text" disabled value={password} placeholder="Password"></input>
                            </div>
                            <div className="btn">
                                <input type="button" value="Copy Password" onClick={copiedPassword}></input>
                            </div>
                        </div>

                        <div className="checkdiv">
                            <div className="check-box">
                                <input type='checkbox' id='lower' checked={lowerCase} onChange={setLowerCaseHandler} />
                                <label htmlFor="lower">Include Lowercase Character(a-z)</label>
                            </div>

                            <div className="check-box">
                                <input type='checkbox' id='upper' checked={upperCase} onChange={setUpperCaseHandler} />
                                <label htmlFor="upper">Include Uppercase Character(A-Z)</label>
                            </div>

                            <div className="check-box">
                                <input type='checkbox' id='numbers' checked={numbers} onChange={setNumbersCaseHandler} />
                                <label htmlFor="numbers">Include Numerical Value(0-9)</label>
                            </div>

                            <div className="check-box">
                                <input type='checkbox' id='special-characters' checked={symbols} onChange={setSymbolsCaseHandler} />
                                <label htmlFor="special-characters">Include Special Characters(#,$,&)</label>
                            </div>
                        </div>

                    </div>

                    <div className="password-length">
                        <div className="pass-length-box">
                            <input type='range' id='myinput' min={8} max={16} defaultValue={passwordLength} onChange={rangeChangeHandler}></input>
                            <p>{passwordLength}</p>
                            <label htmlFor="myinput">Password length</label>
                        </div>
                    </div>

                    <div className="btn">
                        <input type="button" onClick={passwordGeneratorHandler} value="Generate Password"></input>
                    </div>
                </div>
            </div >

        </div>
    )
}
export default PasswordGenerator;