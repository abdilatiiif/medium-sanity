import Image from "next/image";

function MainContent() {
  return (
    <main className="flex flex-col md:flex-row text-center p-10 gap-8 items-center justify-center">
      <div className="w-2/3">
        <h1 className="text-3xl md:text-6xl">Food for thought</h1>
        <h4 className="w-2/3 mx-auto mt-4 md:text-lg text-gray-600">
          Welcome to food for thought, a place to share and explore ideas. write
          your thoughts and connect with others.
        </h4>
      </div>
      <div>
        <Image
          src="/bg-header.avif"
          alt="front page image"
          width={500}
          height={300}
        />
      </div>
    </main>
  );
}

export default MainContent;
