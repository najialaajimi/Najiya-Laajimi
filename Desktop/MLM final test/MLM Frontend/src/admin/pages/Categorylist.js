import React, { useEffect , useState } from 'react'
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch ,useSelector} from 'react-redux';
import {Link} from'react-router-dom';
import { deleteProductCategory, getCategories, resetState } from '../features/pcategory/pcategorySlice';
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
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  /* console.log(pCatId); */

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  },[]);
  const pCatState = useSelector((state)=>state.pCategoryadmin.pCategories)
  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
      key: i + 1,
      title: pCatState[i].title,
      action:(<>
        <Link  className='text-danger fs-3' to={`/admin/category/${pCatState[i]._id}`} ><BiEdit/></Link>
        <button
            className="text-danger fs-3 ms-3 bg-transparent border-0"
            onClick={() => showModal(pCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
       </>)
    });
  }
  const deletePCategory = (e) => {
    dispatch(deleteProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    },100)
  }
  return (
    <div className="mt-4">
        <h3 className="mb-4 title_admin">Categorie list </h3>
        <div>
        <Table columns={columns} className='table' dataSource={data1} />
        </div>
        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction  ={() =>{deletePCategory(pCatId);} }
        title="Êtes-vous sûr de vouloir supprimer cette catégorie de produit ?"
      />
      </div>
  )
}

export default Categorylist