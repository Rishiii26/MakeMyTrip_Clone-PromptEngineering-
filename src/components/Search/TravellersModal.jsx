import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const CABIN_CLASSES = [
  'Economy/Premium Economy',
  'Premium Economy',
  'Business Class',
  'First Class'
];

export const TravellersModal = ({ isOpen, onClose, travellers, travelClass, onApply }) => {
  const [adults, setAdults] = useState(travellers.adults || 1);
  const [children, setChildren] = useState(travellers.children || 0);
  const [infants, setInfants] = useState(travellers.infants || 0);
  const [selectedClass, setSelectedClass] = useState(travelClass || 'Economy/Premium Economy');

  if (!isOpen) return null;

  const handleApply = () => {
    onApply({
      travellers: { adults, children, infants },
      travelClass: selectedClass
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-800 text-base">Select Travellers & Class</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Adults */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-bold text-gray-800 text-sm">ADULTS (12y +)</span>
              <span className="text-xs text-gray-500">on the day of travel</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setAdults(num)}
                  className={`w-9 h-9 rounded-md text-sm font-bold transition-all ${
                    adults === num 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Children */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-bold text-gray-800 text-sm">CHILDREN (2y - 12y)</span>
              <span className="text-xs text-gray-500">on the day of travel</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setChildren(num)}
                  className={`w-9 h-9 rounded-md text-sm font-bold transition-all ${
                    children === num 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Infants */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-bold text-gray-800 text-sm">INFANTS (below 2y)</span>
              <span className="text-xs text-gray-500">on the day of travel</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setInfants(num)}
                  className={`w-9 h-9 rounded-md text-sm font-bold transition-all ${
                    infants === num 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Cabin Class */}
          <div className="border-t border-gray-100 pt-4">
            <span className="font-bold text-gray-800 text-sm block mb-2.5">CHOOSE TRAVEL CLASS</span>
            <div className="grid grid-cols-2 gap-2">
              {CABIN_CLASSES.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`p-3 rounded-lg border text-left text-xs font-bold transition-all flex items-center justify-between ${
                    selectedClass === cls
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{cls}</span>
                  {selectedClass === cls && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-xs text-gray-600">
            Total: <span className="font-bold text-gray-900">{adults + children + infants} Travellers</span>
          </div>
          <button
            onClick={handleApply}
            className="bg-mmt-btn text-white px-6 py-2 rounded-md font-bold text-sm shadow-btn hover:opacity-95"
          >
            APPLY
          </button>
        </div>

      </div>
    </div>
  );
};
