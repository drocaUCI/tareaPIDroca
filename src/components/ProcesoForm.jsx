import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaCalendarAlt, FaTimes, FaCheck } from 'react-icons/fa';
import './ProcesoForm.css';

const ProcesoForm = () => {
  const [formData, setFormData] = useState({
    abreviatura: '',
    denominacion: '',
    fechaInicio: '',
    fechaFin: '',
  });
  const [responsable, setResponsable] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    if (!formData.abreviatura) newErrors.abreviatura = 'Abreviatura es requerida';
    if (!formData.denominacion) newErrors.denominacion = 'Denominación es requerida';

    if (!formData.fechaInicio) {
      newErrors.fechaInicio = 'Fecha de inicio es requerida';
    } else if (!dateRegex.test(formData.fechaInicio)) {
      newErrors.fechaInicio = 'Formato de fecha inválido (dd/mm/aaaa)';
    }

    if (!formData.fechaFin) {
      newErrors.fechaFin = 'Fecha de fin es requerida';
    } else if (!dateRegex.test(formData.fechaFin)) {
      newErrors.fechaFin = 'Formato de fecha inválido (dd/mm/aaaa)';
    }

    if (!responsable || responsable === '<p><br></p>') newErrors.responsable = 'Responsable es requerido';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    console.log('Validation errors:', newErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Handle form submission
      console.log('Form data:', { ...formData, responsable });
      alert('Proceso modificado exitosamente!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleQuillChange = (content) => {
    setResponsable(content);
    if (errors.responsable) {
      setErrors(prev => ({ ...prev, responsable: null }));
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <span>Modificar Proceso</span>
        <div className="header-icons">
          <span className='icon-circle'></span>
          <span className='icon-times'>&times;</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label>Abreviatura *</label>
            <input
              type="text"
              name="abreviatura"
              value={formData.abreviatura}
              onChange={handleChange}
              className={errors.abreviatura ? 'error' : ''}
            />
            {errors.abreviatura && <span className="error-message">{errors.abreviatura}</span>}
          </div>
          <div className="form-group denominacion-group">
            <label>Denominación *</label>
            <input
              type="text"
              name="denominacion"
              value={formData.denominacion}
              onChange={handleChange}
              className={errors.denominacion ? 'error' : ''}
            />
             {errors.denominacion && <span className="error-message">{errors.denominacion}</span>}
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">Datos Generales</div>
          <div className="section-content">
            <div className="form-row">
              <div className="form-group">
                <label>Fecha inicio *</label>
                <div className="date-input">
                  <input
                    type="text"
                    name="fechaInicio"
                    placeholder="dd/mm/aaaa"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    className={errors.fechaInicio ? 'error' : ''}
                  />
                  <FaCalendarAlt className="calendar-icon" />
                </div>
                 {errors.fechaInicio && <span className="error-message">{errors.fechaInicio}</span>}
              </div>
              <div className="form-group">
                <label>Fecha fin *</label>
                <div className="date-input">
                  <input
                    type="text"
                    name="fechaFin"
                    placeholder="dd/mm/aaaa"
                    value={formData.fechaFin}
                    onChange={handleChange}
                    className={errors.fechaFin ? 'error' : ''}
                  />
                  <FaCalendarAlt className="calendar-icon" />
                </div>
                {errors.fechaFin && <span className="error-message">{errors.fechaFin}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">Responsable</div>
          <div className="section-content">
             <ReactQuill
              theme="snow"
              value={responsable}
              onChange={handleQuillChange}
              modules={{
                toolbar: [
                  [{ 'font': [] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{'list': 'ordered'}, {'list': 'bullet'}],
                  ['link']
                ]
              }}
              className={errors.responsable ? 'error' : ''}
            />
             {errors.responsable && <span className="error-message">{errors.responsable}</span>}
          </div>
        </div>

        <div className="form-footer">
          <div className="footer-nav">
            <button type="button" className="nav-button">&lt; Anterior</button>
            <button type="button" className="nav-button">Siguiente &gt;</button>
          </div>
          <div className="footer-actions">
            <button type="button" className="action-button cancel-button">
              <FaTimes /> Cancelar
            </button>
            <button type="submit" className="action-button accept-button">
              <FaCheck /> Aceptar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProcesoForm;
