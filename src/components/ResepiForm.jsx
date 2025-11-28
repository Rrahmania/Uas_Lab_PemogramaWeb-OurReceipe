import React, { useState } from 'react';
import './ResepiForm.css';


// Perbaikan A: Ganti ResepiForm menjadi RecipeForm
const RecipeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    steps: [''],
    categories: [],
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Daftar kategori yang tersedia
  const availableCategories = [
    'Ayam',
    'Daging', 
    'Sayur',
    'Aneka Minuman',
    'Makanan Ringan',
    'Mie',
    'Aneka Nasi',
    'Pudding & Dessert',
    'Hidangan Laut',
    'Makanan Sehat',
    'Salad'
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle kategori changes (Perbaikan B: Optimasi logika)
  const handleCategoryChange = (category) => {
    setFormData(prev => {
      const currentCategories = prev.categories;
      const isSelected = currentCategories.includes(category);
      
      if (isSelected) {
        // Remove category if already selected
        return {
          ...prev,
          categories: currentCategories.filter(cat => cat !== category)
        };
      } else if (currentCategories.length < 3) {
        // Add category if not selected and less than 3
        return {
          ...prev,
          categories: [...currentCategories, category]
        };
      }
      // Return previous state if limit is reached and category is not selected
      return prev;
    });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData(prev => ({
      ...prev,
      steps: newSteps
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, '']
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }));
    }
  };

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      const newSteps = formData.steps.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        steps: newSteps
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Check if at least one category is selected
    if (formData.categories.length === 0) {
      alert('Pilih minimal 1 kategori!');
      return;
    }
    
    // Filter out empty ingredients and steps
    const filteredData = {
      ...formData,
      ingredients: formData.ingredients.filter(ingredient => ingredient.trim() !== ''),
      steps: formData.steps.filter(step => step.trim() !== '')
    };

    onSubmit(filteredData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      ingredients: [''],
      steps: [''],
      categories: [],
      image: null
    });
    setImagePreview(null);
    // Perbaikan C: Hapus e.target.reset()
  };

  return (
    <div className="recipe-form-container">
      <h2>Tambah Resep Baru</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        
        {/* Judul Resep */}
        <div className="form-group">
          <label htmlFor="title">Judul Resep *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Masukkan judul resep..."
          />
        </div>

        {/* Deskripsi Resep */}
        <div className="form-group">
          <label htmlFor="description">Deskripsi Resep *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            placeholder="Deskripsikan resep Anda..."
          />
        </div>

        {/* Kategori */}
        <div className="form-group">
          <label>Kategori * (Maksimal 3)</label>
          <div className="categories-container">
            <div className="categories-grid">
              {availableCategories.map(category => (
                <label key={category} className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    disabled={formData.categories.length >= 3 && !formData.categories.includes(category)}
                  />
                  <span className="checkbox-custom"></span>
                  {category}
                </label>
              ))}
            </div>
            <div className="categories-selected">
              <strong>Kategori terpilih: </strong>
              {formData.categories.length > 0 ? (
                formData.categories.join(', ')
              ) : (
                <span className="no-category">Belum memilih kategori</span>
              )}
              <span className="categories-count">
                ({formData.categories.length}/3)
              </span>
            </div>
          </div>
        </div>

        {/* Bahan-bahan */}
        <div className="form-group">
          <label>Bahan-bahan *</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="dynamic-field">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Bahan ${index + 1}...`}
                required={index === 0}
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeIngredient(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addIngredient}>
            + Tambah Bahan
          </button>
        </div>

        {/* Langkah-langkah */}
        <div className="form-group">
          <label>Langkah-langkah *</label>
          {formData.steps.map((step, index) => (
            <div key={index} className="dynamic-field">
              <textarea
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Langkah ${index + 1}...`}
                rows="3"
                required={index === 0}
              />
              {formData.steps.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeStep(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addStep}>
            + Tambah Langkah
          </button>
        </div>

        {/* Upload Foto */}
        <div className="form-group">
          <label>Foto Makanan</label>
          <div className="image-upload-section">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            /> 
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, image: null }));
                  }}
                >
                  Hapus Foto
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Simpan Resep
        </button>
      </form>
    </div>
  );
}; 

export default RecipeForm;
