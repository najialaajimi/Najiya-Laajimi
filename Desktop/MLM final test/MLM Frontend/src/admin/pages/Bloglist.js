import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch ,useSelector} from 'react-redux';
import {Link} from'react-router-dom';
import { deleteBlog, getBlogs, resetState } from '../features/blogs/blogSlice';
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
      title: 'Categorie',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [BlogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  },[]);
  const getblogState = useSelector((state) =>state.blogadmin.blogs);
  
  const data1 = [];
  for (let i = 0; i < getblogState.length; i++) {
    data1.push({
      key: i + 1,
      title: getblogState[i].title,
      category: getblogState[i].category,
      action:(<>
        <Link  className='text-danger fs-3' to={`/admin/blog/${getblogState[i]._id}`} ><BiEdit/></Link>
        <button
            className="text-danger fs-3 ms-3 bg-transparent border-0"
            onClick={() => showModal(getblogState[i]._id)}
          >
            <AiFillDelete />
          </button>
       </>)
    });
  }
  const delete_Blog = (e) =>{
    dispatch(deleteBlog(e));
    console.log(e)
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    },100)
  }
  return (
    <div className="mt-4">
        <h3 className="mb-4 title_admin">Blog list</h3>
        <div>
        <Table columns={columns} className='table' dataSource={data1} />
        </div>
        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction  ={() =>{delete_Blog(BlogId);} }
        title="Êtes-vous sûr de vouloir supprimer cette blog ?"
      />
      </div>
  )
}

export default Bloglist