import { useEffect, useState } from 'react';
import axios from 'axios';
import './playerWidget.css';
import { Player } from '../../../../shared/player.shared';

function PlayerWidget() {
    const [player, setPlayer] = useState<Player | null>(null);
    const [editedPlayer, setEditedPlayer] = useState<Player | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    if (!player) {
      return <p>Loading player info...</p>;
    }

    const editPlayerInformation = () => {
      if(isEditing && editedPlayer) {
        axios.patch(`${import.meta.env.VITE_API_URL}/player/123`, {
          name: editedPlayer.name,
          uid: editedPlayer.uid,
          region: editedPlayer.region,
        })
        .then(res => {
          setPlayer(res.data);
          setEditedPlayer(null);
          setErrorMessage(null);
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.message) {
            const msg = Array.isArray(err.response.data.message)
              ? err.response.data.message.join(', ')
              : err.response.data.message;
            setErrorMessage(msg);
          } else {
            setErrorMessage("An unexpected error occurred.");
          }
        });
      } else {
        setEditedPlayer(player);
        setErrorMessage(null);
      }

      setIsEditing(!isEditing);
    };

    const handleChange = (field: keyof Player, value: string) => {
      if (!editedPlayer) {
        return;
      }

      setEditedPlayer({ ...editedPlayer, [field]: value });
    };

    const display = isEditing ? editedPlayer : player;

  return (
    <div className="player-widget">
      <button id="editConfirm" onClick={editPlayerInformation}>{isEditing? "confirm" : "edit"}</button>
      {isEditing ? (
    <>
    <div className = "input-group">
        <input
              id="inputField"
              value={display?.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <input
              id="inputField"
              value={display?.uid || ''}
              onChange={(e) => handleChange('uid', e.target.value)}
            />
            <input
              id="inputField"
              value={display?.region || ''}
              onChange={(e) => handleChange('region', e.target.value)}
            />
            {errorMessage && (
              <div className="errorMessage">
                {errorMessage}
              </div>
            )}
          </div>
    </>
  ) : (
    <>
      <p id="name">{player.name}</p>
      <p id="uid">{player.uid}</p>
      <p id="region">({player.region})</p>
    </>
  )}
    </div>
  );
}

export default PlayerWidget;