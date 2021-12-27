import axios from 'axios';
import { useEffect, useState } from "react";
import ADDUsar from './AddUsar';
import jwt_decode from "jwt-decode";
import { Modal } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';


const User = () =>{

    let decodedData ;
    const storedToken = localStorage.getItem("token");
    if (storedToken){
        decodedData = jwt_decode(storedToken, { payload: true });
        let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
   }

    
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);


   const decode = (id) => {
    if (decodedData != undefined){
          if ( decodedData.UserType == "user"){
             return (
                <div>
                    
<>
                              
<div className="table-title">
    <div className="row">
        <div className="col-sm-6">
        </div>
        <div className="col-sm-6">
            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i><span>add new city</span></Button>
        </div>
    </div>
</div>
<Modal show={show} onHide={handleClose}>
    <Modal.Header>
    <Modal.Title>
    Add New City
    </Modal.Title>

        <Modal.Body>
        <ADDUsar/>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            close Button
        </Button>
    </Modal.Header>
</Modal>  
          </>
                </div>
             )}
          }
        }
    
    const [Idimage , setIdImage] = useState()
    const [addImage , setImage] = useState()
    const [enableEdit, setEnabeEdit] = useState(false)


    const [City , setCity] = useState()
    const [imges, setimges] = useState()
    const [description, setdescription] = useState()

    useEffect(() => {
        axios.get(`http://localhost:5000/app/user/image/${Idimage}`)
        .then ((res)=>{
            console.log(res.data)
            setCity(res.data)

        })
          }, [])

         const addImage1 = (e) =>{
              e.preventDefault()
            axios.post(`http://localhost:5000/app/user/CreatePic/${addImage}` , {
                data :{
                    Image:imges,
                    description:description
                }
            })
            .then((res)=>{
                setCity(res.data)
            })

         }

           //deleteimage

        const deleteimage  = (e, _id) => {
            e.preventDefault()
            axios.delete(`http://localhost:5000//app/user/deleteCity/${_id}`)
            .then((res) => {
                setCity(res.data);
    
            })
        }

        

        return(
<>

{decodedData?decode(decodedData.id):<></>}














</>

        )
}
export default User