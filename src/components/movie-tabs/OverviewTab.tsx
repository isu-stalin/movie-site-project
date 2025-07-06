interface OverviewTabProps {
    overview: string;
    isLoading: boolean;
  }
  
  const OverviewTab = ({ overview, isLoading }: OverviewTabProps) => {
    if (isLoading) {
      return (
        <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
          <div className="h-6 bg-gray-300 rounded" />
          <div className="h-6 bg-gray-300 rounded" />
          <div className="h-6 bg-gray-300 rounded" />
        </div>
      );
    }
  
    if (!overview) {
      return <p className="text-center text-gray-500">Описание отсутствует</p>;
    }
  
    return (
      <div className="max-w-3xl mx-auto text-left text-sm">
        {overview}
      </div>
    );
  };
  
  export default OverviewTab;
  