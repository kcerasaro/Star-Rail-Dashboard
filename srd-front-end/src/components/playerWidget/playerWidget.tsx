import { useEffect, useState } from 'react';
import axios from 'axios';
import './playerWidget.css';
import { Player } from '../../../../shared/player.shared';

function PlayerWidget() {
    const [player, setPlayer] = useState<Player | null>(null);

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/player/123`)
        .then(res => {
          console.log("Fetched player:", res.data);
          setPlayer(res.data);
        })
        .catch(err => {
          console.error("Axios Error:", err.message);
          if (err.response) {
            console.error("Status:", err.response.status);
            console.error("Data:", err.response.data);
          }
        });
    }, []);
    

    console.log("Player state:", player);

    if (!player) {
      console.log("PLAYER IS SITLL NULL");
      return <p>Loading player info...</p>;
    }

  return (
    <div className="player-widget">
      <p id="name">{player.name}</p>
      <p id="uid">{player.uid}</p>
      <p id="region">({player.region})</p>
    </div>
  );
}

export default PlayerWidget;