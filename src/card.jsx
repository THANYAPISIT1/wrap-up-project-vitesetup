export default function Card({ card, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`border p-4 rounded-md cursor-pointer ${
        isSelected ? 'bg-blue-200' : 'bg-white'
      }`}
    >
      <h3 className="font-bold">{card.title}</h3>
      <p>{card.description}</p>
    </div>
  );
}
