export default function TableHead({ isOwner }: { isOwner: boolean }) {
  return (
    <thead className="bg-blue-100">
      {isOwner && (
        <tr className="flex justify-start px-4 text-left">
          <th className="w-1/2">Title</th>
          <th className="w-2/12">Author</th>
          <th className="w-2/12">Description</th>
          <th className="w-2/12">Submissions</th>
        </tr>
      )}
      {!isOwner && (
        <tr className="flex justify-start px-4 text-left">
          <th
            style={{
              minWidth: "50%",
            }}
            className="w-1/2"
          >
            Title
          </th>
          <th
            style={{
              minWidth: "16.666667%",
            }}
            className="w-2/12"
          >
            Author
          </th>
          <th className="w-full">Description</th>
        </tr>
      )}
    </thead>
  );
}
