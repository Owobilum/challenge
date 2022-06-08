import type { NextPage } from 'next';

import GameSetUp from '../components/game_setup/GameSetUp';

const Home: NextPage = () => {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginTop: 32 }}>
        <GameSetUp />
      </div>
    </div>
  );
};

export default Home;
