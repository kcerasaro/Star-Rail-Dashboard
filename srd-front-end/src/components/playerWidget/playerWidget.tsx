import { useEffect, useState } from "react";
import axios from "axios";
import "./playerWidget.css";
import { Player, Region } from "../../../../shared/player.shared";
import InputField from "../shared/inputField/inputField";
import SelectField from "../shared/selectField/selectField";

function PlayerWidget() {
  // states
  const [player, setPlayer] = useState<Player | null>(null);
  const [editedPlayer, setEditedPlayer] = useState<Player | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const regionOptions = Object.values(Region);

  // load player info
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/player/123`)
      .then((res) => {
        console.log("Fetched player:", res.data);
        setPlayer(res.data);
      })
      .catch((err) => {
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

  // edit player info
  const editPlayerInformation = () => {
    if (isEditing && editedPlayer) {
      axios
        .patch(`${import.meta.env.VITE_API_URL}/player/123`, {
          name: editedPlayer.name,
          uid: editedPlayer.uid,
          region: editedPlayer.region,
        })
        .then((res) => {
          setPlayer(res.data);
          setEditedPlayer(null);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            const msg = Array.isArray(err.response.data.message)
              ? err.response.data.message.join(", ")
              : err.response.data.message;
            console.log(msg);
          } else {
            console.log("An unexpected error occurred.");
          }
        });
    } else {
      setEditedPlayer(player);
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
      <button id="editConfirm" onClick={editPlayerInformation}>
        {isEditing ? "confirm" : "edit"}
      </button>
      {isEditing ? (
        <>
          <div className="input-group">
            <InputField
              value={display?.name || ""}
              onChange={(value) => handleChange("name", value)}
              placeholder="Player Name"
            />
            <InputField
              value={display?.uid || ""}
              onChange={(value) => handleChange("uid", value)}
              placeholder="UID"
            />
            <SelectField 
              value={display?.region || ""}
              onChange={(value) => handleChange("region", value)}
              options= {regionOptions}
              placeholder="Region"
              />
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
