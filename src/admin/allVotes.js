import { useState, useEffect } from 'react';

export const AllVotes = () => {
  const [allVotes, setAllVotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Admin Token");

    const fetchList = async () => {
      setLoading(true);
      try {
        const url = "https://voting-app-backend-ii6g.onrender.com/admin/allVotes";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        console.log("Fetched Data:", result);

        if (response.ok) {
          setAllVotes(result);
          
          setLoading(false);
        } else {
          alert("Failed to fetch data");
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        alert("Error fetching items.");
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  useEffect(() => {
    console.log("Updated Votes:", allVotes);
  }, [allVotes]);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading">Loading...</p>
        </div>
      ) : (
        <div className="votes-container">
          {
            allVotes.map((vote, index) => (
              <div className="vote-card" key={index}>
                <h2>Candidate Name:<strong>{vote.candidate.name}</strong></h2>
                <p><strong>Dept:</strong> {vote.candidate.party}</p>
                <p><strong>Votes:</strong> {vote.candidate.votesLength}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
