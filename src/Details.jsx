/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getWaredeatils } from "./slice";

function Details() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = location.state || {};
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState();
  const [extraDeatil, setExtraDetail] = useState({ name: "", discription: "" });
  const { id } = useParams();
  const { detailed } = useSelector((state) => state.warehouse);
  useEffect(() => {
    if (data) setFormData(data);
    else {
      dispatch(getWaredeatils({ id }));
      setFormData(detailed);
    }
  }, [data]);

  // console.log(data);
  function updateInfo(e) {
    const { name, value } = e.target;
    // let tm = formData;
    // tm[name] = value;
    setFormData({ ...formData, [name]: value });
    // console.log(tm);
  }

  function addNewDetail(e) {
    e.preventDefault();
    if (extraDeatil.name && extraDeatil.discription) {
      setFormData({ ...formData, [extraDeatil.name]: extraDeatil.discription });
    }
  }

  return editing ? (
    <form
      action=''
      className='w-2/3 flex gap-3 flex-col font-medium text-xl p-4'
    >
      {Object.keys(formData).map((elem, idx) => (
        <section
          key={idx}
          className='grid grid-cols-2 border border-slate-300 rounded-md p-2'
        >
          {" "}
          <label htmlFor='' className='text-blue-600 uppercase'>
            {elem} -
          </label>{" "}
          <input
            type='text'
            name={elem}
            value={formData[elem]}
            onChange={(e) => updateInfo(e)}
            className='border-2 rounded-md border-sky-500 outline-lime-500 py-1 px-3'
          />{" "}
        </section>
      ))}
      <section className='grid grid-cols-6 border border-slate-300 rounded-md p-2 gap-1'>
        <label htmlFor='' className='col-span-1 text-green-500'>
          Add new Detail-
        </label>
        <input
          type='text'
          placeholder='Enter Detail Type..'
          value={extraDeatil.name}
          onChange={(e) =>
            setExtraDetail({ ...extraDeatil, name: e.target.value })
          }
          className='border-2 col-span-2 rounded-md border-sky-500 outline-lime-500 py-1 px-3'
        />{" "}
        <input
          type='text'
          placeholder='Enter Detail Discription...'
          value={extraDeatil.discription}
          onChange={(e) =>
            setExtraDetail({ ...extraDeatil, discription: e.target.value })
          }
          className='border-2 col-span-2 rounded-md border-sky-500 outline-lime-500 py-1 px-3'
        />{" "}
        <button
          onClick={(e) => addNewDetail(e)}
          className='bg-slate-400 border rounded-md text-white'
        >
          Add
        </button>
      </section>
      <button
        onClick={() => console.log(formData)}
        className='font-medium text-xl border-2 w-full p-2 rounded-md bg-lime-400 text-white hover:border-lime-500 hover:text-lime-500 hover:bg-slate-200'
      >
        Save
      </button>
      <button
        onClick={() => setEditing(false)}
        className='font-medium text-xl border-2 p-2 rounded-md bg-rose-400 text-white hover:border-rose-500 hover:text-rose-500 hover:bg-slate-200'
      >
        Cancel
      </button>
    </form>
  ) : (
    <div className='flex flex-col items-start justify-center gap-4 p-8 w-2/3'>
      {" "}
      {Object.keys(data).map((elem, idxx) => (
        <h2 key={idxx} className='grid grid-cols-2 w-full border-2 p-2'>
          <span className='font-medium uppercase text-blue-600 col-span-1'>
            {elem}-
          </span>
          <span className='col-span-1'>
            {typeof data[elem] == "boolean"
              ? data[elem]
                ? "yes"
                : "No"
              : data[elem]}
          </span>
        </h2>
      ))}
      <button
        className='font-medium text-xl border-2 p-2 rounded-md bg-lime-400 text-white hover:border-lime-500 hover:text-lime-500 hover:bg-slate-200'
        onClick={() => setEditing(true)}
      >
        Edit
      </button>
    </div>
  );
}

export default Details;
