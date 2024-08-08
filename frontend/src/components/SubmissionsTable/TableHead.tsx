export default function TableHead() {
  return (
    <thead className="sticky top-0 bg-blue-100">
      <tr className="flex justify-start px-4 text-left">
        <th className="w-1/2">Name</th>
        <th className="w-1/2">Answers</th>
      </tr>
    </thead>
  );
}
