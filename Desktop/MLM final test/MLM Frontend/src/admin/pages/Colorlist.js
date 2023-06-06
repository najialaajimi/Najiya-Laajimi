import React, { useEffect , useState} from 'react'
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch ,useSelector} from 'react-redux';
import {Link} from'react-router-dom';
import { deleteColor, getColors, resetState } from '../features/color/colorSlice';
import CustomModal from "../components/CustomModal";


  //table
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'Titre',
      dataIndex: 'title',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  /* console.log(colorId); */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  },[]);
  const colorState = useSelector((state)=>state.coloradmin.colors)
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1 ,
      title: colorState[i].title,
      action:(<>
        <Link  className='text-danger fs-3' to={`/admin/color/${colorState[i]._id}`} ><BiEdit/></Link>
        <button
            className="text-danger fs-3 ms-3 bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)}
          >
            <AiFillDelete />
          </button>
       </>)
    });
  }
  const deleteColors = (e) =>{
    dispatch(deleteColor(e));
    console.log(e)
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    },100)
  }
  return (
    <div className="mt-4">
        <h3 className="mb-4 title_admin">Liste de Couleur </h3>
        <div>
        <Table columns={columns} className='table' dataSource={data1} />
        </div>
        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction  ={() =>{deleteColors(colorId);} }
        title="Êtes-vous sûr de vouloir supprimer cette couleur ?"
      />
      </div>
  )
}

export default Colorlist