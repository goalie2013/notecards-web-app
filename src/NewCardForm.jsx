import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

// ... previous helper functions and NoteCard component remain the same ...

const NewCardForm = ({ card, onSave, onCancel, existingCategories }) => {
  const [formData, setFormData] = useState({
    title: card?.title || '',
    description: card?.description || '',
    category: card?.category || ''
  });
  
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [touched, setTouched] = useState({
    title: false,
    description: false,
    category: false
  });


  const allCategories = ['New...', ...existingCategories];

  const isValid = formData.title.trim() && 
                 formData.description.trim() && 
                 formData.category.trim();

  // Effect to focus the input when switching to new category mode
  const newCategoryInputRef = useRef(null);

  useEffect(() => {
    if (isNewCategory && newCategoryInputRef.current) {
      newCategoryInputRef.current.focus();
    }
  }, [isNewCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategorySelect = (category) => {
    if (category === 'New...') {
      setIsNewCategory(true);
      setFormData(prev => ({ ...prev, category: '' }));
    } else {
      setIsNewCategory(false);
      setFormData(prev => ({ ...prev, category }));
    }
    setShowDropdown(false);
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSave(formData);
    }
  };

  const getFieldError = (field) => {
    if (touched[field] && !formData[field].trim()) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    return '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={() => handleBlur('title')}
          placeholder="Title"
          className={`w-full p-2 border rounded ${
            touched.title && !formData.title.trim() ? 'border-red-500' : ''
          }`}
        />
        {getFieldError('title') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError('title')}</p>
        )}
      </div>

      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={() => handleBlur('description')}
          placeholder="Description"
          className={`w-full p-2 border rounded h-24 ${
            touched.description && !formData.description.trim() ? 'border-red-500' : ''
          }`}
        />
        {getFieldError('description') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError('description')}</p>
        )}
      </div>

      <div className="relative">
        {isNewCategory ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-600">New Category</label>
              <button
                type="button"
                onClick={() => setIsNewCategory(false)}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Cancel
              </button>
            </div>
            <input
              ref={newCategoryInputRef}
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              onBlur={() => handleBlur('category')}
              placeholder="Enter new category"
              className={`w-full p-2 border rounded ${
                touched.category && !formData.category.trim() ? 'border-red-500' : ''
              }`}
            />
          </div>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className={`w-full p-2 border rounded text-left flex justify-between items-center ${
                touched.category && !formData.category ? 'border-red-500' : ''
              }`}
            >
              <span>{formData.category || 'Select category'}</span>
              <ChevronDown size={16} className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto">
                {allCategories.map((category, index) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full p-2 text-left hover:bg-gray-100 ${
                      index === 0 ? 'border-b' : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {getFieldError('category') && (
          <p className="text-red-500 text-sm mt-1">{getFieldError('category')}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded ${
            isValid 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};


export default NewCardForm;