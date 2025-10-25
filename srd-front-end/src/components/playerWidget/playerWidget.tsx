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
  const [error, setError] = useState<string | null>(null);

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
    setEditedPlayer(player);
    setIsEditing(true);
    setError(null);
  };

  const confirmEdit = () => {
    // validate data
    if (!editedPlayer) {
      return;
    }

    const uidError = validateUid(editedPlayer.uid);
    if (uidError) {
      setError(uidError);
      return;
    }

    if (!editedPlayer.name || editedPlayer.name.trim() === "") {
      setError("Name is required");
      return;
    }

    if (!editedPlayer.region || editedPlayer.region.trim() === "") {
      setError("Region is required");
      return;
    }

    setError(null);

    // send data to backend
    axios
      .patch(`${import.meta.env.VITE_API_URL}/player/123`, {
        name: editedPlayer.name,
        uid: editedPlayer.uid,
        region: editedPlayer.region,
      })
      .then((res) => {
        setPlayer(res.data);
        setEditedPlayer(null);
        setIsEditing(false);
        setError(null);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          const msg = Array.isArray(err.response.data.message)
            ? err.response.data.message.join(", ")
            : err.response.data.message;

          if (
            msg.toLowerCase().includes("uid") &&
            msg.toLowerCase().includes("taken")
          ) {
            setError("This UID is already registered");
          } else {
            setError(msg);
          }
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      });
  };

  const cancelEdit = () => {
    setEditedPlayer(null);
    setIsEditing(false);
    setError(null);
  };

  const handleChange = (field: keyof Player, value: string) => {
    if (!editedPlayer) {
      return;
    }

    setEditedPlayer({ ...editedPlayer, [field]: value });

    if (error) {
      setError(null);
    }
  };

  const validateUid = (uid: string): string | null => {
    const uidPattern = /^\d{9}$/;

    if (!uid || uid.trim() === "") {
      return "uid is required";
    }

    if (uid.length != 9 || !uidPattern.test(uid)) {
      return "invalid UID";
    }

    return null;
  };
  const display = isEditing ? editedPlayer : player;

  return (
    <div className="player-widget">
      {isEditing ? (
        <div className="button-group">
          <button id="cancel" onClick={cancelEdit}>
            cancel
          </button>
          <button id="confirm" onClick={confirmEdit}>
            confirm
          </button>
        </div>
      ) : (
        <button id="edit" onClick={editPlayerInformation}>
          edit
        </button>
      )}
      
      {error && (
        <div className="error-banner">
          <span className="error-message">{error}</span>
        </div>
      )}

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
              placeholder="UID (9 digits)"
            />
            <SelectField 
              value={display?.region || ""}
              onChange={(value) => handleChange("region", value)}
              options={regionOptions}
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
