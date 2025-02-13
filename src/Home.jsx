/** @format */
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearWare, getWare } from "./slice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchOpt, setSearchOpt] = useState("");
  const [query, setQuery] = useState("");
  const { result, status, error } = useSelector((state) => state.warehouse);

  useEffect(() => {}, []);
  //   console.log(result);
  function handleSubmit(e) {
    e.preventDefault();
    //   console.log();
    dispatch(getWare({ query, searchOpt }));
  }

  useEffect(() => {
    if (searchOpt && query) dispatch(getWare({ searchOpt, query }));
    else dispatch(clearWare());
  }, [query]);

  return (
    <div className='w-full '>
      <div>
        <form
          action=''
          onSubmit={(e) => handleSubmit(e)}
          className='flex items-center justify-center gap-1 font-medium text-slate-800 p-2'
        >
          <label htmlFor='searchBy' className=''>
            Search By-
          </label>{" "}
          <select
            name='searchBy'
            id=''
            value={searchOpt}
            onChange={(e) => setSearchOpt(e.target.value)}
            className='rounded-md border-2 border-indigo-400 outline-sky-400 text-center p-1'
          >
            {" "}
            <option value='' disabled>
              Choose one
            </option>
            <option value='city'>City</option>{" "}
            <option value='name'>Name</option>
            <option value='cluster'>Cluster</option>
            <option value='space_available'>Available Space</option>
          </select>
          <input
            type={searchOpt === "space_available" ? "number" : "text"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='rounded-md border-2 border-indigo-400 outline-sky-400 text-center p-1'
            placeholder={
              searchOpt === "space_available"
                ? "Enter Space Area.."
                : "Search WareHouse.."
            }
          />{" "}
          <button className='bg-indigo-400 p-1 rounded-md border-2  hover:border-indigo-400 hover:bg-slate-100 hover:text-indigo-500'>
            Search
          </button>
          {/* <label htmlFor=''>Search By City</label>
          <input type='checkbox' className='rounded-md w-8 h-8' /> */}
        </form>
        <p className='text-rose-500 text-center'>{error}</p>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-14 p-8'>
        {result.length ? (
          result.map((ele, idx) => {
            return (
              <div
                key={idx}
                className='border border-slate-500 p-2 rounded-md w-56'
                onClick={() =>
                  navigate("/details/" + ele.id, { state: { data: ele } })
                }
              >
                <h2>Name - {ele.name}</h2>
                <h2>City - {ele.city}</h2>
                <h2>Space-Available - {ele["space_available"]}</h2>
                <h2>Cluster:{ele.cluster}</h2>
              </div>
            );
          })
        ) : (
          <h1 className='text-2xl font-medium text-gray-700 p-10'>
            Nothing To Show
          </h1>
        )}
      </div>
    </div>
  );
}

export default Home;
