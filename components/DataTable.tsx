interface DataTableProps {
  completeness: number;
  supportedTerms: React.ReactNode[];
}
const DataTable = ({ completeness, supportedTerms }: DataTableProps) => {
  return (
    <div className="collapse collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        {completeness}% Data Completeness &nbsp;
        <progress
          className="progress progress-success w-56"
          value={completeness}
          max="100"
        ></progress>
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Data Source</th>
              </tr>
            </thead>
            <tbody>{supportedTerms}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
