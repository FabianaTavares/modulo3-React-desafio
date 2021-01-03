import React from 'react'

export default function Tweet({ children:tweet, onActionClick }) {

    const { id, value } = tweet;

  const handleIconClick = () => {
    onActionClick(id);
  };

  return (
    <div className='tweet'>
      {value}

      <div>
        <span
            className="material-icons"
            onClick={handleIconClick}
            style={{ cursor: 'pointer', color: 'red' }}
              >
            delete
        </span>
      </div>
    </div>
  )
}
