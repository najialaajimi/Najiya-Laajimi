import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const Adherant = () => {
  const [adherents,setAdherents]=useState([])
  const [adherent,setAdherent]=useState([])

  const getallAdherent=async()=>{
    try {
      await fetch('http://localhost:5000/adherent/adherent').then(res=>res.json()).then(data=>{
    
        setAdherents(data)
        getAdherentid(data[0]._id)
      })
      
    } catch (error) {
      console.log(error)
    }
  }


  const getAdherentid=async(id)=>{
    try {
      await fetch('http://localhost:5000/adherent/adherent/'+id).then(res=>res.json()).then(data=>{console.log("data",data)
    
        setAdherent(data)})
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getallAdherent()
  },[])

  return (
    <>
    <div className="genealogy-body" style={{overflow: 'visible'}}>
      {/* <div className="tree_view_zoom_panel">
        <div className="tree_view_zoom_panel_btns" id="tree_view_zoomin">
          <i className="bx bx-zoom-in"></i>
        </div>
        <div className="tree_view_zoom_panel_btns" id="tree_view_zoomout">
          <i className="bx bx-zoom-out"></i>
        </div>
        <div className="tree_view_zoom_panel_btns" id="tree_view_reset">
          <i className="bx bx-sync"></i>
        </div>
      </div> */}
      <div className="genealogy_tree_view_sec" style={{overflow: 'hidden', userSelect: 'none', touchAction: 'none'}}>
        <div className="genealogy-tree" id="tree-view-head" data-height="240px" style={{cursor: 'move' , userSelect: 'none', touchAction: 'none', transformOrigin: '50% 50%', transition: 'transform 200ms ease-in-out 0s', transform: 'scale(1) translate(-280.394px, 0px)'}}>
          <ul className="node head" id="node" data-isnode="0">
            {adherents.map((adh,i)=>(
                 <li id="node-id-1">
                 <Link href="javascript:void(0)" className="node-element">
                   <img ondblclick="searchUser(1)" src="/images/AV1.jpg" data-serialtip="example-1" id="node-img-1" className="tooltipKey user-image" alt="Card image" />
                   <span className='tree-username'>{adh.codeAdherent} </span>
                 </Link>
                 <ul>
                   <li id="node-id-3">
                 <Link href="javascript:void(0)" className="node-element">
                   <img ondblclick="searchUser(3)" src="/images/AV2.jpg" data-serialtip="example-3" id="node-img-3" className="tooltipKey user-image" alt="Card image" />
                   <span className='tree-username'>INF19899053</span>
                 </Link>
                 
                 </li>
                 <li id="id-node-2">
                   <Link href="javascript:void(0)" class="node-element">
                     <img src="/images/AV2.jpg" ondblclick="searchUser(2)" data-serialtip="example-2" id="node-img-2" class="tooltipKey user-image" alt="Card image" />
                     <span className='tree-username'>INF00123</span>
                   </Link>
                  
                 </li>
                 </ul>
               </li>
            ))}
           
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default Adherant
