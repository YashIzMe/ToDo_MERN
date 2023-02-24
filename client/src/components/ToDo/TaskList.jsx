import React, { useState } from "react";

const data = [
  {
    id: 1,
    name: "Take Potato"
  }, 
  {
    id: 2,
    name: "Take Bread"
  }, 
  {
    id: 3,
    name: "Take Book"
  }, 
]

const TaskList = () => {
  return (
    <>
      <div className="main-container">
        <div className="content">
          {data.map(item => {
            return (
              <>
                <div key={item.id} className="cont">
                  <p>{item.name}</p>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default TaskList;
