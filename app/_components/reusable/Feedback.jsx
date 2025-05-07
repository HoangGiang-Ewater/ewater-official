import Image from "next/image";

function Feedback({ feedback }) {
  return (
    <>
      <div className="flex items-center justify-center w-24 h-24 relative aspect-square overflow-hidden shrink-0">
        <Image
          src={feedback.image}
          alt={feedback.name}
          className="aspect-square object-cover"
          fill
          sizes="100px"
        />
      </div>
      <div>
        <p className="mb-2 text-foreground">
          <span className="text-4xl">{`""`}</span>
          {feedback.content}
        </p>
        <p className="text-sm text-gray-500 mb-2">{feedback.user_title}</p>
        <p className="text-lg font-bold">{feedback.name}</p>
      </div>
    </>
  );
}

export default Feedback;
