import TournamentBracket from '@/components/TournamentBracket';
import TournamentManager from '@/components/TournamentManager';

interface TournamentLeaguePageProps {
  params: {
    leagueId: string;
  };
}

export default function TournamentLeaguePage({ params }: TournamentLeaguePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <TournamentBracket leagueId={params.leagueId} />
        <div className="mt-8">
          <TournamentManager leagueId={params.leagueId} />
        </div>
      </div>
    </div>
  );
} 