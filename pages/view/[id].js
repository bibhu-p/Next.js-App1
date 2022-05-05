import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import AllModal from "./.././../components/AllModal";


const View = () => {
    const router = useRouter();
    const userId = router.query.id;
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('edit');
    // console.log(userId);

    const [userInfo, setUserInfo] = useState({})
    const getUserInfo = () => {
        let url = 'http://localhost:5000/api/user/find/' + userId;
        setLoading(true);
        axios.get(url)
            .then((response) => {
                setUserInfo(response.data);
                setLoading(false);
                // console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>
            {loading
                ?
                <div className="flex justify-center items-baseline  h-[100vh] w-[100vw] bg-[#F7FAFC]">
                    <div className="card  w-[70%] mt-10">
                        <div className="mb-4 flex flex-row justify-between">
                            <span className=" w-16 h-4 bg-gray-200 animate-pulse"></span>
                            <button className="w-6 h-6 bg-gray-200 animate-pulse "></button>
                        </div>
                        <div className="border-t">
                            <div class="grid grid-cols-3 gap-2">
                                <div class="rounded col-span-1 my-4">
                                    <div className="mb-2 w-36 h-4 bg-gray-200 animate-pulse"></div>
                                    <div className=" w-32 h-4 bg-gray-200 animate-pulse"></div>
                                </div>
                                <div class="rounded col-span-1 my-4">
                                    <div className="mb-2 w-14 h-4 bg-gray-200 animate-pulse"></div>
                                    <div className=" w-32 h-4 bg-gray-200 animate-pulse"></div>
                                </div>
                                <div class="rounded col-span-1 my-4">
                                    <div className="mb-2 w-32 h-4 bg-gray-200 animate-pulse"></div>
                                    <div className=" w-28 h-4 bg-gray-200 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="flex justify-center items-baseline  h-[100vh] w-[100vw] bg-[#F7FAFC]">
                    <div className="card w-[70%] mt-10">
                        <div className="border-b pb-4 flex flex-row justify-between">
                            <span className="text-xl"> User Info</span>
                            <button onClick={() => setShowModal(true)} ><BiEditAlt size={25} /></button>

                        </div>
                        <div className="">
                            <div class="grid grid-cols-3 gap-2">
                                <div class="rounded col-span-1 my-4">
                                    <div className="mb-2">Name : {userInfo.name}</div>
                                    <div>Email :{userInfo.email} </div>
                                </div>
                                <div class="rounded col-span-1 my-4">
                                    <div className="mb-2">Age : {userInfo.age}</div>
                                    <div>Adhaar : {userInfo.adhaar}</div>
                                </div>
                                <div class="rounded col-span-1 my-4">
                                    <div className="mb-2">Phone No. : {userInfo.phone}</div>
                                    <div>Address : {userInfo.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showModal ? <AllModal
                        setShowModal={setShowModal}
                        userInfo={userInfo}
                        action={action}
                    /> : null}
                </div>
            }

        </>
    );
}

export default View;