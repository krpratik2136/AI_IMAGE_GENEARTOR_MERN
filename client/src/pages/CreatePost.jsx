
import React, { useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);

        const formData = new FormData();
        formData.append('prompt', form.prompt);

        const response = await fetch('https://ai-image-geneartor-mern-1.onrender.com/api/v1/dalle', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to generate image');

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        console.error('Error generating image:', error);
        alert('Error generating image. Please try again.');
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a valid prompt');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.prompt || !form.photo) {
      alert('Please fill all fields and generate an image first.');
      return;
    }

    // if(form.prompt && form.photo) {
    //     setLoading(true);
    

    try {
      setLoading(true);
      const response = await fetch('https://ai-image-geneartor-mern-1.onrender.com/api/v1/post', { // Replace with correct API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      

      if (!response.ok) throw new Error('Failed to share post');

      alert('Post shared successfully!');
      navigate('/'); // Redirect to home after submission
    } catch (error) {
      console.error('Error sharing post:', error);
      alert('Error sharing post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

//   await response.json();
//   navigate('/');
//     }catch(err){
//       alert(err)
//     } finally{
//       setLoading(false);
//     }
//   }else{
//     alert('please enter a prompt and generate an image ')
//   }
// }


  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100 py-10">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-7xl">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
            Generate an imaginative image through DALL-E AI and share it with the community
          </p>
        </div>

        <form className="mt-16 max-w-3xl mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="Enter a Prompt to generate a image "
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-97 h-97 flex justify-center items-center self-center">
              {form.photo ? (
                <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
              ) : (
                <img src={preview} alt="preview" className="w-5/15 h-5/15 object-contain opacity-40" />
              )}

              {generatingImg && (
                <div className=" absolute inset-0 z-0 flex justify-center items-center bg-black/50 backdrop-blur-md rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className="w-full sm:w-auto mt-3 px-5 py-2.5 text-sm text-white text-center font-medium rounded-md bg-green-700 hover:bg-green-800 transition-colors duration-200"
            >
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              ** Once you have created the image you want, you can share it with others in the community **
            </p>
            <button
              type="submit"
              className="mt-3 w-full sm:w-auto px-5 py-2.5 text-sm text-white text-center font-medium rounded-md bg-[#6469ff] hover:bg-[#4e54d3] transition-colors duration-200 "
            >
              {loading ? 'Sharing...' : 'Share with the Community'}
            </button>
          </div>
        </form>
      </div>
    </section>

  );
};

export default CreatePost;