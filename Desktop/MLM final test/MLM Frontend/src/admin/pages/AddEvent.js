import React ,{useEffect} from 'react'
import CustomInput from '../components/CustomInput'
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { createMeet } from '../features/Event/eventSlice';

let schema = object({
  title: string().required("Saisir titre d'évenement est obligatoire"),
  date: string().required("Saisir Date d'évenement est obligatoire"),
  time: string().required("Saisir l'heure d'évenement est obligatoire"),
});

const AddEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newEvent = useSelector((state) => state.meetadmin);
  const {isSuccess, isError, isLoading, createdmeet } = newEvent;
  useEffect(()=>{
    if(isSuccess && createdmeet){
      toast.success('Ajouter Evenement avec Succéss!');
    }
    if(isError){
      toast.error("Une erreur s'est d'évenemnt. Veuillez réessayer!");
    }
  },[isSuccess, isError, isLoading]);
  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      time:"",
    },
    validationSchema: schema,
    onSubmit: (values) => {/* 
      alert(JSON.stringify(values)) */
      dispatch(createMeet(values));
      formik.resetForm();
    },
  });
  return (
    <>
    <div>
      <h3 className="mb-4 title_admin">Ajouter Evenements</h3>
      <div>
        <form 
          onSubmit={formik.handleSubmit}
           className="d-flex gap-3 flex-column">
          <CustomInput type="text" label="Entrer sujet d'évenement" name="title" onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput type="date" label="Entrer date d'évenement" name="date" onCh={formik.handleChange("date")}
            onBl={formik.handleBlur("date")}
            val={formik.values.date}
          />
          <div className="error">
            {formik.touched.date && formik.errors.date}
          </div>
          <CustomInput type="text" label="Entrer l'heure d'évenement" name="time" onCh={formik.handleChange("time")}
            onBl={formik.handleBlur("time")}
            val={formik.values.time}
          />
          <div className="error">
            {formik.touched.time && formik.errors.time}
          </div>
          <button
            className="btn btn-success rounded-3 border-0 my-5"
            type="submit"
          >
            Ajouter Evenement
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddEvent