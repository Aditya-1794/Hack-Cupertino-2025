import React, { useState } from 'react'
import "./Instruction.css"

function Instruction({ title, difficulty, instructions, materials }) {
  const [showPopup, setShowPopup] = useState(false)

  const handleClick = () => {
    setShowPopup(true)
  }

  const handleClose = () => {
    setShowPopup(false)
  }

  const difficultyColor = {
    Easy: 'green',
    Medium: 'yellow',
    Hard: 'red'
  }

  return (
    <>
      <div className="instruction-header" onClick={handleClick}>
        <span className="instructionTitle">{title}</span>
        <span className="instructionDiff" style={{ color: difficultyColor[difficulty] }}>{difficulty}</span>
      </div>
      {showPopup && (
        <div className='instructionPopup'>
            <div className="popupHeader">
                <button className="closePopupButton" onClick={handleClose}>X</button>
                <h2>{title}</h2>
                <h3 style={{ color: difficultyColor[difficulty] }}>{difficulty}</h3>
            </div>

            <div className='popupBody'>
                <h3 className='popupHeading'>Materials</h3>
                <h5 className="materials">
                    {materials.split(", ").map((mat, i) => (
                        <span key={i}>{i+1}. {mat}<br /></span>
                    ))}
                </h5>

                <h3 className='popupHeading'>Instructions</h3>
                <h5 className='instructions'>
                    {instructions.split('**').map((step, index) => (
                        step.trim() && <div key={index} className="instruction-step">{step.trim()}</div>
                    ))}
                </h5>
            </div>
        </div>
      )}

    </>
  )
}

export default Instruction
