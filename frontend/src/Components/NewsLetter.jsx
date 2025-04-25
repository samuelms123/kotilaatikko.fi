import React from 'react'

const NewsLetter = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);

    // Add email subscription logic here
  }

  return (
    <>
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center bg-gray-100 p-4 w-[100%] mt-4'>
      <h2 className='text-2xl my-4 font-[header]'>Tilaa uutiskirje ja saat -10% ensimmäisestä tilauksesta!</h2>

      <div className='text-center justify-center items-center mb-4 grid sm:grid-cols-4 gap-4 grid-cols-1'>
        <input
          type="email"
          name="email"
          placeholder='Sähköpostiosoite'
          className='sm:col-span-3 col-span-1 p-4 border border-gray-300 rounded-3xl m-2.5 py-3 w-full'
        />
        <button
          type='submit'
          className='sm:col-span-1 col-span-1 bg-[var(--primary-color)] text-[var(--white-color)] rounded-3xl hover:bg-[var(--grey-color)] transition duration-300 px-7 py-3 w-full'
        >
          Tilaa uutiskirje
        </button>
      </div>

    </form>
    </>
  )
}

export default NewsLetter
