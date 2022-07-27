import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import './skeletonStyles.css'


const SkeletonComponent = ()=> {

return(
    <>
    <Skeleton width={300} height={40} style={{marginBottom:20}}  />
   <div className="skeleton_container">
      { Array(3).fill().map((_,index)=>(
        <div className="skeleton" key={index}>
        <h1>
            <Skeleton />
        </h1>
        <Skeleton count={3} style={{marginBottom:5}} width={300}/>
        </div>
      ))}
   </div>
   <Skeleton width={300} height={40} style={{marginBottom:20}}  />
   <div className='skeleton_container'>
      { Array(3).fill().map((_,index)=>(
        <div className="skeleton_flex" key={index}>
        <Skeleton circle width={40} height={40} style={{marginRight:10}} />
        <Skeleton count={2} style={{marginBottom:5}}  width={200}/>
        </div>
      ))}
   </div>
   <Skeleton  class='skel'  height={400}/>
   </>
)
}

export default SkeletonComponent