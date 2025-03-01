interface AvailabilityTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function AvailabilityTypeSelector({
  selectedType,
  onTypeChange,
}: AvailabilityTypeSelectorProps) {
  const availabilityTypes = [
    { id: "available", label: "Available", color: "bg-green-500" },
    { id: "leisure", label: "Leisure", color: "bg-blue-500" },
    { id: "busy", label: "Busy", color: "bg-red-500" },
  ];

  return (
    <div className="mb-4">
      <p className="mb-2 font-medium">Select availability type:</p>
      <div className="flex gap-2">
        {availabilityTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`rounded-md px-4 py-2 transition-colors ${
              selectedType === type.id
                ? `${type.color} text-white`
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
