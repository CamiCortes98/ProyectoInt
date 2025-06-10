import React from 'react';

export function Pagination({ pageCount, currentPage, onPageChange }) {
  return (
    <div className="flex justify-center gap-2 my-4">
      <button onClick={()=>onPageChange(currentPage-1)} disabled={currentPage===1}
        className="px-2 py-1 border rounded disabled:opacity-50">
        Prev
      </button>
      {[...Array(pageCount)].map((_,i)=>(
        <button key={i} onClick={()=>onPageChange(i+1)}
          className={`px-2 py-1 border rounded ${currentPage===i+1?'bg-gray-300':''}`}>
          {i+1}
        </button>
      ))}
      <button onClick={()=>onPageChange(currentPage+1)} disabled={currentPage===pageCount}
        className="px-2 py-1 border rounded disabled:opacity-50">
        Next
      </button>
    </div>
  );
}

export default Pagination;