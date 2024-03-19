export const handleInputChange = (e, formData, setFormData, errors, setErrors) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };