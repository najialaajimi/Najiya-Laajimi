import React, { useEffect , useState } from 'react'
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch ,useSelector} from 'react-redux';
import {Link} from'react-router-dom';
import { deleteBcategory, getCategories, resetState } from '../features/bcategory/bcategorySlice';
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
const BlogCatlist = () => {
  const [open, setOpen] = useState(false);
  const [BCatId, setBCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  },[]);
  const bCatState = useSelector((state)=>state.bCategoryadmin.bCategories)
  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      title: bCatState[i].title,
      action:(<>
        <Link  className='text-danger fs-3' to={`/admin/blog-category/${bCatState[i]._id}`} ><BiEdit/></Link>
        <button
            className="text-danger fs-3 ms-3 bg-transparent border-0"
            onClick={() => showModal(bCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
       </>)
    });
  }
  const deleteBCategory = (e) =>{
    dispatch(deleteBcategory(e));
    console.log(e)
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    },100)
  }
  return (
    <div className="mt-4">
        <h3 className="mb-4 title_admin">Blog categorie</h3>
        <div>
        <Table columns={columns} className='table' dataSource={data1} />
        </div>
        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction  ={() =>{deleteBCategory(BCatId);} }
        title="Êtes-vous sûr de vouloir supprimer cette catégorie de blog ?"
      />
      </div>
  )
}

export default BlogCatlist