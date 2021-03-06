import { useState, useEffect } from "react";
import AllModal from "../components/AllModal";
import axios from "axios";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiUserPlus } from 'react-icons/fi';
import { useRouter } from "next/router";

const Home = () => {

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [action, setAction] = useState('add');

  const getData = () => {
    // console.log('get data function------');
    axios.get('http://localhost:5000/api/user/find')
      .then((response) => {
        setUsers(response.data.data)
      })
      .catch((error) => {
        return console.log(error);
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const viewData = (i) => {
    // console.log(i);
    router.push('/view/'+i)
  }

  const onDelete = (id) => {
    let url = 'http://localhost:5000/api/user/delete/' + id;
    axios.delete(url)
      .then((response) => {
        getData()
        return console.log(response);
      })
      .catch((error) => {
        return console.log(error);
      })
  }


  return (
    <div className="flex flex-col items-center ">
      <div className=" mt-6 w-full flex justify-end ">
        <button className="mr-16 bg-gray-600 w-[4rem] h-10 text-white rounded-md hover:bg-gray-800 flex justify-center items-center font-semibold transition ease-in-out hover:duration-300" onClick={() => setShowModal(true)}><FiUserPlus size={25}/></button>
      </div>

      <div className="w-[90%] rounded-md">
        <div className="grid grid-cols-8 gap-3 mt-3 rounded-t-md bg-gray-50 p-3">
          <div className="col-span">SL.NO</div>
          <div className="col-span">NAME</div>
          <div className="col-span ">E-MAIL</div>
          <div className="col-span">AGE</div>
          <div className="col-span">PHONE</div>
          <div className="col-span">ADHAAR</div>
          <div className="col-span">ADDRESS</div>
          <div className="col-span">ACTION</div>
        </div>

        {users.length > 0 ? users.map((data, i) =>
          <div key={i} className="grid grid-cols-8 gap-2 mt-3 p-3 border-b border-gray-400 ">
            <div className="col-span">{i + 1}</div>
            <div className="col-span">{data.name}</div>
            <div className="col-span">{data.email}</div>
            <div className="col-span">{data.age}</div>
            <div className="col-span">{data.phone}</div>
            <div className="col-span">{data.adhaar}</div>
            <div className="col-span">{data.address}</div>
            <div className="col-span"><button onClick={() => viewData(data._id)}><GrView size={20} /></button> <button className=" mx-2.5" onClick={() => onDelete(data._id)}><RiDeleteBinLine size={20} /></button></div>
          </div>
        ) : <div className=" mt-4 text-center" >No data available</div>
        }
      </div>

      {/* Modal  */}
      {showModal ? <AllModal
        setShowModal={setShowModal}
        getData={getData}
        action= {action}
      /> : null}
    </div>

  )
}
export default Home;