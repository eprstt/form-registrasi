import { useState } from 'react';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const userId = await createUser(form);
        console.log('User created with ID:', userId);
        setErrors({});
      } catch (error) {
        console.error('Error creating user:', error);
        // Handle error
      }
    }
  };

  const validateForm = () => {
    const { name, email, phone, province, city, district, password, confirmPassword } = form;
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10,15}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!name) newErrors.name = 'Nama wajib diisi.';
    if (!emailPattern.test(email)) newErrors.email = 'Email tidak valid.';
    if (!phonePattern.test(phone)) newErrors.phone = 'No. HP tidak valid.';
    if (!province) newErrors.province = 'Provinsi wajib diisi.';
    if (!city) newErrors.city = 'Kabupaten/Kota wajib diisi.';
    if (!district) newErrors.district = 'Kecamatan wajib diisi.';
    if (!passwordPattern.test(password)) newErrors.password = 'Password harus terdiri dari minimal 8 karakter dan mengandung huruf serta angka.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Konfirmasi Password tidak cocok.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Form Registrasi</h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Nama', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'No. HP', name: 'phone', type: 'text' },
            { label: 'Provinsi', name: 'province', type: 'text' },
            { label: 'Kabupaten/Kota', name: 'city', type: 'text' },
            { label: 'Kecamatan', name: 'district', type: 'text' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Konfirmasi Password', name: 'confirmPassword', type: 'password' }
          ].map((input) => (
            <div className="mb-4" key={input.name}>
              <label className="block text-gray-700">{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                value={form[input.name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
              {errors[input.name] && <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>}
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
