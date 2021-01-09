import React from 'react'

export default function Tweet({ children:tweets, onActionClick }) {

  const { id, value } = tweets;

  const handleIconClick = () => {
    onActionClick(id);
  };

  return (
    <div className='tweets'>
      <table className="responsive-table striped highlight">
        <thead>
        </thead>
        <tbody>
          <tr>
            <td style={{textAlign: 'left'}}>{value}</td>
            <td style={{textAlign: 'right'}}>
              <span
                  className="material-icons"
                  onClick={handleIconClick}
                  style={{ cursor: 'pointer', color: 'red', marginRight: '20px' }}
                    >
                  delete
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}