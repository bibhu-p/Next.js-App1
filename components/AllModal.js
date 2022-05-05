import { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = (props) => {
    // console.log(props.data);
    const [regFormValues, setRegFormValues] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        adhaar: '',
        phone: '',
        address: ''
    });
    const [regFormErr, setRegFormErr] = useState({
        name: false,
        email: false,
        pwd: false,
        age: false,
        adhaar: false,
        phone: false,
        address: false
    })
    useEffect(() => {
        if (props.action === "edit") {
            setRegFormValues(props.userInfo);
            // console.log('edit mode, data---->>>', userDetails)
        }
    }, [props.action])
    const classes = {
        valid: "transition ease-in-out focus:duration-300 border-0 px-3 text-[0.9rem] rounded-[3px] bg-gray-300 mt-2 w-full h-9 focus:ring-gray-700 focus:ring-1",
        inValid: "transition ease-in-out focus:duration-300 border-0 px-3 text-[0.9rem] rounded-[3px] bg-gray-300 mt-2 w-full h-9 ring-1 ring-red-400 focus:ring-red-400 focus:ring-1"
    }
    const clear = () => {
        setRegFormValues({
            ...regFormValues,
            name: '',
            email: '',
            password: '',
            age: '',
            adhaar: '',
            phone: '',
            address: ''
        });
    }
    const onAdd = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!regFormValues.name) {
            setRegFormErr({ ...regFormErr, name: true })
            return;
        }
        if (!regFormValues.email) {
            setRegFormErr({ ...regFormErr, email: true })
            return;
        } else if (!regex.test(regFormValues.email)) {
            setRegFormErr({ ...regFormErr, email: true })
            return;
        }
        if (!regFormValues.password) {
            setRegFormErr({ ...regFormErr, pwd: true })
            return;
        }
        if (!regFormValues.age) {
            setRegFormErr({ ...regFormErr, age: true })
            return;
        }
        if (!regFormValues.phone) {
            setRegFormErr({ ...regFormErr, phone: true })
            return;
        }
        if (!regFormValues.adhaar) {
            setRegFormErr({ ...regFormErr, adhaar: true })
            return;
        }
        if (!regFormValues.address) {
            setRegFormErr({ ...regFormErr, address: true })
            return;
        }
        console.log(regFormValues);

        switch (props.action) {
            case 'add': {
                let url = 'http://localhost:5000/api/user/register';
                axios.post(url, regFormValues)
                    .then((res) => {
                        console.log(res.data);
                        // setSpinner(false)
                        props.getData()
                        clear()
                        props.setShowModal(false)
                    }).catch(err => {
                        console.log('user create error--->>>', err)
                    })
            }
            case 'edit': {
                let url = 'http://localhost:5000/api/user/update/' + props.userInfo._id;
                axios.put(url, regFormValues)
                    .then((res) => {
                        console.log(res.data);
                        // setSpinner(false)
                        // props.getData()
                        clear()
                        props.setShowModal(false)
                    }).catch(err => {
                        console.log('user create error--->>>', err)
                    })
            }
            default: {
                break;
            }
        }
    }

    return (
        <div className="flex justify-center items-center flex-col w-1/3 rounded shadow-2xl h-auto p-2">
            <div className=''>
                <div className='px-2 m-2'>
                    <div className="text-gray-800 font-semibold ">Name</div>
                    <div className='flex '>
                        <input
                            type={'text'}
                            id="name"
                            name="name"
                            autoComplete=''
                            value={regFormValues.name}
                            onChange={(e) => { setRegFormErr({ ...regFormErr, name: false }); setRegFormValues({ ...regFormValues, name: e.target.value }) }}
                            className={regFormErr.name ? classes.inValid : classes.valid}
                        />
                    </div>
                </div>
                <div className='m-2 px-2'>
                    <div className="text-gray-800 font-semibold  ">Email</div>
                    <div className='flex'>
                        <input
                            type={'text'}
                            id="email"
                            name="email"
                            autoComplete=''
                            // disabled= {props.action === 'edit' ? true: false}
                            value={regFormValues.email}
                            onChange={(e) => { setRegFormErr({ ...regFormErr, email: false }); setRegFormValues({ ...regFormValues, email: e.target.value }) }}
                            className={regFormErr.email ? classes.inValid : classes.valid}
                        />
                    </div>
                </div>
                <div className='m-2 px-2'>
                    <div className="text-gray-800 font-semibold">Password</div>
                    <div className='flex '>
                        <input
                            type={'password'}
                            id="password"
                            name="password"
                            autoComplete=''
                            value={regFormValues.password}
                            onChange={(e) => { setRegFormErr({ ...regFormErr, pwd: false }); setRegFormValues({ ...regFormValues, password: e.target.value }) }}
                            className={regFormErr.pwd ? classes.inValid : classes.valid} />
                    </div>
                </div>
                <div className='m-2 px-2'>
                    <div className="text-gray-800 font-semibold ">Age</div>
                    <div className='flex'>
                        <input
                            type={'text'}
                            id="age"
                            name="age"
                            autoComplete=''
                            value={regFormValues.age}
                            onChange={(e) => { setRegFormErr({ ...regFormErr, age: false }); setRegFormValues({ ...regFormValues, age: e.target.value }) }}
                            className={regFormErr.age ? classes.inValid : classes.valid}
                        />
                    </div>
                </div>
                <div className='m-2  px-2'>
                    <div className="text-gray-800 font-semibold ">Phone</div>
                    <div className='flex '>
                        <input
                            type={'text'}
                            id="phone"
                            name="phone"
                            autoComplete=''
                            value={regFormValues.phone}
                            onChange={(e) => { setRegFormErr({ ...regFormErr, phone: false }); setRegFormValues({ ...regFormValues, phone: e.target.value }) }}
                            className={regFormErr.phone ? classes.inValid : classes.valid}
                        />
                    </div>
                </div>
                <div className='m-2 px-2'>
                    <div className="text-gray-800 font-semibold">Adhaar</div>
                    <div className='flex '>
                        <input
                            type={'text'}
                            id="adhaar"
                            name="adhaar"
                            autoComplete=''
                            value={regFormValues.adhaar}
                            onChange={(e) => { setRegFormErr({ ...regFormErr, adhaar: false }); setRegFormValues({ ...regFormValues, adhaar: e.target.value }) }}
                            className={regFormErr.adhaar ? classes.inValid : classes.valid} />
                    </div>
                </div>

                <div className='m-2 px-2'>
                    <div className="text-gray-800 font-semibold ">Address</div>
                    <div className='flex '>
                        <input
                            type={'text'}
                            id="address"
                            name="address"
                            autoComplete=''
                            value={regFormValues.address}
                            onChange={(e) => { setRegFormErr({ ...regFormErr, address: false }); setRegFormValues({ ...regFormValues, address: e.target.value }) }}
                            className={regFormErr.address ? classes.inValid : classes.valid}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-evenly">
                <button
                    className="my-5  w-24 h-10 bg-gray-100 text-dark rounded-md hover:bg-gray-200 flex justify-center items-center font-semibold transition ease-in-out hover:duration-300"
                    onClick={() => props.setShowModal(false)}>
                    Close
                </button>
                <button
                    className=" my-5 mx-5 bg-gray-600 w-[6rem] h-10 text-white rounded-md hover:bg-gray-800 flex justify-center items-center font-semibold transition ease-in-out hover:duration-300"
                    onClick={() => onAdd()}>
                   {props.action === 'add' ? 'Add ' : 'Update'}
                </button>
            </div>
        </div>
    );
}

export default Modal;