



const people = [
    {
      name: 'Fabio Gomes',
      role: 'Full Stack Developer',
      imageUrl:
        'https://i.imgur.com/3Vr32mut.jpg',
      twitterUrl: 'https://twitter.com/fabiolpgomes',
      linkedinUrl: 'https://www.linkedin.com/in/fabiolpgomes/',
    },
    {
        name: 'Bruno Apostolo',
        role: 'Full Stack Developer',
        imageUrl:
        'https://i.imgur.com/rPWVuKJt.jpg',
        twitterUrl: '#',
        linkedinUrl: 'https://www.linkedin.com/in/bruno-cesar-apostolo/',
    }
    ];

 

export function About() {

  return (

    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-indigo-600">About Us</h2>
          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Take control of your life.
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          We contribute to the development of web and mobile solutions, to solve and facilitate people's lives.
          </p>
        </div>
      </div>
    </div>

    
  );
}
