import React, {useEffect} from "react";
import "../assets/css/BottomSheet.css";

export default function SliderModel({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);
  
  return (
    <div 
      className={`slider-overlay ${isOpen ? 'active' : ''}`} 
      onClick={onClose}
    >
      <div 
        className="slider-content" 
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <div className="slider-handle" />
        <div className="slider-body">
          {children}
        </div>
      </div>
    </div>
  );
}
