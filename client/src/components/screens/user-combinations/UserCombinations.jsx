import React, { useEffect, useState } from 'react'
import "./user-combinations.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass}from '@fortawesome/free-solid-svg-icons';
import ContainerWide from '../../containers/container-wide/ContainerWide';
import Combination from '../../cards/combination/Combination';
import { useQuery } from '@tanstack/react-query';
import { getUserResources } from '../../../apiCalls/resources';
import { useAuth } from '../../../contexts/AuthContext';
import CustomSelect from '../../menus/custom-select/CustomSelect';
export default function UserCombinations() {
  const {currentUser} = useAuth();
  const [user,setUser] = useState();
  const [categories,setCategories] = useState(["sleep","study"]);
  const [currentCategory,setCurrentCategory] = useState();
  const [combinations,setCombinations] = useState([]);

  const{isPending, isError, data, isSuccess, error} = useQuery({ // data here contains combinations
    queryKey: ['combinations', user?.id],
    queryFn: getUserResources,
    enabled : !!user
  });
  const {
    isPending:isPending_categories,
    isError: isError_categories,
    data:data_categories,
    error:error_categories
  } = useQuery({
    queryKey:['categories', user?.id],
    queryFn : getUserResources,
    enabled : !!user
  })
  useEffect(()=>{
    setUser(currentUser);
  },[currentUser])

  useEffect(()=>{
    
    setCombinations(data?.data);
  },[isSuccess])


  if(!user)return "Loading...";
  if(isPending || isPending_categories) return "Loading...";
  if(isError) return `Error: ${error.message}`
  if(isError_categories) return `Error: ${error_categories.message}`
  return (
    <div className='user-combinations'>
      <ContainerWide>
        <header>
          <div className="top">
            <h2>Your Combinations</h2>
            <div className="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" />
            </div>
          </div>
          <div className="description">
            <p>Close your eyes, take a deep breath, and let the soothing sounds transport you to a place of calm.</p>
          </div>
          <div className="filter">
            <div className="category">
              <p>Filter: </p>
              <CustomSelect list={categories} setCurrentCategory ={setCurrentCategory}/>
              {/* <select onChange={(e)=>handleCategoryChange(e)} name="track-category" id="track-category">
                <option>Select Category</option>
                {categories.map((category,ind)=>{
                  return <option value={category} key={ind}>{category}</option>
                })}
              </select> */}
            </div>
          </div>
        </header>
        {/* Be Carefull with these  */}
        {/* <div className="combinations">
          {categories.map((category,ind)=>{
            return <div className="category" key={ind}>
              <div className="title">
                <h4>{category}</h4>
              </div>
              <div className="cards">
                {combinations.map(comb=>{
                  return comb.category === category ?<Combination key={comb.id} combination={comb}/>:null;
                })}
              </div>
            </div>
          })}
        </div> */}
        {/*======================= */}
        <div className="combinations">
          {combinations?.map(comb=>{
            
            return !currentCategory || currentCategory === "All" || comb.category === currentCategory?<Combination key={comb.id} combination={comb}/>:null
          })}
        </div>
      </ContainerWide>
    </div>
  )
}
