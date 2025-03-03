export default function Legend() {
  return (
    <div className="mb-6 mt-6">
      <h3 className="mb-2 text-lg font-semibold">Legend</h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-red-500"></div>
          <span>Least compromisable</span>
          <span className="italic text-gray-400">Matkul wajib, kerja</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-blue-500"></div>
          <span>High priority</span>
          <span className="italic text-gray-400">
            Matkul pilihan, magang, MBKM{" "}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-green-500"></div>
          <span>Medium priority</span>
          <span className="italic text-gray-400">
            Agenda lain yang bisa digeser
          </span>
        </div>
      </div>
    </div>
  );
}
